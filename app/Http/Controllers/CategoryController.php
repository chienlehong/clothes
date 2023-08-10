<?php

namespace App\Http\Controllers;

use App\Models\Category ;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return view('admin.category.index',['categories'=>$categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.category.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category_name = $request->input('category_name'); //lay name tu request form gui len
        $category_image = $request->file('category_image')->getClientOriginalName(); //lay ten file
        $request->file('category_image')->storeAs('public/images', $category_image); //luu file vao duong dan public/images voi ten $logo

        //tao data de luu vao db
        $data = [
            'category_name' => $category_name,
            'category_image' => $category_image,
        ];
        Category::create($data); //tao ban ghi co du lieu la $data
        return redirect()->route('category.index')
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
    public function edit(Category $category)
    {
        return view('admin.category.edit',compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category_name = $request->input('category_name');

        $category->fill([
            'category_name'=>$category_name,
        ])->save();
        if($request->file('category_image') !== null){
            $category_image = $request->file('category_image')->getClientOriginalName(); //lay ten file
            $request->file('category_image')->storeAs('public/images', $category_image); //luu file vao duong dan public/images voi ten $logo
            $category->fill([
                'category_image'=> $category_image
            ])->save();
        }
        return redirect()->route('category.index')->with('success','Cap nhap thanh cong');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->forceDelete();
        return redirect()->route('category.index')->with('success','Xoa thanh cong');
    }
    public function share(Request $request){
        $keyword = $request->input('keyword');
        $keyword = trim(strip_tags($keyword));
        $categories=[];
        if ($keyword!=""){
            $categories = Category::where("category_name","LIKE","%$keyword%")->get();
        }
        return view('admin.category.index',['categories'=>$categories]);
    }
}
