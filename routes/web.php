<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\ShowController;
use Illuminate\Support\Facades\Route;

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

Route::resource('/',HomeController::class);
Route::get('/admin-dashboard',function () {
    return view('admin.layouts.layout');
});
Route::resource('/category',CategoryController::class);
Route::resource('/brand',BrandController::class);
Route::resource('/product',ProductController::class);
Route::get('/register',[AuthController::class,'register'])->name('register');
Route::post('/register',[AuthController::class,'registerPost'])->name('register');
Route::get('/login',[AuthController::class,'login'])->name('login');
Route::post('/login',[AuthController::class,'loginPost'])->name('login');
Route::delete('/logout',[AuthController::class,'logout'])->name('logout');
Route::get('/showcategory/{id}',[ShowController::class,'showcategory']);
Route::get('/showbrand/{id}',[ShowController::class,'showbrand']);
Route::get('/detail/{id}',[ShowController::class,'detail']);
Route::post('/add_cart/{id}', [CartController::class, 'add_cart'])->middleware('auth');
Route::post('/add_cart/{id}', [HomeController::class,'add_cart'])->name('add_cart')->middleware('auth');
Route::get('/show_cart', [CartController::class, 'show_cart']);
Route::get('/remote_cart/{id}', [CartController::class, 'remote_cart']);
Route::resource('/banner',BannerController::class);
Route::get('/share',[BrandController::class,'share'])->name('share');
Route::get('/share',[ProductController::class,'share'])->name('share');
Route::get('/share',[CategoryController::class,'share'])->name('share');




