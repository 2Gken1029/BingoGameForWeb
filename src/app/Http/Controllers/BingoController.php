<?php

namespace App\Http\Controllers;

use App\Http\Resources\BingoPrizeResource;
use App\Models\Prize;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BingoController extends Controller
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

    public function index()
    {
        return Inertia::render('Bingo/Index');
    }

    public function show(Request $request)
    {
        $prize_data = $this->prize_model->getData(['game_id' => $request->id]);

        return Inertia::render('Bingo/Show', ['prize_data' => $prize_data]);
    }
}
