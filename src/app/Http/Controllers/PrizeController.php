<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PrizeController extends Controller
{
    public function index()
    {
        return Inertia::render('PrizeList/Index');
    }
}
