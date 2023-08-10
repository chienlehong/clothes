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
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Quản lý danh mục </a></li>
                            <li class="breadcrumb-item active">Danh sách sản phẩm</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Danh sách sản phẩm</h4>
                </div>
            </div>
        </div>
    </div>
    @if ($message = Session::get('success'))
    <div class="alert alert-success">
        <p>{{ $message }}</p>
    </div>
    @endif
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>S.No</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Ảnh</th>
                <th>Mô tả</th>
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th width="280px">Action</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($products as $pro)
            <tr>
                <td>{{ $pro->id }}</td>
                <td>{{ $pro->product_name }}</td>
                <th>{{$pro->price}}</th>
                <th><img style="height: 100px;width:150px;" src="{{asset('storage/images/'.$pro->image)}}" alt=""></th>
                <td>{{ $pro->description }}</td>
                <td>{{$pro->brand->brand_name}}</td>
                <th>{{$pro->category->category_name}}</th>
                <td>
                    <form action="{{ route('product.destroy',$pro->id) }}" method="Post">
                        <a class="btn btn-primary" href="{{ route('product.edit',$pro->id) }}">Sửa</a>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-flat show-alert-delete-box" data-toggle="tooltip" title='Delete'>Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>

    </table>
    <div class="pull-right mb-2">
        <a class="btn btn-success" href="{{ route('product.create') }}"> Thêm danh mục</a>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

<script type="text/javascript">
    $('.show-alert-delete-box').click(function(event){
        var form =  $(this).closest("form");
        var name = $(this).data("name");
        event.preventDefault();
        swal({
            title: "Are you sure you want to delete this record?",
            text: "If you delete this, it will be gone forever.",
            icon: "warning",
            type: "warning",
            buttons: ["Cancel","Yes!"],
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((willDelete) => {
            if (willDelete) {
                form.submit();
            }
        });
    });
</script>
@endsection
