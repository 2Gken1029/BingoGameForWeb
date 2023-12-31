<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Winner extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'winner';

    protected $guarded = ['id'];


    /**
     * gamesテーブルへのリレーション
     */
    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
