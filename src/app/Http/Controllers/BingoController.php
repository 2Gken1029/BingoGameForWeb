<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BingoController extends Controller
{
    public function index()
    {
        return Inertia::render('Bingo/Index');
    }

    public function show()
    {
        return Inertia::render('Bingo/Show');
    }
}
