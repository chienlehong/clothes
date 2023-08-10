const Wandacart = {
	init: function(){
		const that = this;
		that.checkout();
	},
	plusqt_cart: $this => {
		if ( $this.siblings('.quantity-selector').val() != undefined ) {
			var currentVal = parseInt($this.siblings('.quantity-selector').val());
			if (!isNaN(currentVal)) {$this.siblings('.quantity-selector').val(currentVal + 1);} else {$this.siblings('.quantity-selector').val(1);}}
		let line_plus = $this.parents('.cart-wrap').attr('data-line'),
				qty_plus = parseInt($this.siblings('.quantity-selector').val()),
				sesstion = sessionStorage.getItem('variantid'),
				selectorqtt = $this.siblings('.quantity-selector');
		var variantId = $this.siblings('.quantity-selector').attr('data-vid');
		console.log(line_plus)
		if(window.wd.appdefault == 'appcombo'){
			let datacombo = selectorqtt.data('combo');
			if(datacombo !== "" && datacombo !== undefined && datacombo !== null){
				$("#cart-page-result .quantity-selector").each(function(){
					let this_ = $(this),itemcombo = this_.data('combo');
					if(datacombo == itemcombo){
						this_.val(qty_plus);
					}
				})
			};
			comboApp.comboUpdateCart();
		}
		else{
			Wandacart.update_cart(line_plus,qty_plus,variantId,'plus');
		}
	},
	minusqt_cart: $this => {
		if ($this.siblings('.quantity-selector').val() != undefined ) {
			var currentVal = parseInt($this.siblings('.quantity-selector').val());if (!isNaN(currentVal) && currentVal > 1) {	$this.siblings('.quantity-selector').val(currentVal - 1);}
			let line_mn = $this.parents('.cart-wrap').attr('data-line'),qty_mn = parseInt($this.siblings('.quantity-selector').val()), selectorqtt = $this.siblings('.quantity-selector');
			var variantId = $this.siblings('.quantity-selector').attr('data-vid');
			if(window.wd.appdefault == 'appcombo'){
				let datacombo = selectorqtt.data('combo');
				if(datacombo != "" && datacombo != undefined && datacombo != null){
					$("#cart-page-result .quantity-selector").each(function(){
						let this_ = $(this),itemcombo = this_.data('combo');
						if(datacombo == itemcombo){
							this_.val(qty_mn);
						}
					})
				};
				comboApp.comboUpdateCart();
			}
			else{
				console.log(window.CustomerShop.customerId)
				Wandacart.update_cart(line_mn,qty_mn,variantId,'minus');
			}
		}
	},
	update_cart: (line,qty,variantId,type) =>{
		var q_order = BCApp.Config.listCart.find(item => item.variant_id == variantId);
		var params = {
			type: 'POST',
			url: '/cart/change.js',
			data: 'quantity='+qty+'&line=' + line,
			dataType: 'json',
			success: cart => {
				if(q_order.quantity != qty){
					var line_item = cart.items.find(item => item.variant_id == variantId );
					if(type == 'plus'){
						BCApp.Tracking.trackingAddItem(1,line_item);
					}else{
						if(qty == 0){
							BCApp.Tracking.trackingRemoveItem(q_order.quantity,q_order);
						}else{
							BCApp.Tracking.trackingRemoveItem(1,line_item);
						}
					}

				}

				if(window.wd.appdefault == 'appbuyxgety'){
					buyXgetY.UpdateCartFromCart();
				}
				else if(window.wd.appdefault == 'appcombo'){
					comboApp.comboUpdateCart();
				}
				else{
					Wandacart.cartsuccess();
					location.reload(true);
				}
			},
			error: (XMLHttpRequest, textStatus) =>{
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	},
	update_sale: (line,qty,variantId,type) =>{
		var q_order = BCApp.Config.listCart.find(item => item.variant_id == variantId);
		var params = {
			type: 'POST',
			url: '/cart/change.js',
			data: 'quantity='+qty+'&line=' + line,
			dataType: 'json',
			success: cart => {
				if(q_order.quantity != qty){
					var line_item = cart.items.find(item => item.variant_id == variantId );
					if(type == 'plus'){
						BCApp.Tracking.trackingAddItem(1,line_item);
					}else{
						if(qty == 0){
							BCApp.Tracking.trackingRemoveItem(q_order.quantity,q_order);
						}else{
							BCApp.Tracking.trackingRemoveItem(1,line_item);
						}
					}

				}

				if(window.wd.appdefault == 'appbuyxgety'){
					buyXgetY.UpdateCartFromCart();
				}
				else if(window.wd.appdefault == 'appcombo'){
					comboApp.comboUpdateCart();
				}
				else{
					Wandacart.cartsuccess();
					location.reload(true);
					sessionStorage.removeItem("variantid");
				}
			},
			error: (XMLHttpRequest, textStatus) =>{
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	},
	cartsuccess: ()=> {
		$.ajax({
			url: '/cart?view=update',
			type: 'GET',
			dataType: 'json',
			async: true,
			success: data =>{
				var item = '',index = 0;
				if(data.length > 2){
					$.each(data, function(i, v){
						if(i < data.length - 2){
							item += `
<ul class="cart-wrap" data-line="${v.line}">
<li class="item-info">
<div class="item-img">
<a href="${v.url}" title="${v.title}"><img src="${v.image}" alt="${v.title}"></a>
</div>
<div class="item-title">
<a href="${v.url}" title="${v.title}">${v.title}</a>
<div class="d-flex group-item-option">  
<span class="item-option">
<span>${v.variant_title}</span>
</span>
<span class="item-option">
<span class="item-price">
<span class="money">${v.price}</span>
<del data-compare="${v.compare_at_price}">${v.compare_at_price}</del>
</span>
</span>
</div>
</div>
</li>

<li class="item-qty">
<div class="quantity-area"> <input type="button" value="–" onclick="Wandacart.minusqt_cart($(this))" class="qty-btn btn-left-quantity"><input type="text" id="updates_${v.id }" data-combo="${v.properties}" name="updates[]" value="${v.quantity}" min="1" data-price="${v.price_default}" data-vid="${v.id}" class="quantity-selector quantity-mini"><input type="button" value="+" onclick="Wandacart.plusqt_cart($(this))" class="qty-btn btn-right-quantity"></div>
<div class="item-remove">
<span class="remove-wrap">
<a onclick="Wandacart.update_cart('${v.line}','0',${v.id},'minus');" href="javascript:void(0)">Xóa</a>
</span>
</div>
</li>
<li class="item-price">
<span class="amount full-price">
<span class="money">${v.line_price}</span>
</span>
</li>
</ul>
`;
						}
						index = i;
					});
					$("#cart-template #cart-page-result").html(item);
					$(".sidebar-checkout .total-price").html(data[index -1].total_price);
					$(".js-number-cart,.cart-counter").html(data[index].total_size); 
				}
				else{
					$("#cart-template #cart-page-result").html(``);
					$(".sidebar-checkout .total-price").html('0₫');
					$(".js-number-cart,.cart-counter").html('0'); 
					$("#cart-page-result").html(`<p class="no-item-cart">Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm <a href="/collections/all">tại đây.</a></p>`);
				}
			}
		})
	},
	checkout: () =>{
		$('body').on('click','#checkbox-bill',function(){
			$('.bill-field').stop(true, true).slideToggle(400);
		});
		$("body").on("click",".btncart-checkout",function(e){debugger
																												 e.preventDefault();
																												 let discount = $('#code-discont').val();
																												 let object_cart = {};
																												 if($('#checkbox-bill').is(':checked')){
																													 object_cart = {
																														 note: $("#note").val(),
																														 attributes: {
																															 "Công ty": $("#company_attr").val(),
																															 "Mã số thuế": $("#tax_attr").val(),
																															 "Địa chỉ": $("#address_attr").val(),
																															 "Người đại diện": $("#name_attr").val()
																														 }
																													 }
																												 }
																												 else{
																													 object_cart = {note: $("#note").val()}
																												 }
																												 const params = {
																													 type: 'POST',
																													 url: '/cart/update.js',
																													 data: object_cart,
																													 dataType: 'json',
																													 success: function(cart) {
																														 window.location = "/checkout" + '?discount='+discount;
																													 },
																													 error: function(XMLHttpRequest, textStatus) {
																														 Haravan.onError(XMLHttpRequest, textStatus);
																													 }
																												 };
																												 jQuery.ajax(params);
																												})
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
$(function(){
	Wandacart.init();
});
$(window).load(() =>{
	Wandacart.seenproduct();
})