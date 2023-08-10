<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandResource extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brand = Brand::get();
        return response()->json($brand);
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
        $brand_name = $request->input('brand_name');
        $logo = $request->file('logo')->getClientOriginalName();
        $request->file('logo')->storeAs('public/images/',$logo);
        $brand_description = $request->input('brand_description');

        $data = [
            'brand_ name'=>$brand_name,
            'logo'=>$logo,
            'brand_description'=>$brand_description
        ];
        $brand = Brand::create($data);
        return response()->json($brand);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return response()->json($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $brand_name = $request->input('brand_name');
        $brand_description = $request->input('brand_description');

        $brand->fill([
            'brand_name'=> $brand_name,
            'brand_description'=>$brand_description
        ])->save();
        if($request->file('logo') !== null){
            $logo = $request->file('logo')->getClientOriginalName();
            $request->file('logo')->storeAs('public/images/',$logo);
            $brand->fill([
                'logo'=>$logo
            ])->save();
        }
        return response()->json($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json($brand);
    }
}
