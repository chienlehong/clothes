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
                            <li class="breadcrumb-item"><a href="javascript: void(0);">Quản lý  thương hiệu</a></li>
                            <li class="breadcrumb-item active">Danh sách  thương hiệu</li>
                        </ol>
                    </div>
                    <h4 class="page-title">Danh sách thương hiệu</h4>
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
                    <th>Tên thương hiệu</th>
                    <th>Mô tả </th>
                    <th>Ảnh</th>
                    <th width="280px">Action</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($brands as $brand)
                    <tr>
                        <td>{{ $brand->id }}</td>
                        <td>{{ $brand->brand_name }}</td>
                        <td>{{ $brand->brand_description }}</td>
                        <td>
                            <img src="{{asset('/storage/images/'.$brand->logo)}}" style="height: 50px;width:100px;">
                        </td>
                        <td>
                            <form action="{{ route('brand.destroy',$brand->id) }}" method="Post">
                                <a class="btn btn-primary" href="{{ route('brand.edit',$brand->id) }}">Sửa</a>
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
                    <a class="btn btn-success" href="{{ route('brand.create') }}"> Thêm thương hiệu</a>
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
