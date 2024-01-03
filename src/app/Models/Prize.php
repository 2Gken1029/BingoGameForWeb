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
     * 指定した条件に基づくデータを取得する
     * 
     * @param array 指定条件
     * @return collection 検索結果
     */
    public function getData($condition)
    {
        return self::where($condition)->get();
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

    /**
     * 指定されたゲームIDに紐づく
     * 景品情報をページネーションで取得する
     * 
     * @param int ゲームID
     * @return paginate
     */
    public function getPrizeList($id)
    {
        $query = self::where('game_id', $id)
            ->select('id', 'prize_number', 'name', 'winner');

        return $query->paginate(10);
    }

    /**
     * 景品獲得者情報を設定する
     * 
     * @param array 更新情報
     * @return void
     */
    public function updateWinner($data)
    {
        self::find($data["id"])
            ->update([
                'winner' => $data["winner"],
            ]);
    }
}
