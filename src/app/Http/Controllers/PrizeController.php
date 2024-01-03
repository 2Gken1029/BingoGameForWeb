<?php

namespace App\Http\Controllers;

use App\Models\Prize;
use Illuminate\Http\Request;
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
}
