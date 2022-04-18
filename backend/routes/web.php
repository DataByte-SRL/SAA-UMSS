<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\AulaController;
use App\Http\Controllers\FacultadController;
use App\Http\Controllers\DepartamentoController;

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
/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('/', HomeController::class); 

/*Route::get('/token', function () {
    return csrf_token(); 
});*/

Route::controller(DocenteController::class)->group(function(){
    //Route::get('saa', 'index');
    Route::post('saa/createdocente', 'store');
    Route::get('saa/docente/{id}', 'show');
    Route::get('saa/docentes', 'index');
});

Route::controller(AulaController::class)->group(function(){
    Route::post('saa/createaula', 'store');
    Route::get('saa/aula/{id}', 'show');
    Route::get('saa/aulas', 'index');
});

Route::controller(DepartamentoController::class)->group(function(){
    Route::post('saa/createdepartamento', 'store');
    Route::get('saa/departamento/{id}', 'show');
    Route::get('saa/departamentos', 'index');
});

Route::controller(FacultadController::class)->group(function(){
    Route::post('saa/createfacultad', 'store');
    Route::get('saa/facultad/{id}', 'show');
    Route::get('saa/facultades', 'index');
});










