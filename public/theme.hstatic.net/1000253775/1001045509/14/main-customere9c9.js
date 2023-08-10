const Wandabcustomer = {
	init: function() {
		//this.wishlistresult();
		this.contactupdate();
	},
	validateForm: () => {
		let checkfirstname = false,checklastnames = false,checkemail = false,checktelephone = false,checkpassword = false;
		let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
				numberReg =  /^[0-9]+$/,
				firstnames = $('#create_customer #last_name').val(),
				lastnames = $('#create_customer #first_name').val(),
				email = $('#create_customer #email').val(),
				phone = $('#create_customer #phone').val(),
				password = $('#create_customer #password').val(),
				inputVal = new Array(firstnames,lastnames, email,phone, password),
				inputMessage = new Array("họ","tên","email",'số điện thoại',"mật khẩu");
		if(inputVal[0] == ""){
			$('#create_customer #last_name').siblings('.errors').remove();
			$('#create_customer #last_name').after(`<div class="errors"><ul><li>Vui lòng nhập ${inputMessage[0]} của bạn</li></ul></div>`);
		}else{
			$('#create_customer #last_name').siblings('.errors').remove();
			checkfirstname = true;
		}
		if(inputVal[1] == ""){
			$('#create_customer #first_name').siblings('.errors').remove();
			$('#create_customer #first_name').after(`<div class="errors"><ul><li>Vui lòng nhập ${inputMessage[1]} của bạn</li></ul></div>`);
		}else{
			$('#create_customer #first_name').siblings('.errors').remove();
			checklastnames = true;
		}
		if(inputVal[2] == ""){
			$('#create_customer #email').siblings('.errors').remove();
			$('#create_customer #email').after(`<div class="errors"><ul><li>Vui lòng nhập ${inputMessage[2]} của bạn</li></ul></div>`);
		} 
		else if(!emailReg.test(email)){
			$('#create_customer #email').siblings('.errors').remove();
			$('#create_customer #email').after(`<div class="errors"><ul><li>Email không đúng định dạng</li></ul></div>`);
		}else{
			$('#create_customer #email').siblings('.errors').remove();
			checkemail = true;
		}
		if(inputVal[3] == ""){
			$('#create_customer #phone').siblings('.errors').remove();
			$('#create_customer #phone').after(`<div class="errors"><ul><li>Vui lòng nhập ${inputMessage[3]} của bạn</li></ul></div>`);
		} 
		else if(!numberReg.test(phone)){
			$('#create_customer #phone').siblings('.errors').remove();
			$('#create_customer #phone').after(`<div class="errors"><ul><li>Số điện thoại không đúng định dạng</li></ul></div>`);
		}else{
			$('#create_customer #phone').siblings('.errors').remove();
			checktelephone = true;
		}
		if(inputVal[4] == ""){
			$('#create_customer #password').siblings('.errors').remove();
			$('#create_customer #password').after(`<div class="errors"><ul><li>Vui lòng nhập ${inputMessage[4]} của bạn</li></ul></div>`);
		}else if(inputVal[3].length < 5){
			$('#create_customer #password').siblings('.errors').remove();
			$('#create_customer #password').after(`<div class="errors"><ul><li>Vui lòng nhập trên 5 ký tự</li></ul></div>`);
		}else{
			$('#create_customer #password').siblings('.errors').remove();
			checkpassword = true;
		}
		if(checkfirstname == true && checklastnames == true && checkemail == true && checktelephone == true && checkpassword == true){$("#create_customer").trigger('submit')}
	},
	contactupdate: () =>{
		$("form[action='/account/recover']").submit(function(e){
			let $this = $(this), emailvl = $this.find('#recover-email').val();
			e.preventDefault();
			$.ajax({
				type: 'POST',
				async: false,
				url:'/account/recover',
				async:false,
				data: $(this).serialize(),
				success:function(line){
					$this.trigger('reset');
					$(".success-recover").removeClass('hidden').html(`Chúng tôi đã gửi email khôi phục về ${emailvl}`)
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		})
		$(".form-update-content form").submit(function(e){
			e.preventDefault();
			let fullname = $("#last_name").val(),self = $(this), birthday_sort = self.find('input[name="customer[birthday]"]').val().split('-');
			let datass = {
				lastname: fullname.substr(0,fullname.indexOf(' ')),
				firstname: fullname.substr(fullname.indexOf(' ')+1),
				gender: $('.item-gender input[type="radio"]:checked').val(),
				phone: self.find('input[name="customer[phone]"]').val(),
				birthday: birthday_sort[1] + '/' + birthday_sort[2] + '/' + birthday_sort[0],
				address: self.find('input[name="customer[address1]"]').val(),
				country: self.find('#address_country_customer_wd').val(),
				province: self.find('#address_province_customer_wd').val()
			};
			$.ajax({
				type: 'POST',
				url:'/account',
				dataType:'json',
				data: `form_type=update_customer&utf8=✓&customer[last_name]=${datass.lastname}&customer[first_name]=${datass.firstname}&customer[gender]=${datass.gender}&customer[phone]=${datass.phone}&customer[birthday]=${datass.birthday}`,
				complete: function(responseText){
					$('.success-update-info').removeClass('hidden');
				}
			})
			var urlAddressUpdate = '/account/addresses/'+ $('#customer-phone').data('addressid');
			$.post(urlAddressUpdate, { 
				form_type:"customer_address", 
				utf8: "✓", 
				"address": { 
					"last_name":  datass.lastname, 
					"first_name": datass.firstname,
					"phone": datass.phone,
					"address1": datass.address,
					"country": datass.country,
					"province": datass.province
				}
			})
		});
		$("body").on("click",".success-update-info .btn-close",function(){
			$('.success-update-info').addClass('hidden');
		});
	}
}
$(window).load(() =>{
	Wandabcustomer.init();
	$('#register-now').click(function(e){
		e.preventDefault();
		Wandabcustomer.validateForm();
	});
})
