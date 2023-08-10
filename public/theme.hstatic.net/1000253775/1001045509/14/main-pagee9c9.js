const Wandabpage = {
	init: function() {
		this.menusidebar();
		if(window.wd.template == 'page.mystore'){
			this.mystore(); 
		}
		this.subscribeform();
	},
	menusidebar: () =>{
		$("body").on('click','.cl-open-sb',function(e){
			e.preventDefault();
			let $menu = $(this);
			$menu.next().slideToggle('fast');$menu.toggleClass('minus-menu');
		});
		$(".content-entry img").addClass('dt-width-auto').attr('height','600').attr('width','600');
	},
	mystore: ()=>{
		$.getJSON(window.wd.jsonmap,function(data){ 
			let datamap = '',datatinh = '<option value="all" selected="">Chọn tỉnh/thành phố</option>',checkdup = '';
			$.each(data.hethongcuahang,function(i,v) {
				datamap += `
<li class="" data-tinh="${urlfriendly(v.tinhthanh)}" data-quan="${urlfriendly(v.quanhuyen)}">
<a href="${v.urlmap}" class="iframe-map" data-iframe='${v.iframemap}' rel="nofollow">
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
			$("#mystore-template #address-link").html(datamap);
			$("#mystore-template .change-tinh").html(datatinh);
			mystorearr.push(data.hethongcuahang);
		});
		$("body").on('click','#mystore-template #address-link .iframe-map',function(e){
			e.preventDefault(); 
			$('#mystore-template #address-link li').removeClass('active');
			$(this).parent().addClass('active')
			let iframe_map = $(this).attr('data-iframe');
			$("#map").html(iframe_map)
		});
		$('body').on('change','#mystore-template .change-tinh',function(){
			const valhandle = $(this).val();
			Wandabpage.changetinh(valhandle);
			Wandabpage.checkshowhide();
		})
		$('body').on('change','#mystore-template .select-quan',function(){
			const valdistrict = $(this).val(),valprovice = $("#mystore-template .change-tinh").val();
			Wandabpage.changequan(valdistrict,valprovice);
			Wandabpage.checkshowhide();
		});
	},
	changetinh: (provice) =>{
		var datamap = '<option value="all">Chọn Quận/huyện</option>',checkduplicate = '' ;
		$.each(mystorearr[0],function(i,v){
			if(urlfriendly(v.tinhthanh) == provice){
				if(checkduplicate != v.quanhuyen){
					checkduplicate = v.quanhuyen;
					datamap += `<option value="${urlfriendly(v.quanhuyen)}">${v.quanhuyen}</option>`;
				}
			}
		});
		$('#mystore-template .select-quan').html(datamap)
		$("#mystore-template #address-link li").hide();
		provice == 'all' ? $("#address-link li").show() : $("#mystore-template #address-link li[data-tinh='"+provice+"']").show();
		Wandabpage.checkshowhide();
	},
	changequan: (district,provice) =>{
		$("#mystore-template #address-link li").hide();
		district == 'all' ? $("#mystore-template #address-link li[data-tinh='"+provice+"']").show() : $("#mystore-template #address-link li[data-quan='"+district+"']").show();
		Wandabpage.checkshowhide();
	},
	checkshowhide: () =>{
		var counter_item = 0;
		$("#mystore-template #address-link li").each(function(){
			var thisstyle = $(this).attr('style');
			if(thisstyle != 'display: none;'){counter_item += 1;}
		})
		if(counter_item == 0){
			$("#mystore-template .address-detail .no-store").addClass('hidden');
			$("#mystore-template .address-detail .no-store").removeClass('hidden');
		}else{
			$("#mystore-template .address-detail .no-store").addClass('hidden');
		}
	},
	subscribeform: () =>{
		$('.contact-form-warp form button').click(function(e){
			e.preventDefault();
			Wandabpage.validateform();
		});
		$(".contact-form-warp form").submit(function(e){
			e.preventDefault();
			var self = $(this);
			let name_ct = $('#contactFormName').val(),email_ct = $('#contactFormEmail').val(),phone_ct = $('#contactFormPhone').val(),mess_ct = $("#contactFormMessage").val(),recapcha_ct = self.find("input[name='g-recaptcha-response']").val();
			$.ajax({
				type: 'POST',
				url:'/contact',
				dataType:'json',
				data: "form_type=contact&utf8=✓&contact[name]="+name_ct+"&contact[phone]="+phone_ct+"&contact[email]="+email_ct+"&contact[body]="+mess_ct+"&g-recaptcha-response="+recapcha_ct,
				complete: function(responseText){
					window.wd.scofield.modalsubsucess();self.trigger('reset');
				}
			})
		})
	},
	validateform: () =>{
		var checkname = false,checkemail = false,checktelephone = false,checkmess = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, numberReg =  /^[0-9]+$/;
		var names = $('#contactFormName').val(),phone = $('#contactFormPhone').val(),email = $('#contactFormEmail').val(),mess = $('#contactFormMessage').val();
		if(names == ""){
			$('.contact-form-warp li #contactFormName').siblings('.errors').remove();
			$('.contact-form-warp li #contactFormName').after(`<div class="errors"><ul><li>Vui lòng nhập tên của bạn</li></ul></div>`);
		}
		else{
			$('.contact-form-warp li #contactFormName').siblings('.errors').remove();
			checkname = true;
		}
		if(email == ""){
			$('.contact-form-warp li #contactFormEmail').siblings('.errors').remove();
			$('.contact-form-warp li #contactFormEmail').after(`<div class="errors"><ul><li>Vui lòng nhập email của bạn</li></ul></div>`);
		} 
		else if(!emailReg.test(email)){
			$('.contact-form-warp li #contactFormEmail').siblings('.errors').remove();
			$('.contact-form-warp li #contactFormEmail').after(`<div class="errors"><ul><li>Email không đúng định dạng</li></ul></div>`);
		}
		else{
			$('.contact-form-warp li #contactFormEmail').siblings('.errors').remove();
			checkemail = true;
		}
		if(phone == ""){
			$('.contact-form-warp li #contactFormPhone').siblings('.errors').remove();
			$('.contact-form-warp #contactFormPhone').after(`<div class="errors"><ul><li>Vui lòng nhập số điện thoại của bạn</li></ul></div>`);
		}
		else if(!numberReg.test(phone)){
			$('.contact-form-warp li #contactFormPhone').siblings('.errors').remove();
			$('.contact-form-warp li #contactFormPhone').after(`<div class="errors"><ul><li>Số điện thoại không đúng định dạng</li></ul></div>`);
		}
		else{
			$('.contact-form-warp li #contactFormPhone').siblings('.errors').remove();
			checktelephone = true;
		}
		if(mess == ""){
			$('.contact-form-warp li #contactFormMessage').siblings('.errors').remove();
			$('.contact-form-warp li #contactFormMessage').after(`<div class="errors"><ul><li>Vui lòng nhập nội dung</li></ul></div>`);
		}
		else{
			$('.contact-form-warp li #contactFormMessage').siblings('.errors').remove();
			checkmess = true;
		}
		if(checkname == true && checkemail == true && checktelephone == true && checkmess == true){$(".contact-form-warp form").trigger('submit')}
	}
}
$(function(){
	Wandabpage.init();
})
window.addEventListener('load', (event) => {
	if(window.wd.template == 'page.mystore'){
	const height_map = $(".address-map").innerHeight();
	$("body").attr('style','--height-map:'+height_map+'px');
	}
})
$(document).ready(() =>{
	$("#map").html($('#map').attr('data-iframe'))
})