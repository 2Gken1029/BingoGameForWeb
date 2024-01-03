<?php

namespace App\Http\Controllers;

use App\Models\Prize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PrizeController extends Controller
{
    protected $prize_model;

    /**
     * __constructメソッド
     */
    public function __construct(
        Prize $prize_model,
    ) {
        $this->prize_model = $prize_model;
    }


    public function index(Request $request)
    {
        $prize_list = $this->prize_model->getPrizeList($request->id);

        return Inertia::render('PrizeList/Index', [
            'game_id' => $request->id,
            'prize_list' => $prize_list,
        ]);
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();

            foreach ($request->all() as $data) {
                $this->prize_model->updateWinner($data);
            }

            DB::commit();
            session()->flash('flash.success', '景品獲得者情報を更新しました');
        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            session()->flash('flash.error', '景品獲得者情報更新時にエラーが発生しました');
        }
    }
}
