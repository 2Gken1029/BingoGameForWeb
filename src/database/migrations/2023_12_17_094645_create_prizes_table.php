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
        Schema::create('prizes', function (Blueprint $table) {
            $table->comment('景品情報');
            $table->id();
            $table->bigInteger('game_id')->comment("ゲームID");
            $table->integer('prize_number')->comment("景品順位");
            $table->string('name', 191)->comment("景品名");
            $table->string('winner', 191)->nullable()->comment("景品獲得者");
            $table->text('other', 1024)->nullable()->comment("備考");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prizes');
    }
};
