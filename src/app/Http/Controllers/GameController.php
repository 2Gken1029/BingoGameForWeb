<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index()
    {
        return Inertia::render('GameList/Index');
    }

    public function create()
    {
        return Inertia::render('GameSetting/Index');
    }
}
