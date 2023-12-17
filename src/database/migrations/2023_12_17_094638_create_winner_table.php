<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('winner', function (Blueprint $table) {
            $table->comment('景品獲得者情報');
            $table->id();
            $table->string('name', 191)->comment("氏名");
            $table->bigInteger('game_id')->comment("ゲームID");
            $table->bigInteger('prize_id')->comment("景品ID");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('winner');
    }
};
