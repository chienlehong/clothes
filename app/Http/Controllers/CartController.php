<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
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
    public function show_cart()
    {
        if (Auth::id()) {
            $id = Auth::user()->id;
            $cart = DB::table('carts')
                ->join('products', 'carts.product_id', '=', 'products.id')
                ->select('carts.*', 'products.product_name as product_name')
                ->where('carts.user_id', $id)
                ->get();
              
            return view('cart.show', compact('cart'));
        } else {
            return view('/login');
        }
    }
    public function remote_cart($id)
    {
        $cart = cart::find($id);
        $cart->delete();
        return redirect()->back();
    }
}
