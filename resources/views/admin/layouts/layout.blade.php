<!DOCTYPE html>
<html lang="en">
 <head>
        <meta charset="utf-8">
        <title>Admin - Quản lý cửa hàng</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description">
        <meta content="Coderthemes" name="author">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
       
        <!-- App favicon -->
        <link rel="shortcut icon" href="{{asset('admin\images\favicon.ico')}}">

        <!-- plugin css -->
        <link href="{{asset('admin\libs\jquery-vectormap\jquery-jvectormap-1.2.2.css')}}" rel="stylesheet" type="text/css">

        <!-- App css -->
        <link href="{{asset('admin\css\bootstrap.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('admin\css\icons.min.css')}}" rel="stylesheet" type="text/css">
        <link href="{{asset('admin\css\app.min.css')}}" rel="stylesheet" type="text/css">

        <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script> -->




    </head>
<body> 
    <header >
        
        @include('admin.layouts.header')
    </header> 
    
    <aside>
    @include('admin.layouts.aiside')
    </aside>

    <div >
        @yield('content')
    </div>

    <footer class="footer">
        
        @include('admin.layouts.footer')
    </footer>
     <!-- Vendor js -->
     <script src="{{asset('admin\js\vendor.min.js')}}"></script>

<!-- Third Party js-->
<script src="{{asset('admin\libs\peity\jquery.peity.min.js')}}"></script>
<script src="{{asset('admin\libs\apexcharts\apexcharts.min.js')}}"></script>
<script src="{{asset('admin\libs\jquery-vectormap\jquery-jvectormap-1.2.2.min.js')}}"></script>
<script src="{{asset('admin\libs\jquery-vectormap\jquery-jvectormap-us-merc-en.js')}}"></script>

<!-- Dashboard init -->
<script src="{{asset('admin\js\pages\dashboard-1.init.js')}}"></script>

<!-- App js -->
<script src="{{asset('admin\js\app.min.js')}}"></script>
</body>
</html>