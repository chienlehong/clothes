<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::all();
        return view('brand.index',['brands'=>$brands]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('brand.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $brand_name = $request->input('brand_name');
        $logo = $request->file('logo')->getClientOriginalName();
        $request->file('logo')->storeAs('public/images',$logo);
        $brand_description = $request->input('brand_description');
        $data = [
            'brand_name'=> $brand_name,
            'logo'=>$logo,
            'brand_description'=>$brand_description
        ];
        Brand::create($data);
        return redirect()->route('brand.index')->with('success','Them thanh cong');;
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
    public function edit(Brand $brand)
    {
        return view('brand.edit',compact('brand'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $brand_name = $request->input('brand_name');
        $brand_description = $request->input('brand_description');
        $brand->fill([
            'brand_name'=>$brand_name,
            'brand_description'=>$brand_description,
        ])->save();
        if($request->file('logo') !== null){
            $logo = $request->file('logo')->getClientOriginalName(); //lay ten file
            $request->file('logo')->storeAs('public/images', $logo); //luu file vao duong dan public/images voi ten $logo
            $brand->fill([
                'logo'=> $logo
            ])->save();
        }
        return redirect()->route('brand.index')->with('success','Cap nhap thanh cong');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->forceDelete();
        return redirect()->route('brand.index')->with('success','Xoa thanh cong');
    }
}
