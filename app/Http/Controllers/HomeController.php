<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');
        $keyword = trim(strip_tags($keyword));
        $listsp=[];
        if ($keyword!=""){
            $listsp = Product::where("product_name","LIKE","%$keyword%")->get();
        }

        $brand = Brand::all();
        $category = Category::all();
        $product = Product::Products(10);
        $differentProducts = Product::getDifferentProducts(5);
        $products = Product::Products(10);
        return view('index',[
            'brand'=> $brand,
            'category' =>$category,
            'product' =>$product,
            'differentProducts' =>$differentProducts,
            'products'=>$products,
            'listsp'=>$listsp
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function add_cart(Request $request, $id)
    {
        if (Auth::id()) {
            $user = Auth::user();
            $product = Product::find($id);
            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->tong = $product->price * $request->soluong;
            $cart->image = $product->image;
            $cart->Product_id = $product->id;
            $cart->soluong = $request->soluong;
            $cart->save();
            return redirect()->back();
        } else {
            return redirect('login');
        }
    }
}
