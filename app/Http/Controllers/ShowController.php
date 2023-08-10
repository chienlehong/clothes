<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    public function showcategory($id)
    {
        $category = Category::find($id);
        $category1  =Category::all();
        $brand = Brand::all();
        return view('show.category', compact('category','category1','brand'));
    }
    public function showbrand($id){
        $category = Category::find($id);
        $category1  =Category::all();
        $brand = Brand::all();
        $brand1 = Brand::find($id);
        return view('show.brand', compact('category','category1','brand','brand1'));
    }
    public function detail($id){
        $category = Category::find($id);
        $category1 = Category::all();
        $brand = Brand::all();
        $brand1 = Brand::find($id);
        $product = Product::find($id);
        return view('show.detail', compact('category','category1','brand','brand1','product'));
    }
}
