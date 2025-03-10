<?php

use App\Http\Controllers\Api\V1\Auth;
use App\Http\Controllers\Api\V1\ParkingController;
use App\Http\Controllers\Api\V1\VehicleController;
use App\Http\Controllers\Api\V1\ZoneController;
use App\Models\Parking;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [Auth\ProfileController::class, 'show']);
    Route::put('profile', [Auth\ProfileController::class, 'update']);
    Route::put('password', Auth\PasswordUpdateController::class);
    Route::post('auth/logout', Auth\LogoutController::class);
    Route::apiResource('vehicles', VehicleController::class);
    Route::get('parkings', [ParkingController::class, 'index']);
    Route::get('parkings/history', [ParkingController::class, 'history']);
    Route::post('parkings/start', [ParkingController::class, 'start']);
    Route::get('parkings/{parking}', [ParkingController::class, 'show']);
    // Route::put('parkings/{parking}', [ParkingController::class, 'stop']);
    Route::bind('activeParking', function ($id) {
        return Parking::where('id', $id)->active()->firstOrFail();
    });
    Route::put('parkings/{activeParking}', [ParkingController::class, 'stop']);
});

Route::post('auth/register', Auth\RegisterController::class);
Route::post('auth/login', Auth\LoginController::class);

Route::get('zones', [ZoneController::class, 'index']);
