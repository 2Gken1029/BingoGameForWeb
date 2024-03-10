<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ゲーム情報の返却情報を定義しているResource
 *
 * ゲーム情報を返す内容を定義
 * ゲーム詳細情報取得時などに使用する
 *
 * @return array ヴィレッジ詳細情報
 */
class GameDetailResources extends JsonResource
{
  public function toArray(Request $request)
  {
    logger($this["prizes"]);
    return [
      'id' => $this['information']['id'] ?? null,
      'name' => $this['information']['name'] ?? null,
      'implementation_date' => $this['information']['implementation_date'] ?? null,
      'prizes' => !empty($this["prizes"]) ? $this["prizes"]->map(function ($prize) {
        return [
          'number' => $prize->prize_number,
          'name' => $prize->name
        ];
      })->toArray() : [],
    ];
  }
}
