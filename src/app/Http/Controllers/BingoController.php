<?php

namespace App\Http\Controllers;

use App\Constants\GameConstant;
use App\Models\Game;
use App\Models\Prize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BingoController extends Controller
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
        return Inertia::render('Bingo/Index');
    }

    public function show(Request $request)
    {
        $game_id = $request->id;
        $game_data = $this->game_model->get($game_id);
        $prize_data = $this->prize_model->getData(['game_id' => $game_id]);

        return Inertia::render('Bingo/Show', [
            'id' => $game_id,
            'selected_number' => $game_data['information']["selected_number"],
            'prize_data' => $prize_data
        ]);
    }

    public function suspend(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->game_model->updateStatus(GameConstant::SUSPEND_STATUS, $request);
            foreach ($request->winner as $index => $winner) {
                if ($winner) {
                    logger($winner);
                    $this->prize_model->updateWinner(
                        [
                            'game_id' => $request->game_id,
                            'prize_number' => $index + 1
                        ],
                        ['winner' => $winner],
                    );
                }
            }
            DB::commit();
            session()->flash('flash.success', 'ゲームは正常に中断されました');
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            session()->flash('flash.error', 'ゲーム中断処理時にエラーが発生しました');
        }
    }

    public function complete(Request $request)
    {
        try {
            DB::beginTransaction();
            $this->game_model->updateStatus(GameConstant::COMPLETE_STATUS, $request);
            foreach ($request->winner as $index => $winner) {
                if ($winner) {
                    logger($winner);
                    $this->prize_model->updateWinner(
                        [
                            'game_id' => $request->game_id,
                            'prize_number' => $index + 1
                        ],
                        ['winner' => $winner],
                    );
                }
            }
            DB::commit();
            session()->flash('flash.success', 'ゲームは正常に終了しました');
            return redirect()->route('games.index');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            session()->flash('flash.error', 'ゲーム終了処理時にエラーが発生しました');
        }
    }
}
