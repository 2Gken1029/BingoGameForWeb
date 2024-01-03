<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BingoPrizeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        logger($this);

        return [
            'id' => $this->id,
            'game_id' => $this->game_id,
            'prize_number' => $this->prize_number,
            'name' => $this->name,
            'winner' => $this->winner,
        ];
    }
}
