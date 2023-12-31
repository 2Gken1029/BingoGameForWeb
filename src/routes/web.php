<?php

use App\Http\Controllers\BingoController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\PrizeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('TopPage');
});

Route::controller(GameController::class)->prefix('games')->name('games.')->group(function (): void {
    Route::get('/', 'index')->name('index'); // GameList
    Route::get('/setting', 'create'); // GameSetting
    Route::post('/create', 'store');
});

Route::controller(BingoController::class)->prefix('bingo')->name('bingo.')->group(function (): void {
    Route::get('/', 'index'); // StartPage
    Route::get('/game', 'show'); // Bingo
});

Route::controller(PrizeController::class)->prefix('prize')->name('prize.')->group(function (): void {
    Route::get('/', 'index'); // PrizeList
});
