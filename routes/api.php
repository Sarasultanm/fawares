<?php

use App\Http\Controllers\Main;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $user->number_of_registrations = Registration::where('user_id', $request->user()->id)->count();

    return $user;
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/register', [Main::class, 'register']);
    Route::get('/auth/sign-out', [Main::class, 'sign_out']);
    Route::get('/registration/list', [Main::class, 'list_registration']);
});


Route::group(['middleware' => ['auth:sanctum', AdminMiddleware::class], 'prefix' => 'admin'], function () {
    Route::get('/dashboard', [Main::class, 'admin_dashboard']);
});


Route::post('/auth/verify', [Main::class, 'verify_auth']);
