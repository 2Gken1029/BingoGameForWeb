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
     * winnerテーブルへのリレーション
     */
    public function winner()
    {
        return $this->hasMany(Winner::class);
    }

    /**
     * ゲーム情報の登録
     * 
     * @param $village_data ヴィレッジの基本情報
     * @return object ヴィレッジID
     * @throws Exception 一般的な例外を投げる
     */
    public function store($data)
    {
        $param = [
            'name' => $data->name,
            'implementation_date' => $data->implementation_date,

        ];

        $result = self::create($param);

        return [
            'id' => $result->id,
        ];
    }
}
