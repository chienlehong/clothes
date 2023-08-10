<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        $products -> load([
            'brand',
            'category'
        ]);
        return view('admin.product.index',['products'=>$products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $brands = Brand::all();
        $category = Category::all();
        return view('admin.product.create',[
            'brands'=>$brands,
            'category'=>$category,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product_name = $request->input('product_name');
        $price = $request->input('price');
        $image = $request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('public/images',$image);
        $desciption = $request->input('description');
        $brand_id = $request->input('brand_id');
        $category_id = $request->input('category_id');

        $data = [
            'product_name'=>$product_name,
            'price'=>$price,
            'image'=>$image,
            'description'=>$desciption,
            'brand_id'=>$brand_id,
            'category_id'=>$category_id,
        ];
        Product::create($data);
        return redirect()->route('product.index')
            ->with('success','Bạn đã thêm thành công');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::find($id);
        $category = Category::all();
        $brands = Brand::all();
        return view('admin.product.edit',[
            'product'=>$product,
            'brands'=>$brands,
            'category'=>$category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $product_name = $request->input('product_name');
        $price = $request->input('price');
        $desciption = $request->input('description');
        $brand_id = $request->input('brand_id');
        $category_id = $request->input('category_id');
        $product->fill([
            'product_name'=>$product_name,
            'price'=>$price,
            'description'=>$desciption,
            'brand_id'=>$brand_id,
            'category_id'=>$category_id,
        ])->save();
        if($request->file('image') !== null){
            $image = $request->file('image')->getClientOriginalName();
            $request->file('image')->storeAs('public/images',$image);
            $product->fill([
                'image'=>$image,
            ])->save();

        }
        return redirect()->route('product.index')->with('success','Cap nhap thanh cong');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->forceDelete();
        return redirect()->route('product.index')->with('success','Xoa thanh cong');
    }
    public function share(Request $request){
        $keyword = $request->input('keyword');
        $keyword = trim(strip_tags($keyword));
        $products=[];
        if ($keyword!=""){
            $products = Product::where("product_name","LIKE","%$keyword%")->get();
        }
        return view('admin.product.index',['categories'=>$products]);
    }
}
