window.wd.scofield = {
	init: function(){
		this.menumobile();
		this.header();
		if(scofield_radom.item.length > 0 && window.wd.sgnotify == 'true' && window.wd.windowsize > 767){this.suggess_notify();}
		this.shop_system_header();
		this.coupon();
		this.countdownflashsaleTheme();
		this.global();
		this.modalcontact();
		switch (window.wd.template) {
			case 'index':
				this.hometabajax();
				this.countdownflashsale();
				break;
		}
		this.scrollcallback();
	},
	global: () =>{
		$('#btn-main').on('touchstart click', function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).addClass('reverse-animation');
				$(".fixed-action-btn").removeClass('toggle-list')
			} else {
				$(this).removeClass('reverse-animation')
				$(".fixed-action-btn").addClass('toggle-list')
				$(this).addClass('active');
			}
			return false;
		});
		$("body").on("click",".open-quickview,.close-modal-quickview-mob",function(){
			$("body").removeClass('active-quickview');$(".modal-backdrop").removeClass('open-quickview in');
		});
		$("body").on("click","#add-to-cart-qv",function(){
			let product_id = $(this).attr('data-id'),
					variantid = $("#product-select-qv").val(),
					quantity = $("#add-item-form-qv input[name='quantity']").val();
			if(checkFLSBluecore(product_id,quantity)){
				if(window.wd.template.includes('product') && window.wd.appdefault == 'appbuyxgety'){
					buyXgetY.addCartBuyXGetY_detail(false,variantid,quantity,function(){
						window.wd.scofield.successadtocart();
					});
				}else{
					window.wd.scofield.addtocartmodal(variantid,quantity)
				}
			}

		});
				$("body").on("click","#add-to-cart-sale",function(){
			let product_id = $(this).attr('data-id'),
					variantid = $("#product-select-qv").val(),
					quantity = $("#add-item-form-qv input[name='quantity']").val();
			if(checkFLSBluecore(product_id,quantity)){
				if(window.wd.template.includes('product') && window.wd.appdefault == 'appbuyxgety'){
					buyXgetY.addCartBuyXGetY_detail(false,variantid,quantity,function(){
						window.wd.scofield.successadtocart();
					});
				}else{
					var sesstion = sessionStorage.getItem('variantid');
					if(sesstion){
						$(this).prop( "disabled", true );
					}else{
						window.wd.scofield.addtocartmodal(variantid,quantity)
						sessionStorage.setItem('variantid', variantid);
					}
				}
			}

		});
	},
	modalcontact: () =>{
		if(sessionStorage.modal_sub == null && window.wd.modalsubcribe.check == true){
			sessionStorage.modal_sub = 'show' ;			
			setTimeout(() =>{
				$("#modal-subscribe").modal({
					fadeDuration: 200
				});
			},window.wd.modalsubcribe.time_show);
		}
		$('#modal-subscribe form,.form-ft-wanda form').submit(function(e){
			e.preventDefault();
			let self = $(this);
			let emaill = self.find('input[name="contact[email]"]').val(),tag = self.find('input[name="contact[tags]"]').val(),recapcha = self.find('input[name="g-recaptcha-response"]').val();
			$.ajax({
				type: 'POST',
				url:'/account/contact',
				dataType:'json',
				data: "form_type=customer&utf8=✓&contact[email]="+emaill+"&contact[tags]="+tag+"&g-recaptcha-response="+recapcha,
				complete: function(responseText){
					window.wd.scofield.modalsubsucess();
					self.trigger('reset');
				}
			})
		});
	},
	modalsubsucess: () =>{
		$("#success-subcribe-wanda").modal({
			fadeDuration: 200
		});
		setTimeout(() =>{
			closemodal();
		},2000)
	},
	scrollcallback: () =>{
		let offset_sticky_down = 0,height_header = $("header").outerHeight() / 2 + 50;
		$(window).on('scroll',function(){
			let scrolltop = $(window).scrollTop();
			if(window.wd.windowsize > 992){
				if(scrolltop >= height_header && scrolltop > offset_sticky_down){
					$("header").addClass('hSticky');
					if(scrolltop > height_header + 50){
						$("header").removeClass('hSticky-up').addClass('hSticky-nav');	
					}
				}
				else{
					if(scrolltop > height_header + 50 && (scrolltop - 50) + jQuery(window).height() < $(document).height()) {
						$("header").addClass('hSticky-up');	
					}
				}
				if (scrolltop <= offset_sticky_down && scrolltop <= height_header) {
					$("header").removeClass('hSticky-up').removeClass('hSticky-nav');
					if (scrolltop <= height_header - 50) {
						$("header").removeClass('hSticky');
					}
				}
			}
			offset_sticky_down = scrolltop;
			if(scrolltop > 150){$(".back-to-top").addClass('show')}else{$(".back-to-top").removeClass('show')};
		});
		$("body").on("click",".back-to-top",() =>{$('html,body').animate({scrollTop: 0}, 500);});
	},
	plusQuantity: $this => {
		if($this.siblings('input[name="quantity"]').val() != undefined ) {
			let currentVal = parseInt($this.siblings('input[name="quantity"]').val());
			if(!isNaN(currentVal)) {
				$this.siblings('input[name="quantity"]').val(currentVal + 1);
			}else {
				$this.siblings('input[name="quantity"]').val(1);
			}
		}
	},
	minusQuantity: $this => {
		if($this.siblings('input[name="quantity"]').val() != undefined ) {
			let currentVal = parseInt($this.siblings('input[name="quantity"]').val());
			if(!isNaN(currentVal) && currentVal > 1) {
				$this.siblings('input[name="quantity"]').val(currentVal - 1);
			}
		}
	},
	addtocartmodal: (id,quantity) =>{
		var params = {
			type: 'POST',
			url: '/cart/add.js',
			async: true,
			data: 'quantity=' + quantity + '&id=' + id,
			dataType: 'json',
			success:function(line_item){
				BCApp.Tracking.trackingAddItem(quantity,line_item);
				window.wd.scofield.successadtocart();
				window.location.href = '/cart';
				
			},
			error: function(XMLHttpRequest, textStatus) {
				window.wd.scofield.toast_notify('Error','top-right','Sản phẩm bạn vừa mua đã vượt quá tồn kho!','fade','error',2000);
			}
		};
		jQuery.ajax(params);
	},
	addtocartcheckout: (id,quantity) =>{
		var params = {
			type: 'POST',
			url: '/cart/add.js',
			async: true,
			data: 'quantity=' + quantity + '&id=' + id,
			dataType: 'json',
			success: function(line_item){
				BCApp.Tracking.trackingAddItem(quantity,line_item);
				window.location.href = '/checkout';
			},
			error: function(XMLHttpRequest, textStatus) {
				window.wd.scofield.toast_notify('Error','top-right','Sản phẩm bạn vừa mua đã vượt quá tồn kho!','fade','error',2000);
			}
		};
		jQuery.ajax(params);
	},
	successadtocart: (jqXHR, textStatus, errorThrown) =>{
		$.ajax({
			type: 'GET',
			url: '/cart.js',
			async: false,
			cache: false,
			dataType: 'json',
			success: function (cart){
				$("body").removeClass('active-quickview');$(".modal-backdrop").removeClass('open-quickview in');
				$(".js-number-cart").html(cart.item_count);
				window.wd.scofield.toast_notify('Success','top-right','Sản phẩm đã được thêm vào giỏ hàng.','slide','success',2000);
				window.wd.scofield.cartmini();

			}
		});
	},
	cartmini: () =>{
		$.ajax({
			url: '/cart?view=mini',
			type: 'GET',
			dataType: 'json',
			async: true,
			success: function(data){
				let item = '',index = 0;
				var total_sale = 0, total_price = 0;
				if(data.length > 2){
					$.each(data, function(i, v){
						if(i < data.length - 2){
							if(parseInt(v.set_price_original) > parseInt(v.set_price)){
								var price_re = (parseInt(v.set_price_original)*parseInt(v.quantity)) - (parseInt(v.set_price)*parseInt(v.quantity));
								total_sale += price_re;
							}
							total_price += v.set_price_original * parseInt(v.quantity);
							item += `<tr class="list-item" data-line="${v.line}"><td class="img"><a href="${v.url}" title="${v.title}"><img src="${v.image}" alt="${v.title}"></a></td><td class="item"><a class="pro-title-view" href="${v.url}" title="${v.title}">${v.title}</a><span class="variant">${v.variant_title}</span><div class="quantity-area-cartmini d-flex d-flex-center"><input type="text" name="quantity_minicart" value="${v.quantity}" min="1" class="quantity-mini"><span class="pro-price-view">${v.price}</span></div><span class="remove_link remove-cart"><a href="javascript:void(0);" onclick="window.wd.scofield.deletecart(${v.line},${v.id})"><i class="fa fa-times"></i></a></span></td></tr>`;
						}
						index = i;
					});
					$("#cart-mini-wanda #cart-view tbody").html(item);
					$("#cart-mini-wanda .table-total #final-view-cart").html(Haravan.formatMoney(total_price,window.wd.formatmoney));
					$("#cart-mini-wanda .table-total #sale-view-cart").html(Haravan.formatMoney(total_sale,window.wd.formatmoney));
					$("#cart-mini-wanda .table-total #total-view-cart").html(data[index -1].total_price);
					$(".js-number-cart").html(data[index].total_size);
				}
				else{
					$("#cart-mini-wanda #cart-view tbody").html(`<tr><td class="mini_cart_header text-center" style="padding-right:0;"><img src="https://file.hstatic.net/200000525917/file/no-cart_c1e41f3edf5c45b18eb6c64306d881c8_small.png" width="60" height="60"><p>Hiện chưa có sản phẩm</p></td></tr>`);
					$("#cart-mini-wanda .table-total #total-view-cart").html('0₫');
					$("#cart-mini-wanda .table-total #final-view-cart").html('0₫');
					$("#cart-mini-wanda .table-total #sale-view-cart").html('0₫');
					$(".js-number-cart").html('0');
				}
			}
		})
	},
	deletecart: (line,variantId) =>{
		var q_order = BCApp.Config.listCart.find(item => item.variant_id == variantId);
		let params = {
			type: 'POST',
			url: '/cart/change.js',
			data: 'quantity=0&line=' + line,
			dataType: 'json',
			success: function(cart) {
				console.log(cart)
				BCApp.Tracking.trackingRemoveItem(q_order.quantity,q_order);
				window.wd.scofield.cartmini();
			},
			error: (XMLHttpRequest, textStatus) => {
			}
		};
		jQuery.ajax(params);
	},
	toast_notify: (head,position,text,animation,icon,time) =>{
		$.toast({
			heading: head,
			position: position,
			text: text,
			showHideTransition: animation,
			icon: icon,
			hideAfter: time
		});
		$("#pro-qv-wanda .close-modal").trigger('click');
		$("body .modal-backdrop").trigger('click');
		$("body").removeClass('active-quickview');$(".modal-backdrop").removeClass('open-quickview in');
	},
	slidercallback: () =>{
		if($(".slick-callback").not('.slick-initialized').length > 0){
			$(".slick-callback").not('.slick-initialized').each(function(){
				let self = $(this),
						obslick = {
							autoplay: self.data('autoplay'),
							infinite: self.data('infinite') || false,
							dots: self.data('dots') || false,
							slidesToShow: self.data('slides-md'),
							slidesToScroll: self.data('slides-md-scroll'),
							autoplaySpeed: 4000,
							vertical: self.data('vertical') || false,
							fade: self.data('fade') || false,
							responsive: [
								{
									breakpoint: 1200,
									settings: {
										slidesToShow: self.data('slides-tablet'),
										slidesToScroll: self.data('slides-sm-scroll')
									},
								},
								{
									breakpoint: 1024,
									settings: {
										slidesToShow: self.data('slides-tablet'),
										slidesToScroll: self.data('slides-sm-scroll')
									},
								},
								{
									breakpoint: 767,
									settings: {
										slidesToShow: self.data('slides-xs'),
										slidesToScroll: self.data('slides-xs-scroll'),
										vertical: self.data('vertical-mb') || false
									},
								},
							],
							prevArrow: window.wd.navLeftText,
							nextArrow: window.wd.navRightText,
							adaptiveHeight: true
						}
				self.slick(obslick);
			});
		}
	},
	header: () =>{
		$("body").on("click",".list-inline-item .group-icon-item",function() {
			let $this = $(this), parent = $(this).parents('.list-inline-item');
			$('.list-inline-item').not(parent).removeClass('show-modal-header');
			parent.toggleClass('show-modal-header');
			$(".show-modal-header").length > 0 ? $(".modal-backdrop").addClass('in') : $(".modal-backdrop").removeClass('in')
		});
		$("body").on("click",".js-backdrop",function() {
			$('.list-inline-item').removeClass('show-modal-header');
			$(".results-seach").hide();
			$(this).removeClass('in')
		});
		$("body").on("click","#header-login-toggle .js-link",function(){
			$("#header-login-toggle").removeClass('active');
			$("#header-recovery-toggle").addClass('active');
		});
		$("body").on("click","#header-recovery-toggle .js-link",function(){
			$("#header-recovery-toggle").removeClass('active');
			$("#header-login-toggle").addClass('active');
		});
		$('.group-menu-mega > li > a').hover(function(){
			$(this).parents('.menu-mega-inner').find('.item-mega-menu').removeClass('active')
			$(this).parents('.item-mega-menu').addClass('active')
		})
	},
	smathsearch: () =>{
		//$('.wanda-mxm-search .search-input').placeholderTypewriter({text: window.wd.placeholderText});
		let $input = $('.wanda-mxm-search .search-input');
		$input.keyup(function(){
			let key = $(this).val(),$results = $(this).parents('.site_search');
			if(key.indexOf('script') > -1 || key.indexOf('>') > -1){
				alert('Từ khóa của bạn có chứa mã độc hại ! Vui lòng nhập lại key word khác');
				$(this).val('');
				$input.val('');
			}
			else{
				if(key.length > 0 ){
					$(".modal-backdrop").addClass('in');
					$input.val(key);
					$(this).attr('data-history', key);
					let str_product = '',str_article='',keysearch = encodeURIComponent(key);
					setTimeout(() =>{
						str_product = '/search?q=' + keysearch + '&type=product&view=product-data';
						let lct_product = '/search?q=' + keysearch + '&type=product';
						str_article = '/search?q=' + keysearch + '&type=article&view=article-data';
						let lct_article = '/search?q=' + keysearch + '&type=article';
						/* ajax product */
						$.ajax({
							url: str_product,
							type: 'GET',
							dataType: "json",
							async: true,
							success: function(data){
								let item = '',index = 0;
								if(data.length > 1){
									$.each(data, function(i, v){
										if(i < data.length - 1){
											item += `<div class="item-ult"><div class="thumbs"><a href="${v.url}"><img alt="${v.title}" src="${v.thumbnail}" /></a></div><div class="title"><a href="${v.url}" class="title-pro" title="${v.title}">${v.title}</a><p class="f-initial">${v.price}<del data-price="${v.compare_at_price}">${v.compare_at_price}</del></p></div></div>`;}
										index = i;
									});
									$(".total-product-result").attr('href',lct_product);
									$(".total-product-result").html(`Xem tất cả ${data[index].total_search} sản phẩm`)
									$results.find('.product-result-data').removeClass('mg-bottom-10').html(item);
								}else{
									$(".total-product-result").html('')
									$results.find('.product-result-data').addClass('mg-bottom-10').html('Không có sản phẩm phù hợp!');
								}
							}
						});
						/* ajax article */
						$.ajax({
							url: str_article,
							type: 'GET',
							dataType: "json",
							async: true,
							success: function(data){
								let item = '',index = 0;
								if(data.length > 1){
									$.each(data, function(i, v){
										if(i < data.length - 1){
											item += `<div class="item-ult"><div class="thumbs"><a href="${v.url}"><img alt="${v.title}" src="${v.thumbnail}" /></a></div><div class="title"><a href="${v.url}" class="title-pro" title="${v.title}">${v.title}</a><div class="desc">${v.desc}</div><a href="${v.url}" class="read-btn" ><span>Xem thêm »</span></a></div></div>`;}
										index = i;
									});
									$results.find('.article-result-data').html(item);
									$(".total-article-result").attr('href',lct_article);
									$(".total-article-result").html(`Xem tất cả ${data[index].total_search} bài viết`)
								}else{
									$(".total-article-result").html('')
									$results.find('.article-result-data').html('Không có bài viết phù hợp!');
								}
							}
						});
					},300)								 
					setTimeout(() =>{$results.find('.results-seach').show();},350)
				}
				else{
					$input.val(key);
					$results.find('.results-seach').hide();
					$(".modal-backdrop").removeClass('in');
				}
			};

		});
		$("form[action='/search']").submit(function(e){
			e.preventDefault();
			let key = encodeURIComponent($(this).find('input[name="q"]').val()),
					locationhref = '/search?q=' + key + '&type=product';
			window.location.href = locationhref;
		})
	},
	suggess_notify: () =>{
		const ivtsg = setInterval(function() {
			let item = "/products/"+ scofield_radom .item[Math.floor(Math.random() * scofield_radom .item.length)] + ".js",
					name = scofield_radom .name[Math.floor(Math.random() * scofield_radom .name.length)],
					time = scofield_radom .time[Math.floor(Math.random() * scofield_radom .time.length)];
			fetch(item)
				.then(function(response) {
				return response.json();
			})
				.then(product =>{
				let tpsg = 
						`<div class="item">
<div class="d-flex d-flex-center">
<div class="image">
<img src="${Haravan.resizeImage(product.featured_image, 'medium')}" width="100" height="70" alt="${product.title}">
</div>
<div class="content">
<p class="custom-notification-content">
${name}<br>vừa mua <a href="${product.url}"><b>${product.title}</b></a>
<small>${time}</small>
</p>
</div>
</div>
<div class="close-notify"></div>
</div>`;
				$(".suggest-notify").html(tpsg).removeClass('anislideOutDown').addClass('anislideInUp');
				setTimeout(() =>{
					$(".suggest-notify").removeClass('anislideInUp').addClass('anislideInDown');
				},5000)
			}) 
				.catch(function(error) {
				console.log(error);
			});
		},10000);
		$("body").on("click",".close-notify",function(){
			clearInterval(ivtsg);
			$(".suggest-notify").removeClass('anislideInUp').addClass('anislideInDown');
		})
	},
	shop_system_header: () =>{
		$.getJSON(window.wd.jsonmap,function(data){ 
			let datamap = '',datatinh = '<option value="all" selected="">Chọn tỉnh/thành phố</option>',checkdup = '';
			$.each(data.hethongcuahang,function(i,v) {
				datamap += `
<li class="" data-tinh="${urlfriendly(v.tinhthanh)}" data-quan="${urlfriendly(v.quanhuyen)}">
<a href="${v.urlmap}" target="_blank" class="iframe-map" rel="nofollow">
<b>${v.tinhthanh} - ${v.tencuahang}</b>
<span>${v.address}</span>
<span><i class="fa fa-phone"></i> ${v.dienthoai}</span>
<span>Thời gian hoạt động: ${v.giohoatdong}</span>
</a>
<a class="infoLocation" target="_blank" href="${v.urlmap}" rel="nofollow">
<i class="fa fa-location-arrow"></i>
<span class="guideWay">Chỉ đường</span>
</a>
</li>`;
				if(checkdup != v.tinhthanh){
					checkdup = v.tinhthanh;
					datatinh += `<option value="${urlfriendly(v.tinhthanh)}" data-tinh="${v.tinhthanh}" >${v.tinhthanh}</option>`;
				}
			})
			$(".group-store-header .address-link").html(datamap);
			$(".group-store-header .change-tinh").html(datatinh);
			mystorearr.push(data.hethongcuahang);
		});

		$('body').on('change','.group-store-header .change-tinh',function(){
			const valhandle = $(this).val();
			window.wd.scofield.changetinh(valhandle);
			window.wd.scofield.checkshowhide();
		})
		$('body').on('change','.group-store-header .select-quan',function(){
			const valdistrict = $(this).val(),valprovice = $(".group-store-header .change-tinh").val();
			window.wd.scofield.changequan(valdistrict,valprovice);
			window.wd.scofield.checkshowhide();
		});

	},
	changetinh: provice =>{
		var datamap = '<option value="all">Chọn Quận/huyện</option>',checkduplicate = '' ;
		$.each(mystorearr[0],function(i,v){
			if(urlfriendly(v.tinhthanh) == provice){
				if(checkduplicate != v.quanhuyen){
					checkduplicate = v.quanhuyen;
					datamap += `<option value="${urlfriendly(v.quanhuyen)}">${v.quanhuyen}</option>`;
				}
			}
		});
		$('.group-store-header .select-quan').html(datamap)
		$(".group-store-header .address-link li").hide();
		provice == 'all' ? $(".group-store-header .address-link li").show() : $(".group-store-header .address-link li[data-tinh='"+provice+"']").show();
		window.wd.scofield.checkshowhide();
	},
	changequan: (district,provice) =>{
		$(".group-store-header .address-link li").hide();
		district == 'all' ? $(".group-store-header .address-link li[data-tinh='"+provice+"']").show() : $(".group-store-header .address-link li[data-quan='"+district+"']").show();
		window.wd.scofield.checkshowhide();
	},
	checkshowhide: () =>{
		var counter_item = 0;
		$(".group-store-header .address-link li").each(function(){
			var thisstyle = $(this).attr('style');
			if(thisstyle != 'display: none;'){counter_item += 1;}
		})
		if(counter_item == 0){
			$(".group-store-header .address-detail .no-store").addClass('hidden');
			$(".group-store-header .address-detail .no-store").removeClass('hidden');
		}else{
			$(".group-store-header .address-detail .no-store").addClass('hidden');
		}
	},
	coupon: () =>{
		$("body").on("click",".clone-coupon",function(e){
			e.preventDefault();
			var copyText = $(this).attr('data-code');
			var copyTextarea = document.createElement("textarea");
			copyTextarea.textContent = copyText;
			copyTextarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
			document.body.appendChild(copyTextarea);
			copyTextarea.select();
			document.execCommand("copy"); 
			document.body.removeChild(copyTextarea);
			var cur_text = $(this).text(); 
			var $cur_btn = $(this);
			$(".clone-coupon").removeClass('iscopied').text('Sao chép mã')
			$(this).addClass("iscopied");
			$(this).text("Đã sao chép");
			if(window.wd.template == 'cart'){
				let valuecoupon = $cur_btn.attr('data-code');
				$("#code-discont").val(valuecoupon)
			}																										 
		});
	},
	menumobile: () =>{
		window.wd.getdatasite("/?view=menu-mobile",$("#menu-mobile .mb-menu"),'false');
		$(document).on('click','#wanda-close-handle',function(event){
			$("#wd-shoes-scofiled").removeClass('menu-active');
		});
		$("body").on("click",".btn-menu-mb",function(){
			$("body").toggleClass('menu-active');
		})
		$('body').on('click','.cl-open',function(event){
			$(this).next().slideToggle('fast')
			$(this).toggleClass('minus-menu');
		});
	},
	countdownflashsale: () =>{
		/*const second = 1000,minute = second * 60,hour = minute * 60,day = hour * 24,countDown = new Date(window.wd.countdown).getTime();
		let x = setInterval(function() {
			let now = new Date().getTime(),
					distance = countDown - now,
					countday = Math.floor(distance / (day)),
					counthour = Math.floor((distance % (day)) / (hour)),
					countminute = Math.floor((distance % (hour)) / (minute)),
					countsecond = Math.floor((distance % (minute)) / second);
			countday > 9 ? $('.countdown-deal .days').text(countday) : $('.countdown-deal .days').text('0'+countday);
			counthour > 9 ? $('.countdown-deal .hours').text(counthour) : $('.countdown-deal .hours').text('0'+counthour);
			countminute > 9 ? $('.countdown-deal .minutes').text(countminute) : $('.countdown-deal .minutes').text('0'+countminute);
			countsecond > 9 ? $('.countdown-deal .seconds').text(countsecond) : $('.countdown-deal .seconds').text('0'+countsecond);
			if (distance < 0) {
				$('.countdown-deal .days,.countdown-deal .hours,.countdown-deal .minutes,.countdown-deal .seconds').text("00"),
					clearInterval(x);
			} 
		}, second)*/
		if($('.section-flashsale-countdown').length > 0){
			var cc = $('.section-flashsale-countdown .flashsale').attr('data-countdown');
			var cm = $('.section-flashsale-countdown .flashsale').attr('data-comming');
			if(cc){ 
				try{
					dayjs.extend(dayjs_plugin_customParseFormat);
					var countDownDate = new Date(dayjs(cc, "DD/MM/YYYY HH:mm").format()).getTime();
					var countDownCommingDate = new Date(dayjs(cm, "DD/MM/YYYY HH:mm").format()).getTime();
					var date_now = new Date().getTime();
					if(date_now < countDownCommingDate){
						var x = setInterval(function() { 
							var now = new Date().getTime();
							var distance = countDownCommingDate - now;
							var days = Math.floor(distance / (1000 * 60 * 60 * 24));
							var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
							var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
							var seconds = Math.floor((distance % (1000 * 60)) / 1000);
							$('.flashsale').html(`<p class="fl-d">Bắt đầu trong </p><span><b>${days < 10 ? "0"+days : days}</b></span><span><b>${hours < 10 ? "0"+hours: hours}</b></span><span><b>${minutes < 10 ? "0"+minutes: minutes}</b></span><span><b>${seconds < 10 ? "0"+seconds: seconds}</b></span>`);
							if (distance < 0) {
								clearInterval(x);
								var y = setInterval(function() { 
									var now = new Date().getTime();
									var distance = countDownDate - now;
									var days = Math.floor(distance / (1000 * 60 * 60 * 24));
									var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
									var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
									var seconds = Math.floor((distance % (1000 * 60)) / 1000);
									$('.flashsale').html(`<p class="fl-d">Bắt đầu trong </p><span><b>${days < 10 ? "0"+days : days}</b></span><span><b>${hours < 10 ? "0"+hours: hours}</b></span><span><b>${minutes < 10 ? "0"+minutes: minutes}</b></span><span><b>${seconds < 10 ? "0"+seconds: seconds}</b></span>`);
									if (distance < 0) {
										clearInterval(y);
										$('.flashsale').hide();
									}
								}, 1000);
							}
						}, 1000);
					}
					else{
						var x = setInterval(function() { 
							var now = new Date().getTime();
							var distance = countDownDate - now;
							var days = Math.floor(distance / (1000 * 60 * 60 * 24));
							var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
							var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
							var seconds = Math.floor((distance % (1000 * 60)) / 1000);
							$('.flashsale').html(`<span><b>${days < 10 ? "0"+days : days}</b></span><span><b>${hours < 10 ? "0"+hours: hours}</b></span><span><b>${minutes < 10 ? "0"+minutes: minutes}</b></span><span><b>${seconds < 10 ? "0"+seconds: seconds}</b></span>`);
							if (distance < 0) {
								clearInterval(x);
								$('.flashsale').hide();
							}
						}, 1000);
					}

				}catch(e){console.log(e)} 
			}


			setTimeout(function(){
				$('.content-carousel').slick({
					autoplay: false,
					infinite: false,
					dots: false,
					slidesToShow: 4,
					slidesToScroll: 1,
					autoplaySpeed: 4000,
					vertical: false,
					fade: false,
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1
							},
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 4,
								slidesToScroll: 1
							},
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								vertical: false
							},
						},
					],
					prevArrow: window.wd.navLeftText,
					nextArrow: window.wd.navRightText,
					adaptiveHeight: true
				});
			},500)

		}
	},
	countdownflashsaleTheme: () =>{
		/*const second = 1000,minute = second * 60,hour = minute * 60,day = hour * 24,countDown = new Date(window.wd.countdown).getTime();
		let x = setInterval(function() {
			let now = new Date().getTime(),
					distance = countDown - now,
					countday = Math.floor(distance / (day)),
					counthour = Math.floor((distance % (day)) / (hour)),
					countminute = Math.floor((distance % (hour)) / (minute)),
					countsecond = Math.floor((distance % (minute)) / second);
			countday > 9 ? $('.countdown-deal .days').text(countday) : $('.countdown-deal .days').text('0'+countday);
			counthour > 9 ? $('.countdown-deal .hours').text(counthour) : $('.countdown-deal .hours').text('0'+counthour);
			countminute > 9 ? $('.countdown-deal .minutes').text(countminute) : $('.countdown-deal .minutes').text('0'+countminute);
			countsecond > 9 ? $('.countdown-deal .seconds').text(countsecond) : $('.countdown-deal .seconds').text('0'+countsecond);
			if (distance < 0) {
				$('.countdown-deal .days,.countdown-deal .hours,.countdown-deal .minutes,.countdown-deal .seconds').text("00"),
					clearInterval(x);
			} 
		}, second);*/

		let x = setInterval(function() { 
			var d = new Date();
			var hours = 24 - d.getHours();
			if((hours + '').length == 1){
				hours = '0' + hours;
			}
			var min = 60 - d.getMinutes();
			if((min + '').length == 1){
				min = '0' + min;
			}
			var sec = 60 - d.getSeconds();
			if((sec + '').length == 1){
				sec = '0' + sec;
			}
			$('.countdown-deal .hours').html(hours);
			$('.countdown-deal .minutes').html(min);
			$('.countdown-deal .seconds').html(sec);

		}, 1000);
	},
	hometabajax: () =>{
		$("body").on("click touchstart","#home-tab-col li a",function(e){
			e.preventDefault();
			let $this = $(this),dataid = $this.attr('href'),url= $this.attr('data-url'),selector_tab = $(dataid);
			$(".tab-result .tab-pane").hide();
			$("#home-tab-col li a").removeClass('active');
			$this.addClass('active');
			if(!$this.hasClass('success-ajax')){
				window.wd.getdatasite(url,selector_tab,'false','true');
				$this.addClass('success-ajax');
			}
			$(dataid).show();
		})
	},
	quickview: url_qv =>{
		let data_result = $("#pro-qv-wanda");
		window.wd.getdatasite(url_qv,data_result,'false','false',function(){
			data_result.modal({
				fadeDuration: 200
			});
			setTimeout(() =>{$("#flex-owl-quickview").slick('unslick');$("#flex-owl-quickview").slick({slidesToShow: 1,slidesToScroll: 1,autoplay: false,speed: 500,infinite: false});},200);
		});
	},
	quickviewmobile: url_qv =>{
		let data_result = $("#pro-quickview-mobile");
		window.wd.getdatasite(url_qv,data_result,'false','false');
		$("body").addClass('active-quickview');
		$(".modal-backdrop").addClass('open-quickview in');
	},
	addtocartloop: (size,variantid,url,e,product_id) =>{
		e.preventDefault();
		let urlquickdesk = url + '?view=quickview-nochoose',urlquickmobile = url + '?view=quickview-mobile', urlquicksale= url + '?view=quickview-sale-mobie';
		if(checkFLSBluecore(product_id,1)){
			if(window.wd.windowsize > 992){

				size == 'true' ? window.wd.scofield.quickview(urlquickdesk) : window.wd.scofield.addtocartmodal(variantid,'1')
			}
			else{
				size == 'true' ? window.wd.scofield.quickviewmobile(urlquickmobile) : window.wd.scofield.addtocartmodal(variantid,'1')
			}
		}
	}
}
$(document).ready(() =>{
	$(".add-height-img p img").attr('width','600').attr('height','600').addClass('dt-width-auto');
	if(navigator[_0x2c0xa[2]][_0x2c0xa[1]](_0x2c0xa[0])==  -1){window.wd.scofield.init();}
});
if(navigator[_0x2c0xa[2]][_0x2c0xa[1]](_0x2c0xa[0])==  -1){
	$(window).load(() =>{
		window.wd.scofield.slidercallback();
		window.wd.scofield.smathsearch();

	})
}