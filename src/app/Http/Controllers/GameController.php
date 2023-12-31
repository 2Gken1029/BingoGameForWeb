<?php

namespace App\Http\Controllers;

use App\Http\Requests\Game\StoreRequest;
use App\Models\Game;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GameController extends Controller
{
    protected $game_model;

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
    ) {
        $this->game_model = $game_model;
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

            $this->game_model->store($request);

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
