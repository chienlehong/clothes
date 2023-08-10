@extends('admin.layouts.layout')

@section('content')
    <div class="content-page"">
        <div class="content-wrapper">
            <div class="container mt-2">
                <div class="row">
                    <div class="col-lg-12 margin-tb">
                        <div class="pull-left mb-2">
                            <h2>Thêm sản phẩm</h2>
                        </div>
                    </div>
                </div>
                @if (session('status'))
                    <div class="alert alert-success mb-1 mt-1">
                        {{ session('status') }}
                    </div>
                @endif
                <form action="{{ route('product.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    @method('POST')
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Tên sản phẩm:</strong>
                                <input type="text" name="product_name" class="form-control" placeholder="Tên sản phẩm">
                                @error('product_name')
                                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Ảnh</strong>
                                <input type="file" name="image" class="form-control">
                                @error('image')
                                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Giá sản phẩm:</strong>
                                <input type="text" name="price" class="form-control" placeholder="Tên sản phẩm">
                                @error('price')
                                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div class="form-group">
                                <strong>Mô sản phẩm:</strong>
                                <textarea name="description" class="form-control" id="" cols="30" rows="10" placeholder="Mô tả"></textarea>
                                @error('product_name')
                                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 d-flex justify-content-between">
                            <div class="form-group col-5 ">
                                <strong>Thương hiệu</strong>
                                <select class="form-select" name="brand_id" aria-label="Default select example">
                                    @foreach ($brands as $brand)
                                        <option value="{{ $brand->id }}">{{ $brand->brand_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-5">
                                <strong>Danh mục</strong>
                                <select class="form-select" name="category_id" aria-label="Default select example">
                                    @foreach ($category as $cate)
                                        <option value="{{ $cate->id }}">{{ $cate->category_name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
