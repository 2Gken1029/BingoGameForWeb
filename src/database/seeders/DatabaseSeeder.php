<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Game;
use App\Models\Prize;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // テーブルの初期化
        Prize::truncate();
        Game::truncate();

        // テストデータの作成
        Prize::factory()->count(10)->create();
        Game::factory()->count(10)->create();
    }
}
