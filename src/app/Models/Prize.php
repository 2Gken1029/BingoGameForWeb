<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prize extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'prizes';

    protected $guarded = ['id'];


    /**
     * gamesテーブルへのリレーション
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * ゲームIDに基づいて景品情報を登録する
     * 
     * @param int ゲームID
     * @param array 景品リスト
     */
    public function store($id, $prize_list)
    {
        foreach ($prize_list as $index => $prize) {
            $param = [
                'game_id' => $id,
                'prize_number' => $index + 1,
                'name' => $prize
            ];
            self::create($param);
        }
    }
}
