@extends('admin.layouts.layout')

@section('content')
<div class="content-page">
    <div class="content">
        <div class="row">
            <div class="col-12">
                <div class="page-title-box">
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Admin</a></li>
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Quản lý thương hiệu </a></li>
                            <li class="breadcrumb-item active">Thêm thương hiệu</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Thêm thương hiệu</h4>
                </div>
            </div>
        </div>
    </div>
    <!-- @if(session('status'))
        <div class="alert alert-success mb-1 mt-1">
            {{ session('status') }}
        </div>
        @endif -->
    <form action="{{ route('brand.store') }}" method="POST" enctype="multipart/form-data">

        @csrf
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Tên thương hiệu:</strong>
                    <input type="text" name="brand_name" class="form-control" placeholder="Nhập tên thương hiệu">
                    @error('name')
                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Mô tả:</strong>
                    <input type="text" name="brand_description" class="form-control" placeholder="Nhập mô tả">
                    @error('description')
                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="form-group">
                    <strong>Ảnh:</strong>
                    <input type="file" name="logo" class="form-control" placeholder="Brand logo">
                    @error('logo')
                    <div class="alert alert-danger mt-1 mb-1">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-success ml-3">Thêm thương hiệu</button>


    </form>
</div>
@endsection
