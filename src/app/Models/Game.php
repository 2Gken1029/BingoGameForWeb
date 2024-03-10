<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'games';

    protected $guarded = ['id'];

    /**
     * prizesテーブルへのリレーション
     */
    public function prizes()
    {
        return $this->hasMany(Prize::class);
    }

    /**
     * ゲーム情報の登録
     * 
     * @param StoreRequest ゲーム情報
     * @return int ゲームID
     */
    public function store($data)
    {
        $param = [
            'name' => $data->name,
            'implementation_date' => $data->implementation_date,
        ];

        $result = self::create($param);
        return $result->id;
    }

    /**
     * ゲーム情報の取得
     * 
     * @param ShowRequest ゲームID
     * @return array ゲーム詳細情報と賞品情報の配列
     */
    public function get($id)
    {
        $game_information = self::find($id);

        $game_detail = [
            'information' => $game_information,
            'prizes' => $game_information->prizes,
        ];

        return $game_detail;
    }

    /**
     * 大会情報を更新する
     * 
     * @param array 更新情報
     * @return int id ゲームID
     */
    public function updateGames($data)
    {
        self::find($data['id'])
            ->update([
                'name' => $data['name'],
                'implementation_date' => $data['implementation_date'],
            ]);
    }

    /**
     * ゲーム情報をページネーションで取得する
     * 
     * @return paginate
     */
    public function getGameList()
    {
        $query = self::select('id', 'name', 'implementation_date', 'status');

        return $query->paginate(15);
    }

    /**
     * 大会情報のステータスを変更
     * 
     * @param Request $data
     * @return void
     */
    public function updateStatus($status, $data)
    {
        self::find($data->game_id)
            ->update([
                'status' => $status,
                'selected_number' => implode(',', $data->selectedNumbers)
            ]);
    }
}
