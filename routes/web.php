<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/contacts');

Route::resource('contacts', ContactController::class);
