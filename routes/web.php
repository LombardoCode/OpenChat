<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatAppController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/{path?}', 'app');

Route::prefix('api')->group(function() {
  Route::prefix('auth')->group(function() {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
  });

  Route::prefix('contactos')->group(function() {
    Route::get('/', [ChatAppController::class, 'obtener_contactos']);
  });

  Route::prefix('mensajes')->group(function() {
    Route::get('/{contacto_id}', [ChatAppController::class, 'obtener_mensajes']);
  });
});
