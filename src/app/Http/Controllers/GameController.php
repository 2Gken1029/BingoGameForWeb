<?php

namespace App\Http\Controllers;

use App\Http\Requests\Game\ShowRequest;
use App\Http\Requests\Game\StoreRequest;
use App\Http\Requests\Game\UpdateRequest;
use App\Http\Resources\GameDetailResources;
use App\Models\Game;
use App\Models\Prize;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GameController extends Controller
{
    protected $game_model;
    protected $prize_model;

    /**
     * __constructメソッド
     */
    public function __construct(
        Game $game_model,
        Prize $prize_model,
    ) {
        $this->game_model = $game_model;
        $this->prize_model = $prize_model;
    }


    public function index()
    {
        $pagination_data = $this->game_model->getGameList();

        return Inertia::render('GameList/Index', [
            'game_list' => $pagination_data
        ]);
    }

    public function create()
    {
        return Inertia::render('GameSetting/Create');
    }

    public function show(ShowRequest $request)
    {
        $game_detail = $this->game_model->get($request->id);
        $result = new GameDetailResources($game_detail);
        return Inertia::render('GameSetting/Show', [
            'game_detail' => $result
        ]);
    }

    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $game_id = $this->game_model->store($request);

            if (count($request->prizes) > 0) {
                $this->prize_model->store($game_id, $request->prizes);
            }

            DB::commit();
            session()->flash('flash.success', 'ゲーム情報を追加しました');
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            session()->flash('flash.error', 'ゲーム情報登録時にエラーが発生しました');
        }
    }

    public function update(UpdateRequest $request)
    {
        $game_id = $request->id;
        $new_prize_list = $request->prizes;
        try {
            DB::beginTransaction();

            $this->game_model->updateGames($request);

            $old_prize_data = $this->prize_model->getData(['game_id' => $game_id]);

            if (count($new_prize_list) >= count($old_prize_data)) {
                foreach ($new_prize_list as $index => $prize_data) {
                    $prize_number = $old_prize_data[$index]->prize_number ?? $index + 1;
                    $this->prize_model->updatePrize($game_id, $prize_number, $prize_data["name"]);
                }
            } else {
                $index = 0;
                foreach ($new_prize_list as $prize_data) {
                    $prize_number =  $old_prize_data[$index]->prize_number;
                    $this->prize_model->updatePrize($game_id, $prize_number, $prize_data["name"]);
                    $index++;
                }
                for ($i = $index; $i < count($old_prize_data); $i++) {
                    $prize_number =  $old_prize_data[$i]->prize_number;
                    $this->prize_model->deleteData(['game_id' => $game_id, 'prize_number' => $prize_number]);
                }
            }

            DB::commit();
            session()->flash('flash.success', 'ゲーム情報を更新しました');
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            session()->flash('flash.error', 'ゲーム情報登録時にエラーが発生しました');
        }
    }
}
