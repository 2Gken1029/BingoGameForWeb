<?php

namespace App\Http\Controllers;

use App\Http\Requests\Game\StoreRequest;
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
     *
     * Villageオブジェクトを使用して、新しいインスタンスを作成する。
     *
     * @param Village　$village_model ヴィレッジテーブル
     * @throws Exception 一般的な例外を投げる
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
        return Inertia::render('GameList/Index');
    }

    public function create()
    {
        return Inertia::render('GameSetting/Create');
    }

    public function store(StoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $game_id = $this->game_model->store($request);

            if (strlen($request->prizes) > 0) {
                $prize_list = explode("\n", $request->prizes);
                $this->prize_model->store($game_id, $prize_list);
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
}
