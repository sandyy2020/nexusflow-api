<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    return view('welcome1');
})->where('any', '.*');