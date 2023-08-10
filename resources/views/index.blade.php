@include('fontend.header');
<body id="wd-shoes-scofiled" class=" position-cart-loop-right" data-template="index">
    <!--id=''-->
        <header id="header" class="site-header">
            <div id="topbar">
                <div class="marquee-topbar">

                    <div class="item">
                        <p><strong>FREESHIP | ĐƠN HÀNG TỪ 500K</strong></p>
                    </div>
                </div>
            </div>
            <div id="site-header-center" class="header-top">
                <div class="container">
                    <div class="row d-flex d-flex-center">
                        <div class="hidden-lg hidden-md col-xs-3 col-sm-4 d-flex pd-right-0">
                            <button class="btn-menu-mb">
                                Menu <i class="fa-bars-menu" aria-hidden="true"></i><i class="fa-bars-menu"
                                    aria-hidden="true"></i><i class="fa-bars-menu" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="logo col-md-2 col-xs-6 col-sm-4 pd-right-0">
                            " "
                            <a href="index.html">
                                <img class="dt-width-auto1" height="35" width="130"
                                    src="../file.hstatic.net/1000253775/file/artboard_1_ebef4d1c5d614a7d87927609380977e7.png"
                                    alt="160STORE">
                            </a>
                        </div>
                        <nav class="col-md-6 hidden-xs hidden-sm pd-right-0">
                            <div class="site_search search-desktop">
                                <form action="{{route('index')}}" class="wanda-mxm-search" method="get">
                                    @csrf
                                    <div class="search-inner">
                                        <input name="keyword" autocomplete="off"
                                            class="searchinput input-search search-input" type="text"
                                            size="20" placeholder="Bạn đang tìm gì..." aria-label="Search">
                                    </div>
                                    <button type="submit" class="btn-search" aria-label="Tìm kiếm">
                                        <img width="24" height="24"
                                            src="http://theme.hstatic.net/1000253775/1001045509/14/search-icon.svg?v=1651"
                                            alt="Tìm kiếm">
                                    </button>
                                </form>

                            </div>
                        </nav>
                        <div class="col-md-4 group-icon-header col-xs-3 col-sm-4 pd-right-0 pd-0-mb">
                            <div class="cart-login-search align-items-center">
                                <ul
                                    class="list-inline list-unstyled mb-0 d-flex-header header-group-icon d-flex-center">
                                    <li class="list-inline-item mr-0 hidden-md hidden-lg header-search-mb">
                                        <a class="group-icon-item d-flex d-flex-center" href="javascript:void(0)">
                                            <span class="box-icon">
                                                <img width="24" height="24"
                                                    src="http://theme.hstatic.net/1000253775/1001045509/14/search-icon.svg?v=1651"
                                                    alt="Tìm kiếm">
                                            </span>
                                            <span class="box-text hidden-xs">
                                                Tìm kiếm
                                            </span>
                                            <span class="box-arrow">
                                                <svg viewBox="0 0 20 9" role="presentation">
                                                    <path
                                                        d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                        fill="#ffffff"></path>
                                                </svg>
                                            </span>
                                        </a>

                                    </li>
                                    <li class="list-inline-item mr-0 hidden-xs hidden-sm header-store">
                                        <div class="list-inline-item-text">
                                            <a class="group-icon-item d-flex d-flex-center "
                                                href="javascript:void(0)">
                                                <span class="box-icon">
                                                    <img width="24" height="24"
                                                        src="http://theme.hstatic.net/1000253775/1001045509/14/location.svg?v=1651"
                                                        alt="Hệ thống cửa hàng">
                                                </span>
                                                <span class="box-text">
                                                    Hệ thống
                                                    <span class="small-text">cửa hàng</span>
                                                </span>
                                                <span class="box-arrow">
                                                    <svg viewBox="0 0 20 9" role="presentation">
                                                        <path
                                                            d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                            fill="#ffffff"></path>
                                                    </svg>
                                                </span>
                                            </a>

                                        </div>
                                    </li>
                                    <div class="d-flex-center">

                                        @if(Auth::check())
                                                <p class="fw-semibold d-block text-white">{{ Auth::user()->name }}</p>
                                                <form action="{{ route('logout') }}" method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <i class="bx bx-power-off me-2"></i>
                                                    <button type="submit">Log Out</button>
                                                </form>
                                        @else
                                                <p class="fw-semibold d-block text-white"></p>
                                        @endif
                                    </div>
                                    <li class="list-inline-item mr-0 hidden-sm header-account">
                                        <div class="list-inline-item-text">
                                            <p class="group-icon-item d-flex d-flex-center "
                                                href="javascript:void(0)">
                                                <span class="box-icon">
                                                    <img width="24" height="24"
                                                        src="http://theme.hstatic.net/1000253775/1001045509/14/user-account.svg?v=1651"
                                                        alt="Tài khoản">
                                                </span>
                                                <span class="box-text">
                                                    <a class="text-white" href="{{ url('/login') }}">Đăng nhập</a>
                                                    <span class="small-text"><a class="text-white"
                                                            href="{{ url('/register') }}">Đăng ký</a></span>

                                                </span>
                                                <span class="box-arrow">
                                                    <svg viewBox="0 0 20 9" role="presentation">
                                                        <path
                                                            d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                            fill="#ffffff"></path>
                                                    </svg>
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                    <li class="list-inline-item mr-0 header-cart">
                                        <div class="list-inline-item-text">
                                            <a class="group-icon-item d-flex d-flex-center "
                                                href="{{URl('/show_cart')}}">
                                                <span class="box-icon">
                                                    <img width="24" height="24"
                                                        src="http://theme.hstatic.net/1000253775/1001045509/14/shopping-cart.svg?v=1651"
                                                        alt="Hệ thống cửa hàng">
                                                    <span class="js-number-cart number-cart">0</span>
                                                </span>
                                                <span class="box-text hidden-xs">
                                                    Giỏ hàng
                                                </span>
                                                <span class="box-arrow">
                                                    <svg viewBox="0 0 20 9" role="presentation">
                                                        <path
                                                            d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z"
                                                            fill="#ffffff"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom">
                <div class="container">
                    <div class="d-flex d-flex-center">
                        <nav class="hidden-sm hidden-xs site-nav-menu">
                            <ul class="d-flex js-center ">

                                <li class="  ">
                                    <a href="collections/san-pham-moi.html"> HÀNG MỚI</a>

                                </li>
                                <li class="  highlight">
                                    <a href="collections/outlet.html"> SALE UPTO 70</a>

                                </li>
                                <li class="  ">
                                    <a href="#"> SẢN PHẨM<i class="fa-chevron-down" aria-hidden="true"></i></a>

                                    <div class="sub_top_menu">
                                        <ul class="sub_menu_dropdown">
                                            @foreach ($category as $cate)
                                                <li><a
                                                        href="/showcategory/{{ $cate->id }}">{{ $cate->category_name }}</a>
                                                </li>
                                            @endforeach
                                            <li class="">
                                                <a href="" title="TẤT CẢ SẢN PHẨM">
                                                    Thương Hiệu
                                                </a>
                                                <ul class="sub_menu_dropdown lv3">
                                                    @foreach ($brand as $bran)
                                                        <li><a
                                                                href="/showbrand/{{ $bran->id }}">{{ $bran->brand_name }}</a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                </li>
                                <li class="  ">
                                    <a href="pages/quy-dinh-chung.html"> HƯỚNG DẪN - CHÍNH SÁCH<i
                                            class="fa-chevron-down" aria-hidden="true"></i></a>

                                    <div class="sub_top_menu">
                                        <ul class="sub_menu_dropdown">

                                            <li class="">
                                                <a href="pages/huong-dan-dat-hang.html" title="HƯỚNG DẪN ĐẶT HÀNG">
                                                    HƯỚNG DẪN ĐẶT HÀNG
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/huong-dan-kiem-tra-sp-tai-cac-chi-nhanh.html"
                                                    title="KIỂM TRA SẢN PHẨM TẠI CHI NHÁNH">
                                                    KIỂM TRA SẢN PHẨM TẠI CHI NHÁNH
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/huong-dan-kiem-tra-don-hang.html"
                                                    title="KIỂM TRA ĐƠN HÀNG">
                                                    KIỂM TRA ĐƠN HÀNG
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/tai-khoan-ngan-hang.html" title="TÀI KHOẢN NGÂN HÀNG">
                                                    TÀI KHOẢN NGÂN HÀNG
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/chinh-sach-doi-tra.html" title="CHÍNH SÁCH ĐỔI TRẢ">
                                                    CHÍNH SÁCH ĐỔI TRẢ
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/ctmembership.html" title="CHÍNH SÁCH KHÁCH HÀNG">
                                                    CHÍNH SÁCH KHÁCH HÀNG
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/chinh-sach-sinh-nhat.html"
                                                    title="CHƯƠNG TRÌNH ƯU ĐÃI SINH NHẬT">
                                                    CHƯƠNG TRÌNH ƯU ĐÃI SINH NHẬT
                                                </a>
                                            </li>

                                            <li class="">
                                                <a href="pages/chinh-sach-bao-mat.html" title="CHÍNH SÁCH BẢO MẬT">
                                                    CHÍNH SÁCH BẢO MẬT
                                                </a>
                                            </li>

                                        </ul>
                                    </div>

                                </li>
                                <li class="  ">
                                    <a href="pages/lien-he.html"> ĐỊA CHỈ CỬA HÀNG</a>

                                </li>
                                <li class="  ">
                                    <a href="blogs/all.html"> TIN TỨC</a>

                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
        <nav id="menu-mobile" class="hidden-md">
            <div class="mn-mb-header text-center">
                <a href="index.html">
                    <img src="../file.hstatic.net/1000253775/file/artboard_1_ebef4d1c5d614a7d87927609380977e7.png"
                        alt="160STORE" style="width:170px;height:50px;">
                </a>
            </div>
            <button id="wanda-close-handle" class="wanda-close-handle" aria-label="Đóng" title="Đóng">
                <span class="mb-menu-cls" aria-hidden="true"><span class="bar animate"></span></span>Đóng
            </button>
            <ul class="mb-menu"></ul>
        </nav>
        <main>
            <div class="container">
                <div class=" row left-dot-15 mg-top-15 mg-left--15 bg-flash-sale pd-flash-sale">
                @foreach ($listsp as $pro1)
                <div class="d-flex-slick slick-callback left-dot-15 mg-top-15 mg-left--15 col-3 item-owl pd-left--15">
                    <div class="product-block item">
                        <div class="product-img  has-hover"
                            data-frame="hangmoi FD-TON KIỂM K&#202; 11toncao QS10 QS304 MIDSS30 MIDSS23 frame1 sale30 saleupto LAST">
                            <a href="/detail/{{ $pro1->id }}" title="{{ $pro1->product_name }}"
                                class="image-resize ">
                                <div class="product-sale" style="display:none"><span>-30%</span></div>
                                <img class="lazyload dt-width-100 img-first" width="260"
                                    height="260" src="{{ asset('storage/images/' . $pro1->image) }}"
                                    data-src="{{ asset('storage/images/' . $pro1->image) }}"
                                    alt="{{ $pro1->product_name }}" />
                                <img class="lazyload dt-width-100 img-hover hidden-xs" width="260"
                                    height="260" src="{{ asset('storage/images/' . $pro1->image) }}"
                                    data-src="{{ asset('storage/images/' . $pro1->image) }}"
                                    alt="{{ $pro1->product_name }}" />
                            </a>
                            <div class="button-loop-pro hidden-xs hidden-sm">
                                <button class="btn-quickview"
                                    onclick="window.wd.scofield.quickview('/products/quan-short-kaki-icondenim-form-slim-1?view=quickview-nochoose')"
                                    type="button">
                                    <img src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                        width="16" height="16">
                                </button>
                            </div>
                            <div class="atc-loop d-flex js-center mg-top-auto">
                                <button {{ action('add_cart', $pro1->id) }} onclick="window.wd.scofield.addtocartloop('true','1093263933','/products/quan-short-kaki-icondenim-form-slim-1',event,'1042603077')"
                                    class="atc-mb-loop" type="button"><span class="atc-text">Thêm
                                        vào
                                        giỏ</span><span class="bd-cart"><img class="atc-default"
                                            width="20" height="20"
                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart.svg?v=1651"
                                            alt="Thêm vào giỏ"><img class="atc-hv" width="20"
                                            height="20"
                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart-hv.svg?v=1651"
                                            alt="Thêm vào giỏ"></span></button>
                            </div>
                        </div>
                        <div class="product-detail">
                            <h3 class="pro-name">
                                <a href="" title="{{ $pro1->product_name }}">
                                    {{ $pro1->product_name }}
                                </a>
                            </h3>
                            <div class="box-pro-prices">
                                <p class="pro-price-sale">
                                    <span>{{ number_format($pro1->price * (1 - 30 / 100)) }}</span>
                                    <del class="compare-price">{{ number_format($pro1->price) }}</del>
                                </p>
                                <ul class="hash-tag-loop d-flex">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
                </div>
            </div>
            <section id="section-flash-sale" class="pd-top-30" data-include="section-flash-sale">
                <div class="container">
                    <div class="bg-flash-sale pd-flash-sale">
                        <div class="wd-top-title wd-heading-flash-sale d-flex d-flex-center">
                            <h2 class="title-section mg-0">
                                <span><img width="20" height="20"
                                        src="../file.hstatic.net/200000525917/file/flash-sale_e6ba39a2380a4deaac1a7b4897f2d803.png"
                                        alt="">SALE UP TO 70%</span>
                            </h2>

                            <ul class="countdown-deal d-flex d-flex-center js-center">
                                <li><strong class="days">00</strong><small>Ngày</small></li>
                                <li><strong class="hours">00</strong><small>Giờ</small></li>
                                <li><strong class="minutes">00</strong><small>Phút</small></li>
                                <li><strong class="seconds">00</strong><small>Giây</small></li>
                            </ul>
                        </div>
                        <div id="owl-collection-flash-sale"
                            class="d-flex-slick slick-callback  left-dot-15 mg-top-15 mg-left--15" data-md="5"
                            data-xs="2" data-sm="3" data-slides-md="5" data-slides-tablet="3"
                            data-slides-xs="2" data-slides-md-scroll="5" data-slides-tablet-scroll="3"
                            data-slides-xs-scroll="2" data-dots="true" data-autoplay="false" data-infinite="true"
                            data-custom-arrows="true">
                            @foreach ($differentProducts as $pro)
                                <div class="d-flex-column item-owl pd-left--15">
                                    <div class="product-block item">
                                        <div class="product-img  has-hover"
                                            data-frame="hangmoi FD-TON KIỂM K&#202; 11toncao QS10 QS304 MIDSS30 MIDSS23 frame1 sale30 saleupto LAST">
                                            <a href="/detail/{{ $pro->id }}" title="{{ $pro->product_name }}"
                                                class="image-resize ">
                                                <div class="product-sale" style="display:none"><span>-30%</span></div>
                                                <img class="lazyload dt-width-100 img-first" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $pro->image) }}"
                                                    data-src="{{ asset('storage/images/' . $pro->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                                <img class="lazyload dt-width-100 img-hover hidden-xs" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $pro->image) }}"
                                                    data-src="{{ asset('storage/images/' . $pro->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                            </a>
                                            <div class="button-loop-pro hidden-xs hidden-sm">
                                                <button class="btn-quickview"
                                                    onclick="window.wd.scofield.quickview('/products/quan-short-kaki-icondenim-form-slim-1?view=quickview-nochoose')"
                                                    type="button">
                                                    <img src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                                        width="16" height="16">
                                                </button>
                                            </div>
                                            <div class="atc-loop d-flex js-center mg-top-auto">
                                                <form action="{{route('add_cart',$pro->id)}}" method="post">
                                                    @csrf
                                                    <input type="hidden" name="product_id"
                                                            value="{{ $pro->id }}">
                                                    <button type="submit"
                                                    onclick="window.wd.scofield.addtocartloop('true','1093263933','/products/quan-short-kaki-icondenim-form-slim-1',event,'1042603077')"
                                                    class="atc-mb-loop" type="button"><span class="atc-text">Thêm
                                                        vào
                                                        giỏ</span><span class="bd-cart"><img class="atc-default"
                                                            width="20" height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart.svg?v=1651"
                                                            alt="Thêm vào giỏ"><img class="atc-hv" width="20"
                                                            height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart-hv.svg?v=1651"
                                                            alt="Thêm vào giỏ"></span></button>
                                                        </form>
                                            </div>
                                        </div>
                                        <div class="product-detail">
                                            <h3 class="pro-name">
                                                <a href="" title="{{ $pro->product_name }}">
                                                    {{ $pro->product_name }}
                                                </a>
                                            </h3>
                                            <div class="box-pro-prices">
                                                <p class="pro-price-sale">
                                                    <span>{{ number_format($pro->price * (1 - 30 / 100)) }}</span>
                                                    <del class="compare-price">{{ number_format($pro->price) }}</del>
                                                </p>
                                                <ul class="hash-tag-loop d-flex">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div class="text-center btn-view-all">
                            <a class="btn" href="collections/outlet.html">
                                Xem tất cả »
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-home-product-tab" class="pd-top-30" data-include="section-home-product-tab">
                <div class="container">
                    <div class="wd-top-title d-flex d-flex-center">
                        <h2 class="title-section">
                            <span></span>
                        </h2>
                        <ul class="nav nav-tabs" role="tablist" id="home-tab-col">
                            <li role="presentation"><a class="active success-ajax" role="tab" data-toggle="tab"
                                    data-url="/collections/san-pham-moi?view=home-tab" href="#tab-hang-moi">HÀNG
                                    MỚI</a></li>
                            <li role="presentation"><a role="tab" data-toggle="tab"
                                    data-url="/collections/outlet?view=home-tab" href="#tab-sale-upto-70">SALE UPTO
                                    70%</a></li>
                            <li role="presentation"><a role="tab" data-toggle="tab"
                                    data-url="/collections/last-chance?view=home-tab" href="#tab-last-chance">LAST
                                    CHANCE</a></li>
                        </ul>
                    </div>
                    <div class="tab-result">
                        <div id="owl-collection-flash-sale"
                            class="d-flex-slick slick-callback  left-dot-15 mg-top-15 mg-left--15" data-md="5"
                            data-xs="2" data-sm="3" data-slides-md="5" data-slides-tablet="3"
                            data-slides-xs="2" data-slides-md-scroll="5" data-slides-tablet-scroll="3"
                            data-slides-xs-scroll="2" data-dots="true" data-autoplay="false" data-infinite="true"
                            data-custom-arrows="true">
                            @foreach ($products as $prod)
                                <div class="d-flex-column item-owl pd-left--15">
                                    <div class="product-block item">
                                        <div class="product-img  has-hover"
                                            data-frame="hangmoi FD-TON KIỂM K&#202; 11toncao QS10 QS304 MIDSS30 MIDSS23 frame1 sale30 saleupto LAST">
                                            <a href="products/quan-short-kaki-icondenim-form-slim-1.html"
                                                title="{{ $pro->product_name }}" class="image-resize ">
                                                <div class="product-sale" style="display:none"><span>-30%</span></div>
                                                <img class="lazyload dt-width-100 img-first" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $prod->image) }}"
                                                    data-src="{{ asset('storage/images/' . $prod->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                                <img class="lazyload dt-width-100 img-hover hidden-xs" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $prod->image) }}"
                                                    data-src="{{ asset('storage/images/' . $prod->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                            </a>
                                            <div class="button-loop-pro hidden-xs hidden-sm">
                                                <button class="btn-quickview"
                                                    onclick="window.wd.scofield.quickview('/products/quan-short-kaki-icondenim-form-slim-1?view=quickview-nochoose')"
                                                    type="button">
                                                    <img src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                                        width="16" height="16">
                                                </button>
                                            </div>
                                            <div class="atc-loop d-flex js-center mg-top-auto">
                                                <button
                                                    onclick="window.wd.scofield.addtocartloop('true','1093263933','/products/quan-short-kaki-icondenim-form-slim-1',event,'1042603077')"
                                                    class="atc-mb-loop" type="button"><span class="atc-text">Thêm
                                                        vào
                                                        giỏ</span><span class="bd-cart"><img class="atc-default"
                                                            width="20" height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart.svg?v=1651"
                                                            alt="Thêm vào giỏ"><img class="atc-hv" width="20"
                                                            height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart-hv.svg?v=1651"
                                                            alt="Thêm vào giỏ"></span></button>
                                            </div>
                                        </div>
                                        <div class="product-detail">
                                            <h3 class="pro-name">
                                                <a href="products/quan-short-kaki-icondenim-form-slim-1.html"
                                                    title="{{ $pro->product_name }}">
                                                    {{ $prod->product_name }}
                                                </a>
                                            </h3>
                                            <div class="box-pro-prices">
                                                <p class="pro-price-sale">
                                                    <span>{{ $prod->price * (1 - 30 / 100) }}</span>
                                                    <del class="compare-price">{{ $prod->price }}</del>
                                                </p>
                                                <ul class="hash-tag-loop d-flex">
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            @endforeach
                        </div>
                        <div id="owl-collection-flash-sale"
                            class="d-flex-slick slick-callback  left-dot-15 mg-top-15 mg-left--15" data-md="5"
                            data-xs="2" data-sm="3" data-slides-md="5" data-slides-tablet="3"
                            data-slides-xs="2" data-slides-md-scroll="5" data-slides-tablet-scroll="3"
                            data-slides-xs-scroll="2" data-dots="true" data-autoplay="false" data-infinite="true"
                            data-custom-arrows="true">
                            @foreach ($product as $pr)
                                <div class="d-flex-column item-owl pd-left--15">
                                    <div class="product-block item">
                                        <div class="product-img  has-hover"
                                            data-frame="hangmoi FD-TON KIỂM K&#202; 11toncao QS10 QS304 MIDSS30 MIDSS23 frame1 sale30 saleupto LAST">
                                            <a href="" title="{{ $pro->product_name }}"
                                                class="image-resize ">
                                                <div class="product-sale" style="display:none"><span>-30%</span></div>
                                                <img class="lazyload dt-width-100 img-first" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $pr->image) }}"
                                                    data-src="{{ asset('storage/images/' . $pr->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                                <img class="lazyload dt-width-100 img-hover hidden-xs" width="260"
                                                    height="260" src="{{ asset('storage/images/' . $pr->image) }}"
                                                    data-src="{{ asset('storage/images/' . $pr->image) }}"
                                                    alt="{{ $pro->product_name }}" />
                                            </a>
                                            <div class="button-loop-pro hidden-xs hidden-sm">
                                                <button class="btn-quickview"
                                                    onclick="window.wd.scofield.quickview('/products/quan-short-kaki-icondenim-form-slim-1?view=quickview-nochoose')"
                                                    type="button">
                                                    <img src="https://file.hstatic.net/200000525917/file/search-icon_61351aaf4f2a4ba0b163434492c75c0d.svg"
                                                        width="16" height="16">
                                                </button>
                                            </div>
                                            <div class="atc-loop d-flex js-center mg-top-auto">
                                                <button
                                                    onclick="window.wd.scofield.addtocartloop('true','1093263933','/products/quan-short-kaki-icondenim-form-slim-1',event,'1042603077')"
                                                    class="atc-mb-loop" type="button"><span class="atc-text">Thêm
                                                        vào
                                                        giỏ</span><span class="bd-cart"><img class="atc-default"
                                                            width="20" height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart.svg?v=1651"
                                                            alt="Thêm vào giỏ"><img class="atc-hv" width="20"
                                                            height="20"
                                                            src="http://theme.hstatic.net/1000253775/1001045509/14/add-to-cart-hv.svg?v=1651"
                                                            alt="Thêm vào giỏ"></span></button>
                                            </div>
                                        </div>
                                        <div class="product-detail">
                                            <h3 class="pro-name">
                                                <a href="" title="{{ $pro->product_name }}">
                                                    {{ $pr->product_name }}
                                                </a>
                                            </h3>
                                            <div class="box-pro-prices">
                                                <p class="pro-price-sale">
                                                    <span>{{ $pr->price * (1 - 30 / 100) }}</span>
                                                    <del class="compare-price">{{ $pr->price }}</del>
                                                </p>
                                                <ul class="hash-tag-loop d-flex">
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-home-banner" class="pd-top-15" data-include="section-home-banner">
                <div class="container">
                    <div class="item">
                        <a href="blogs/tin-tuc/du-an-cong-dong-160store-x-nuoi-em.html" class="banner-effect">
                            <picture>
                                <source media="(max-width: 480px)"
                                    data-srcset="//file.hstatic.net/1000253775/file/carouselmobile_6e537fc4623245c782653f86dfe68075_grande.jpg"
                                    srcset="../file.hstatic.net/1000253775/file/carouselmobile_6e537fc4623245c782653f86dfe68075_small.jpg">
                                <source media="(min-width: 481px)"
                                    data-srcset="//file.hstatic.net/1000253775/file/z4417662585929_bb0839f5d76595739954801425307699_8684eaf32e6d41759474aa5bdb617fe9_2048x2048.jpg"
                                    srcset="../file.hstatic.net/1000253775/file/z4417662585929_bb0839f5d76595739954801425307699_8684eaf32e6d41759474aa5bdb617fe9_small.jpg">
                                <img class="dt-width-100 lazyload" width="1600" height="600" src="#"
                                    alt="NuôiEm">
                            </picture>
                        </a>
                    </div>
                </div>
            </section>
        </main>
        <div class="prefooter-customer mg-top-30">
            <div class="container">
                <div class="bg-prefooter">
                    <div class="d-flex row d-flex-center">
                        <div class="col-md-7 col-sm-7 col-xs-12 d-flex d-flex-center js-between">
                            <p class="title-regis">
                                Đăng kí nhận tin
                            </p>
                            <div class="form-ft-wanda">
                                <form accept-charset='UTF-8' action='https://www.160store.com/account/contact'
                                    class='contact-form' method='post'>
                                    <input name='form_type' type='hidden' value='customer'>
                                    <input name='utf8' type='hidden' value='✓'>
                                    <div class="form-group mb-0 icon-email">
                                        <input type="hidden" id="contact_tags" name="contact[tags]"
                                            value="khách hàng tiềm năng-https://www.160store.com/" />
                                        <input type="email" required="required" autocomplete="on"
                                            name="contact[email]" id="contact_email" placeholder="Email" />
                                    </div>
                                    <button class="btn" type="submit"><i class="fa fa-paper-plane-o"
                                            aria-hidden="true"></i> Đăng ký</button>

                                    <input id='7e9a1442dd8140bc821a3ef0db109007' name='g-recaptcha-response'
                                        type='hidden'><!--<script src='https://www.google.com/recaptcha/api.js?render=6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-'></script>--><!--<script>
                                            grecaptcha.ready(function() {
                                                grecaptcha.execute('6LdD18MUAAAAAHqKl3Avv8W-tREL6LangePxQLM-', {
                                                    action: 'submit'
                                                }).then(function(token) {
                                                    document.getElementById('7e9a1442dd8140bc821a3ef0db109007').value = token;
                                                });
                                            });
                                        </script>-->
                                </form>
                            </div>
                        </div>
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <ul class="social-footer d-flex d-flex-center">
                                <li class="zalo"><a href="http://zalo.me/3664144181122308942" rel="nofollow"><img
                                            width="30" height="30"
                                            src="https://file.hstatic.net/200000397757/file/zalo-icon_0adb17d386cc4785b30ef66e470b4342.svg"
                                            alt="Liên hệ với chúng tôi qua Zalo"></a></li>
                                <li class="instagram"><a href="https://www.instagram.com/160store" rel="nofollow"><i
                                            class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li class="facebook"><a href="https://www.facebook.com/160store" rel="nofollow"><i
                                            class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="mg-0 pd-bt-50-mb ">
            <div class="top-ft-wanda">
                <div class="container">
                    <div class="d-flex row">
                        <div class="col-md-3 col-sm-6 col-xs-12 infomation mg-bottom-15">
                            <div class="title-footer">
                                <div class="h4">
                                    Giới thiệu
                                </div>
                            </div>
                            <div class="infomation-wanda">
                                <p>
                                    160STORE - Chuỗi Phân Phối Thời Trang Nam Chuẩn Hiệu
                                </p>
                                <ul>
                                    <!--	<li><i class="fa fa-map-marker" aria-hidden="true"></i> </li> -->
                                    <li><i class="fa fa-phone" aria-hidden="true"></i> <a rel="nofollow"
                                            href="tel:02871006789">02871006789</a></li>
                                    <li><i class="fa fa-envelope-o" aria-hidden="true"></i> <a rel="nofollow"
                                            href="mailto:cs@160store.com">cs@160store.com</a></li>
                                    <li class="bocongthuong"><a rel="nofollow"
                                            href="http://online.gov.vn/Home/WebDetails/99500?AspxAutoDetectCookieSupport=1"><img
                                                class="dt-width-auto" width="160" height="40"
                                                src="../file.hstatic.net/200000397757/file/dathongbao_48067cd02fae41b68bf0294777c39c94_compact.png"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-6 tablink mg-bottom-15">
                            <div class="title-footer">
                                <div class="h4">
                                    Chính sách
                                </div>
                            </div>
                            <div class="footer-link-wanda">
                                <ul>
                                    <li><a href="pages/huong-dan-dat-hang.html">Hướng dẫn đặt hàng</a></li>
                                    <li><a href="pages/chinh-sach-doi-tra.html">Chính sách đổi trả</a></li>
                                    <li><a href="pages/tai-khoan-ngan-hang.html">Thông tin chuyển khoản</a></li>
                                    <li><a href="pages/kiem-tra-don-hang.html">Kiểm tra đơn hàng</a></li>
                                </ul>
                            </div>
                            <!--
     <div class="title-footer">
      <div class="h4">
       <br>
       <a href="https://www.160store.com/pages/lien-he">
       HỆ THỐNG CỬA HÀNG
        </a>
      </div>
     </div>
     -->
                        </div>

                        <div class="col-md-3 col-sm-6 col-xs-12 tablink mg-bottom-15">
                            <div class="title-footer">
                                <div class="h4">
                                    Hệ Thống Cửa Hàng
                                </div>
                            </div>
                            <div class="footer-link-wanda">
                                <ul>
                                    <li><a href="pages/lien-he.html">Hồ Chí Minh</a></li>
                                    <li><a href="pages/lien-he.html">Hà Nội</a></li>
                                    <li><a href="pages/lien-he.html">Đà Nẵng</a></li>
                                    <li><a href="pages/lien-he.html">Cần Thơ</a></li>
                                    <li><a href="pages/lien-he.html">Biên Hòa</a></li>
                                    <li><a href="pages/lien-he.html">Bình Dương</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="title-footer">
                                <div class="h4">
                                    Fanpage chúng tôi
                                </div>
                                <div class="footer-fanpage-wanda">
                                    <div class="fb-page" data-href="https://www.facebook.com/160store"
                                        data-height="300" data-small-header="false" data-adapt-container-width="true"
                                        data-hide-cover="false" data-show-facepile="true" data-show-posts="false">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright-wanda">
                <div class="container">
                    <div class="row ">
                        <div class="col-md-12 text-center">
                            <div class="text-copyright mb-0"><span>BẢN QUYỀN THUỘC VỀ 160STORE</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="modal" id="pro-qv-wanda"></div>
        <div id="pro-quickview-mobile"></div>
        <div class="fixed-action-btn">
            <ul>
                <li class="hotline"><a class="btn-secondary btn-floating" href="tel:02871006789" rel="nofollow"
                        data-toggle="tooltip" data-original-title="Liên hệ 02871006789"><i
                            class="fa fa-phone"></i></a></li>
                <li class="facebook"><a class="btn-secondary btn-floating" href="http://m.me/1042686802417049"
                        rel="nofollow" data-toggle="tooltip"
                        data-original-title="Liên hệ với chúng tôi qua Facebook"><img width="45" height="45"
                            class="dt-width-auto"
                            src="../file.hstatic.net/200000525917/file/messenger-fb_8fcc524fbaad4b1195a150dc5e0575d7.png"></a>
                </li>
                <li class="zalo"><a class="btn-secondary btn-floating" href="http://zalo.me/3664144181122308942"
                        rel="nofollow" data-toggle="tooltip"
                        data-original-title="Liên hệ với chúng tôi qua Zalo"><img width="45" height="45"
                            class="dt-width-auto"
                            src="https://file.hstatic.net/200000397757/file/zalo-icon_0adb17d386cc4785b30ef66e470b4342.svg"
                            alt="Liên hệ với chúng tôi qua Zalo"></a></li>
            </ul>
            <a id="btn-main" class="btn-primary btn-floating btn-large red">
            </a>
        </div>



        <script>
            $(document).ready(() => {
                setTimeout(function() {
                    $('#popup').addClass('popup-show');
                }, 3000);
            });
            $(document).ready(() => {
                let popupClosed = localStorage.getItem('popClosed');
                let popupShown = localStorage.getItem('popShown');
                if (popupClosed) {
                    $('#popup').addClass('popup-hidden');
                }
                $('#closeBtn').click(function() {
                    // Ẩn popup khi nhấp vào nút "X"
                    $('#popup').addClass('popup-hidden');
                    // Lưu trạng thái đã tắt vào localStorage
                    localStorage.setItem('popClosed', true);
                    localStorage.removeItem('popShown', true);
                });
            });
        </script>
        <div class="modal" id="success-subcribe-wanda">
            <div class="row">
                <div class="modal-content">
                    <div class="modal-icon sweet-alert">
                        <div class="sa-icon sa-success animate"> <span
                                class="sa-line sa-tip animateSuccessTip"></span> <span
                                class="sa-line sa-long animateSuccessLong"></span>
                            <div class="sa-placeholder"></div>
                            <div class="sa-fix"></div>
                        </div>
                    </div>
                    <div class="modal-body text-center">
                        <p class="modal-title">Đăng ký thành công.<br>Thông báo sẽ tự động tắt sau 2 giây</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="back-to-top" type="button"><svg version="1.1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px"width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64"
                xml:space="preserve">
                <g>
                    <polyline fill="none" stroke="#000000" stroke-width="2" stroke-linejoin="bevel"
                        stroke-miterlimit="10" points="15,40 32,23 49,40 	" />
                </g>
            </svg>
            back to top</button>
        <div class="modal-backdrop fade js-backdrop"></div>
        <div class="suggest-notify anislideOutDown sales_animated"></div><!-- Đây là suggest sale popup -->
        <script type="text/javascript" src="../theme.hstatic.net/1000253775/1001045509/14/pluginscripte9c9.js?v=1651" defer>
        </script>
        <script type="text/javascript" src="../theme.hstatic.net/1000253775/1001045509/14/main-scriptse9c9.js?v=1651" defer>
        </script>

        <script>
            function checkFLSBluecore(id, quantity) {
                var check = true;
                var check_only = false;
                var hasFlashSale = false;
                if (window.flashSale != '') {
                    $.each(window.flashSale.items, function(i, v) {
                        if (v.id == id && v.hasFashsale == 'True' && v.checkOnly == 'True' && quantity > 1) {
                            check_only = true;
                        }
                    })
                    $.ajax({
                        async: false,
                        url: '/cart.js',
                        success: function(cart) {
                            $.each(cart.items, function(i, v) {
                                $.each(window.flashSale.items, function(i2, v2) {
                                    if (v.product_id == v2.id && v2.id == id && v2.hasFashsale ==
                                        'True' && v2.checkOnly == 'True') {
                                        check_only = true;
                                    }
                                });
                            });
                        }
                    })
                }
                if (check_only == true) {
                    alert('Flash sale chỉ áp dụng mua 1 sản phẩm');
                    check = false;
                }
                return check;
            }

            window.flashSale = '';
        </script>

        <script>
            $('.optionCheck input[type=radio]').change(function(e) {
                var valueCheck = $(this).val();
                if (valueCheck == 'email') {
                    $('.phoneCheckShow').hide();
                    $('.emailCheckShow').show();
                } else {
                    $('.phoneCheckShow').show();
                    $('.emailCheckShow').hide();
                }
            })

            function On_PhoneAuthRecaptchaCallback(token) {
                var frm = $('#phone_auth_recaptcha');
                var data = {
                    'country_code': '84',
                    'phone_number': $('input#pn').val(),
                    'g-recaptcha-response': token
                };
                console.log(data)
                $.ajax({
                    type: "POST",
                    url: '/phone_auth/send_verify_code',
                    data: data,
                    dataType: "json",
                    success: function(data, textStatus, jqXHR) {
                        if (data && data.token) {
                            if ($('#session_info').length > 0) {
                                $('#session_info').val(data.token);
                                $('#phone_auth_recaptcha').hide();
                                $('.otpcode').show();
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus)
                    }
                });
            }
            $('#otp_submit').click(function() {
                var otpCode = $(this).closest('.otpcode-form').find('#otp_code').val();
                if (otpCode == '') {
                    $(this).closest('.otpcode-form').find('.error').html(
                        'Quý khách vui lòng nhập chính xác mã OTP được gửi đến số điện thoại của quý khách');
                } else {
                    $(this).closest('.otpcode-form').submit();
                }
            })
        </script>
        <script>
            window.CustomerShop = {
                customerId: "",
                customerName: "",
                customerPhone: "",
                customerEmail: "",
            }
        </script>

        <script src='../theme.hstatic.net/1000253775/1001045509/14/bluecore-appe9c9.js?v=1651' type='text/javascript'></script>
        <script defer>
            const asyncload = {
                init: function() {
                    this.loadasyncdefer();
                },
                loadasyncdefer: () => {
                    try {
                        ! function(a, c, d) {
                            var b, e = a.getElementsByTagName(c)[0];
                            a.getElementById(d) || ((b = a.createElement(c)).id = d, b.src =
                                "../connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v2.0", e
                                .parentNode.insertBefore(b, e))
                        }(document, "script", "facebook-jssdk")
                    } catch (err) {
                        console.log(err);
                    }
                    let facebookchat = `//m.me/1042686802417049`;
                    //$('body').append(facebookchat);
                }
            }
            $(window).on('load', function() {
                if (navigator[_0x2c0xa[2]][_0x2c0xa[1]](_0x2c0xa[0]) == -1) {
                    setTimeout(() => {
                        asyncload.init();
                    }, 1500)
                }
            })
        </script>


</body>

<!-- Mirrored from www.160store.com/ by HTTrack Website Copier/3.x [XR&CO'2014], Sat, 01 Jul 2023 03:16:56 GMT -->

</html>
