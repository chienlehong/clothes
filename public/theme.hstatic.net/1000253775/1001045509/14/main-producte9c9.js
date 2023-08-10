var check_variant = true, swatch_size = window.wd.productjson.options.length,lengththumb = $("#slider-thumb .item").length;
var LastViewProducts=function(n){var t=this,r=(n=n||{}).storageKey||"HRVLastViewProducts",e=(n.forever,localStorage),u=JSON.parse(e.getItem(r))||[];function i(n){if(!n)return null;var t=null;return jQuery.ajax({type:"GET",url:"/products/"+n+".json",async:!1,contentType:"application/json",success:function(n){t=n.product}}),t}function o(n){for(var t=[],r=0;r<n.length;){var e=i(n[r]);e&&t.push(e),r++}return t}function c(){e.setItem(r,JSON.stringify(u))}t.max=n.max||10,t.all=function(n,t){var u=JSON.parse(e.getItem(r))||[];return t=t||0,o((n=n||0)>=0&&t>0?u=u.slice(n,t):u)},t.count=function(){return u.length},t.add=function(n){return t.count()>=t.max&&u.pop(),-1==t.find(n)?(u.unshift(n),c(),n):null},t.get=function(n){return t.exist(n)?i(n):null},t.find=function(n){return u.indexOf(n)},t.exist=function(n){return-1!=t.find(n)},t.getByOffset=function(n){var r=u[n];return t.get(r)},t.remove=function(n){var r=t.find(n);return!!t.exist(n)&&(u.splice(r,1),c(),!0)},t.clear=function(){return u=[],c(),!0}};
var lastViewProducts = new LastViewProducts({max: 10});
let inventory_manager = false,pro_op1=[],pro_op2=[],pro_op3=[];
(function saveAlgorithm() {lastViewProducts.add(window.wd.handle_product);}());
window.scofield_product = {
	init: function(){
		this.slider();
		this.renderoption(); 
		this.changeswach();
		this.callfirst();
		this.global();
		this.relatedproduct();
		this.seenproduct();
		if(window.wd.windowsize < 767){this.buymobile();}
	},
	slider: () =>{
		$('.product-gallery').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			fade: true,
			asNavFor: '#slider-thumb',
			infinite: false
		});
		$('#slider-thumb').slick({
			slidesToShow: $('#slider-thumb').data('vertical') == false ? 6 : 5,
			slidesToScroll: 1,
			asNavFor: '.product-gallery',
			vertical: $('#slider-thumb').data('vertical'),
			dots: false,
			centerMode: false,
			focusOnSelect: true,
			arrows: true,
			infinite: false,
			responsive: [
				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 5
					}
				}
			],
			onAfterChange: function (slide, index) {
				$('.current-slide').removeClass('current-slide');
				$(this.$slides.get(index)).addClass('current-slide');
			},
			onInit: function (slick) {
				$(slick.$slides.get(0)).addClass('current-slide');
			}
		});
	},
	buymobile: () =>{
		$(window).scroll(function(){
			let scrolltopcheck =	$(window).scrollTop(), offsettop = $("#add-item-form .wrap-addcart").offset().top - (window.innerHeight / 2);
			scrolltopcheck >= offsettop ? $("body").addClass('show-buy-mobile') : $("body").removeClass('show-buy-mobile');
		});
		$("body").on("click","#add-to-cart-wanda",function(){
			let url = window.wd.handle_product + '?view=quickview-mobile';
			window.wd.scofield.quickviewmobile(url)
		});
		$("body").on("click",".buy-now-mb-event",function(){
			$(".buy-now-event").trigger('click');
		});
	},
	global: () =>{
		$("body").on("click",".size-chart",function(){
			$("#modal-sizechart").modal({
				fadeDuration: 200
			});
		});
		$("body").on("click",".tab-mobile",function(){
			$(this).next().slideToggle('fast');
			$(this).toggleClass('active-show');
		});
		$("body").on("click",".product-description-tab li a",function(){
			let $thisid = $(this).attr('data-href');
			$(".product-description-tab li,.product-description-tab .tab-pane").removeClass('active');
			$(this).parent().addClass('active');
			$($thisid).addClass('active');
		});
		$("body").on('click','.location-store p',function(){
			$('.location-store').toggleClass('fast-active');
			if($('.location-store').hasClass('fast-active')){
				$("#toggle-location").html("–");
			}else{
				$("#toggle-location").html("+");
			}
		});
		$("body").on("click","#add-to-cart",function(){
			var product_id = $(this).attr('data-id'),
					id = $('#product-select').val(),
					quantity = $('#add-item-form').find('#quantity').val();
			if(window.wd.appdefault == 'appbuyxgety'){
				if(checkFLSBluecore(product_id,quantity)){
					buyXgetY.addCartBuyXGetY_detail(false,id,quantity,function(){
						window.wd.scofield.successadtocart();
					});
				}
			}
			else{
				if(checkFLSBluecore(product_id,quantity)){
					window.wd.scofield.addtocartmodal(id,quantity)
				}
			}
		});
		$("body").on("click",".buy-combo",function(e){
			e.preventDefault();
			$("body").addClass('active-combo');
			$(".modal-backdrop").addClass('open-combo in');
		});
		$("body").on("click",".buy-now-event:not(.buy-combo)",function(e){
			debugger;
			e.preventDefault();
			var product_id = $(this).attr('data-id'),
					id = $('#product-select').val(),
					quantity = $('#add-item-form').find('#quantity').val();
			if(window.wd.appdefault == 'appbuyxgety'){
				if(checkFLSBluecore(product_id,quantity)){
					buyXgetY.addCartBuyXGetY_detail(false,id,quantity,function(){
						window.location.href = '/checkout';
					});
				}
			}
			else{
				if(checkFLSBluecore(product_id,quantity)){
					window.wd.scofield.addtocartcheckout(id,quantity)
				}
			}
		});
		$("body").on("click",".open-combo,#combo-sidebar .close-sidebar",function(){
			$("body").removeClass('active-combo');$(".modal-backdrop").removeClass('open-combo in');
		});
	},
	renderoption: () =>{
		new Haravan.OptionSelectors("product-select", { product: window.wd.productjson, onVariantSelected: window.scofield_product.selectcallback });
		if(window.wd.productjson.options.length == 1 && window.wd.productjson.options[0] != 'Tiêu đề'){
			$('#add-item-form .selector-wrapper:eq(0)').prepend(`<label>${window.wd.productjson.options[0]}</label>`);
		}
		let found_one_in_stock = false;
		for(let i=0;i< window.wd.productjson.variants.length;i++){
			let variant = window.wd.productjson.variants[i];
			if(variant.available && found_one_in_stock == false){
				found_one_in_stock = true;
				for(let j=0;j< window.wd.productjson.options.length;j++){
					$(`#add-item-form .single-option-selector:eq(${j})`).val(`${variant.options[j]}`).trigger('change');
					$(`.swatch .swatch-element[data-value="${variant.options[j]}"] label`).addClass('sd');
				};
				window.scofield_product.locationstore(variant.id);
			}
			else if(!variant.available && window.wd.productjson.options.length == 1){
				$(`.swatch .swatch-element[data-value="${variant.option1}"]`).addClass('soldout');
				$(`.swatch .swatch-element[data-value="${variant.option1}"] input`).attr('disabled','disabled');
			}
			if(window.wd.productjson.options.length == 2){
				pro_op1.includes(variant.option1) ? '' : pro_op1.push(variant.option1);
				pro_op2.includes(variant.option2) ? '' : pro_op2.push(variant.option2);	
			}
			else if(window.wd.productjson.options.length == 3){
				pro_op1.includes(variant.option1) ? '' : pro_op1.push(variant.option1);
				pro_op2.includes(variant.option2) ? '' : pro_op2.push(variant.option2);	
				pro_op3.includes(variant.option3) ? '' : pro_op3.push(variant.option3);	
			}
		}
		$('#add-item-form .selector-wrapper select').each(function(){
			$(this).wrap( '<span class="custom-dropdown custom-dropdown--white"></span>');
			$(this).addClass("custom-dropdown__select custom-dropdown__select--white");
		});
	},
	changeswach: () =>{
		$("body").on("click","#add-item-form .swatch input",function(){
			var e=$(this),t="";e.parent().siblings().find("label").removeClass("sd"),e.next().addClass("sd");
			var name = e.attr('data-title');
			e.parents('.swatch').find('.color-text').html(name);
			var s=e.attr("name"),d=e.val();if($("#add-item-form select[data-option="+s+"]").val(d).trigger("change"),2==swatch_size)-1!=s.indexOf("1")&&($("#add-item-form #variant-swatch-1 .swatch-element").find("input"),$("#add-item-form #variant-swatch-2 .swatch-element").find("input"),$("#add-item-form #variant-swatch-1 .swatch-element label").removeClass("sd"),$("#add-item-form #variant-swatch-1 .swatch-element").removeClass("soldout"),$("#add-item-form .selector-wrapper .single-option-selector").eq(1).find("option").each(function(){var a=$(this).val();$(this).parent().val(a).trigger("change"),check_variant?""==t&&(t=a):($('#add-item-form #variant-swatch-1 .swatch-element[data-value="'+a+'"]').addClass("soldout"),$('#add-item-form #variant-swatch-1 .swatch-element[data-value="'+a+'"]').find("input"))}),$("#add-item-form .selector-wrapper .single-option-selector").eq(1).val(t).trigger("change"),$('#add-item-form #variant-swatch-1 .swatch-element[data-value="'+t+'"] label').addClass("sd"));else if(3==swatch_size){$("#add-item-form #variant-swatch-1 .swatch-element").size();var i=$("#add-item-form #variant-swatch-2 .swatch-element").size();if(-1!=s.indexOf("1")){$("#add-item-form #variant-swatch-1 .swatch-element").find("input"),$("#add-item-form #variant-swatch-2 .swatch-element").find("input"),$("#add-item-form #variant-swatch-1 .swatch-element label").removeClass("sd"),$("#add-item-form #variant-swatch-1 .swatch-element").removeClass("soldout"),$("#add-item-form #variant-swatch-2 .swatch-element label").removeClass("sd"),$("#add-item-form #variant-swatch-2 .swatch-element").removeClass("soldout");var r="",n="";$("#add-item-form #variant-swatch-1 .swatch-element").each(function(a,e){var t=$(this).data("value"),s=0;$("#add-item-form .single-option-selector").eq(1).val(t).change(),$("#add-item-form #variant-swatch-2 .swatch-element label").removeClass("sd"),$("#add-item-form #variant-swatch-2 .swatch-element").removeClass("soldout"),$("#add-item-form #variant-swatch-2 .swatch-element").find("input"),$("#add-item-form #variant-swatch-2 .swatch-element").each(function(a,e){var d=$(this).data("value");$("#add-item-form .single-option-selector").eq(2).val(d).change(),1==check_variant?(""==r&&(r=t),""==n&&(n=d)):s+=1}),s==i&&($('#add-item-form #variant-swatch-1 .swatch-element[data-value = "'+t+'"]').addClass("soldout"),setTimeout(function(){$('#add-item-form #variant-swatch-1 .swatch-element[data-value = "'+t+'"] input')}))}),$('#add-item-form #variant-swatch-1 .swatch-element[data-value="'+r+'"] input').click()}else-1!=s.indexOf("2")&&($("#add-item-form #variant-swatch-2 .swatch-element label").removeClass("sd"),$("#add-item-form #variant-swatch-2 .swatch-element").removeClass("soldout"),$("#add-item-form .selector-wrapper .single-option-selector").eq(2).find("option").each(function(){var a=$(this).val();$(this).parent().val(a).trigger("change"),check_variant?""==t&&(t=a):($('#add-item-form #variant-swatch-2 .swatch-element[data-value="'+a+'"]').addClass("soldout"),$('#add-item-form #variant-swatch-2 .swatch-element[data-value="'+a+'"]').find("input"))}),$("#add-item-form .selector-wrapper .single-option-selector").eq(2).val(t).trigger("change"),$('#add-item-form #variant-swatch-2 .swatch-element[data-value="'+t+'"] label').addClass("sd"))}
			if(window.wd.checklocation == 'true' ){
				setTimeout(() =>{
					window.scofield_product.locationstore($("#product-select").val());
				},300);
			}
		});
		$("body").on("click",'#add-item-form .swatch .swatch-element.color input',function(e){
			var link_image = $(this).parent().find('label').attr('data-image');
		
			var index = $('#slider-thumb .product__thumbnail[data-image="'+link_image+'"]').attr('data-index');
			$('.product-gallery').slick('slickGoTo', index);
		})
	}, 
	callfirst: () =>{
		let available_1 = '',available_2 = '',available_3 = '';
		if(swatch_size == 2){
			for(let i=0;i < pro_op1.length;i++){
				let variant_1 = pro_op1[i],count_op2 = 0;
				for(let j=0;j < pro_op2.length;j++){
					let variant_2 = pro_op2[j],variant_titlecheck = variant_1 + ' ## ' + variant_2;
					$("#product-select option").each(function(){
						let available = $(this).data('available'),variant_title = $(this).data('variant');
						if(available == true && variant_title == variant_titlecheck){
							available_1 == '' ? available_1 = variant_1 : '';
							available_2 == '' ? available_2 = variant_2 : '';
						}
						else if(available == false && variant_title == variant_titlecheck){
							count_op2+=1;
						}
					});
				}
				if(count_op2 == pro_op2.length){
					$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+variant_1+'"]').addClass('soldout');
					$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+variant_1+'"]').find('input');
				}
			}
			$('#add-item-form #variant-swatch-1 .swatch-element[data-value = "'+available_2+'"] input').click();
			$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+available_1+'"] input').click();
		}
		else if(swatch_size == 3){
			for(let i=0;i < pro_op1.length;i++){
				let variant_1 = pro_op1[i],count_op1 = 0;
				for(let j=0;j < pro_op2.length;j++){
					let variant_2 = pro_op2[j],count_op2 = 0;
					for(let k=0;k < pro_op3.length;k++){
						let variant_3 = pro_op3[k],variant_titlecheck = variant_1 + ' ## ' + variant_2 + ' ## ' + variant_3;
						$("#product-select option").each(function(){
							let available = $(this).data('available'),variant_title = $(this).data('variant');
							if(available == true && variant_title == variant_titlecheck){
								available_1 == '' ? available_1 = variant_1 : '';
								available_2 == '' ? available_2 = variant_2 : '';
								available_3 == '' ? available_3 = variant_3 : '';
							}
							else if(available == false && variant_title == variant_titlecheck){
								count_op2+=1;
							}
						});
					}
					if(count_op2 == pro_op3.length){
						count_op1 += 1;
					}
				}
				if(pro_op2.length == count_op1){
					$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+variant_1+'"]').addClass('soldout');
					$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+variant_1+'"]').find('input');
				}
			}
			$('#add-item-form #variant-swatch-0 .swatch-element[data-value = "'+available_1+'"] input').click();
		}
	},
	selectcallback: (variant, selector) =>{
		if(variant) {
			variant.sku != null ? $('.sku-number').html(variant.sku) : $('.sku-number').html('Đang cập nhật');
			$("#pro-price .price-now").html(Haravan.formatMoney(variant.price,window.wd.formatmoney));
			$("#pro-price .price-now-sale").html(Haravan.formatMoney(variant.price,window.wd.formatmoney));
			$(".quanity-inventory .quanity").html(variant.inventory_quantity);
			if(variant.price < variant.compare_at_price){
				var pro_sold = variant.price,pro_comp = variant.compare_at_price / 100,sale = 100 - (pro_sold / pro_comp),kq_sale = Math.round(sale);
				$("#pro-price .price-compare").html(`<del>${Haravan.formatMoney(variant.compare_at_price,window.wd.formatmoney)}</del>`);
			}
			else{
				$(".pro-sale-detail > .sale").addClass('hidden-important');$("#pro-price .price-compare del").html('');
			}
			if(variant.available){
				$(".head-product-title h1").removeClass("soldout-red").addClass('green').attr('data-available','Còn hàng');
				$("#add-to-cart").removeClass('disable').removeAttr('disabled').html('<span>Thêm vào giỏ</span>');
				$("#buy-now").show();
				check_variant = true;
			}
			else{
				$(".head-product-title h1").addClass("soldout-red").removeClass('green').attr('data-available','Hết hàng');
				$("#add-to-cart").addClass('disable').attr('disabled', 'disabled').html('<span>Hết hàng</span>');
				$("#buy-now").hide();
				check_variant = false;
			}
			if(variant.featured_image != null) {
				var imgVariant = Haravan.resizeImage(variant.featured_image.src,'grande').replace('https:',''),indexthumb = $("#sl-product-thumb a[data-image='"+imgVariant+"']").data('pos');
			}
			else{
				setTimeout(() =>{$('#slider-thumb .item:first-child a').click();},100)
			}
			variant.inventory_management == 'haravan' ? inventory_manager = true : inventory_manager = false;
		}
		else{
			var message = variant ? "Hết hàng" : "Không có hàng";
			$(".available-pro .status").addClass('red').html(message);$("#add-to-cart").addClass('disable').attr('disabled', 'disabled').html(`<span>${message}</span>`);$("#buy-now").hide();
			check_variant = false;
		}
		return check_variant;
	},
	locationstore: id =>{
		if(inventory_manager == true){
			$(".location-store").show();
			var list_store = ["575274","608568","421804","906408","575278","421159","421819","421810","421816","651102","674216","1470604","1504012"];
			$.getJSON('/inventory_location.js?variant_id=' + id + "&quantity=1", function (stock, textStatus) {	
				var $address = $('.location-store'),countstore = 0;
				var count = 0;
				if(stock.inventory_locations.length > 0){
					var item_html = '';
					$.each(stock.inventory_locations,function(index,stockItem){
						if(list_store.includes(stockItem.location_id.toString())){
							if(stockItem.location_id == 674216){
								item_html += `<li class="stock ${stockItem.location_id}"><span class="dist"><i class="fa fa-map-marker" aria-hidden="true"></i> ${stockItem.province_name}: </span><span class="street">KHO HÀNG ONLINE</span></li>`;
							}else{
								item_html += `<li class="stock ${stockItem.location_id}"><span class="dist"><i class="fa fa-map-marker" aria-hidden="true"></i> ${stockItem.province_name}: </span><span class="street">${stockItem.location_address}, ${stockItem.ward_name}, ${stockItem.district_name}</span><span class="timeStore">Mở cửa: 9 giờ 00 - 22 giờ (Các ngày trong tuần)</span></li>`;
							}
							count++;
						}
						countstore = index;
					});
					$address.html(`<p class="d-flex d-flex-center"><img src="https://file.hstatic.net/200000525917/file/shop_edb750edb7f147278a6e26dabd22a7ef.png" width="20" height="20" alt="store"><span>Có ${count} cửa hàng còn sản phẩm này</span> <button id="toggle-location" type="button">+</button></p><ul>${item_html}</ul>`);
				}
				else{
					$address.html('');
				}
			});
		}else{
			$(".location-store").hide();
		}
	},
	relatedproduct: () =>{
		let urlsuccess = '',datasuccess = $("#owl-collection-related");
		switch (window.wd.typerelated) {
			case 'type':
				urlsuccess = window.wd.typeurl;
				break;
			case 'vendor':
				urlsuccess = window.wd.vendorurl;
				break;
			case 'collection':
				urlsuccess = window.wd.collectionurl;
				break;
			case 'recommend':
				urlsuccess = window.wd.recommendurl;
				break;
		}
		window.wd.getdatasite(urlsuccess, datasuccess,'true','false');
	},
	seenproduct: () =>{
		let json_seen = JSON.parse(localStorage.getItem('HRVLastViewProducts')),template_viewseen='';
		for(let i=0; i < json_seen.length;i++){
			let handle = '/products/'+json_seen[i]+'?view=viewed';
			$.ajax({
				type: 'GET',
				url: handle,
				async: false,
				success: function (product){
					template_viewseen+= product;
				},
				error: (XMLHttpRequest, textStatus) => {
					json_seen.splice(i,1);
					localStorage.setItem('HRVLastViewProducts',JSON.stringify(json_seen))
				}
			});
		};
		$("#result-pd-seen").html(template_viewseen);
		$("#result-pd-seen").addClass('slick-callback');
		window.wd.scofield.slidercallback();
	}
}
$(window).load(() =>{
	window.scofield_product.init();
})