var countpage = 2,sort_by = '',countft = 0, total_page = window.wd.collection.totalpage,cur_page = '', collectionid =  window.wd.collection.id, collectionSize = window.wd.collection.collectioncount,pageLimit = window.wd.collection.limit,timeOutFilter, check_url_param = false,query = '',productsContainer = $('.product-list'),hideFilter = $('.not-filter'),quantityProductLeft = collectionSize - (cur_page*pageLimit);
collectionid == 0 ? query = "/search?q=filter=((collectionid:product>" + collectionid + ')' : query = "/search?q=filter=((collectionid:product=" + collectionid + ')';
if(window.location.search.indexOf('&sortby=') > -1){
	sort_by = '&sortby=' + window.location.search.split('&sortby=')[1].split('&')[0];
}else{
	sort_by = $(".sort-by option:selected").attr('data-filter');
}
if(window.location.search.indexOf('&page=') > -1){
	cur_page = parseInt(window.location.search.split('&page=')[1].split('&')[0]);
}else{
	cur_page = $(".collection-body").attr('data-currentpage')
}
function convertToSlug(str) {
	str= str.toLowerCase();  
	str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");  
	str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");  
	str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");  
	str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");  
	str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");  
	str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");  
	str= str.replace(/đ/g,"d");  
	str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-"); 
	str= str.replace(/-+-/g,"-");
	str= str.replace(/^\-+|\-+$/g,"");  
	return str;  
}
/* Thêm filter thì viết trong genQuery */
const Wandacollection = {
	init: function() {
		this.filltermob();
		this.filltercol();
		this.descriptioncol();
		this.paginate_after();
		this.toggle_filter();
		if(window.wd.collection.typepaginate == 'loadmore'){this.paginateloadmore();}
	},
	filltermob: () =>{
		$(document).on('click','.filter-active .modal-backdrop,.close-filter',function(event){
			$("#wd-shoes-scofiled").removeClass('filter-active');
		});
		$("body").on("click",".btn-filter-mob",function(e){e.preventDefault();
			$("#wd-shoes-scofiled").toggleClass('filter-active');
		})
	},
	filltercol: () =>{
		jQuery('.bl-filter li input').change(function(){
			var $this = $(this),textfilter = $this.parent().text(), datafilter = $this.parent().attr('data-filter');
			$this.parents('.bl-filter').hasClass('filter-price') ? $('.filter-price input').not($this).prop('checked', false) : $this.parents('li').toggleClass('active');
			if($(window).width() < 992){
				if($this.is(':checked')){
					if($this.parents('.bl-filter').hasClass('filter-price')){
						$('.result-filter-mb .price-remove').remove();
						$this.parents('.bl-filter').find('.result-filter-mb').append(`<li class="price-remove" data-remove="${datafilter}">${textfilter} <i class="fa fa-times" aria-hidden="true"></i></li>`);
					}else{
						$this.parents('.bl-filter').find('.result-filter-mb').append(`<li data-remove="${datafilter}">${textfilter} <i class="fa fa-times" aria-hidden="true"></i></li>`);
					}
				}
				else{
					$('.result-filter-mb li[data-remove="'+datafilter+'"]').remove();
				} 
			}
			if($this.is(':checked')){
				if($this.parents('.bl-filter').hasClass('filter-price')){
					$('.result-filter-full .price-remove').remove();
					$('.result-filter-full').prepend(`<li class="price-remove" data-remove="${datafilter}">${textfilter} <i class="fa fa-times" aria-hidden="true"></i></li>`);
				}else{
					$('.result-filter-full').prepend(`<li data-remove="${datafilter}">${textfilter} <i class="fa fa-times" aria-hidden="true"></i></li>`);
				}
			}
			else{
				$('.result-filter-full li[data-remove="'+datafilter+'"]').remove();
			} 
			Wandacollection.filter_append_product();
		});
		$('body').on('click','.result-filter-mb li',function(){
			var $thisvl = $(this).attr('data-remove');
			$(".bl-filter .check-box-list li label[data-filter='"+$thisvl+"'] input").click();
		})
		$('body').on('click','.result-filter-full li',function(){
			var $tvl = $(this).attr('data-remove');
			$(this).hasClass('clear-all') ? $(".bl-filter .check-box-list li input:checked").click() : $(".bl-filter .check-box-list li label[data-filter='"+$tvl+"'] input").click();
		})
		if ( window.location.search != '' && window.location.search.indexOf('?page=') != 0 ) {
			$('.filter-vendor input:checkbox,.filter-type input:checkbox,.filter-size input:checkbox,.filter-price input:checkbox,.filter-tag input:checkbox,.filter-color input:checkbox').prop('checked', false);// Unclock checked input filter
			filter_value = [];
			link_url = window.location.search.replace('?', '').replace('%2C',',').split('&');
			if ( link_url.length > 0 ) {
				$.each(link_url,function(i,v){
					filter_value[v.split('=')[0]] = v.split('=')[1];
				});	
			}
			if ( filter_value["price"] != undefined ) {		
				if ( jQuery(".bl-filter li input[data-price='" + filter_value["price"] + "']").length > 0 ) {
					jQuery(".bl-filter li input[data-price='" + filter_value["price"] + "']").click();
				}
			}
			if ( filter_value["vendor"] != undefined ) {
				$.each(filter_value["vendor"].split(','),function(i,v) {
					$('.bl-filter li .' + convertToSlug(decodeURIComponent(v)) + ' input').click();
				});
			}		
			if ( filter_value["type"] != undefined ) {
				$.each(filter_value["type"].split(','),function(i,v) {
					$('.bl-filter li .' + convertToSlug(decodeURIComponent(v)) + ' input').click();
				});
			}		
			if ( filter_value["color"] != undefined ) {
				$.each(filter_value["color"].split(','),function(i,v) {
					$('.bl-filter li .' + convertToSlug(decodeURIComponent(v)) + ' input').click();
				});
			}	
			if ( filter_value["size"] != undefined ) {
				$.each(filter_value["size"].split(','),function(i,v) {
					$('.bl-filter li .' + convertToSlug(decodeURIComponent(v)) + ' input').click();
				});
			}
			if ( filter_value["tag"] != undefined ) {
				$.each(filter_value["tag"].split(','),function(i,v) {
					$('.bl-filter li .' + convertToSlug(decodeURIComponent(v)) + ' input').click();
				});
			}			
			check_url_param = true;
		}
		else {
			check_url_param = true;
		}
	},
	genQuery: () =>{
		if(window.location.search.indexOf('&sortby=') > -1){
			sort_by = decodeURIComponent('&sortby=' + window.location.search.split('&sortby=')[1].split('&')[0]);
		}else{
			sort_by = $(".sort-by option:selected").attr('data-filter');
		}
		if(window.location.search.indexOf('&page=') > -1){
			cur_page = parseInt(window.location.search.split('&page=')[1].split('&')[0]);
		}else{
			cur_page = $(".collection-body").attr('data-currentpage')
		}
		url_param = '';
		_query = query ;
		price = '',vendor = '', size = '', type = '', tag = '', color = '';
		url_price = 'price=',url_vendor = 'vendor=',url_color = 'color=',url_size = 'size=',url_tag = 'tag=',url_type= 'type=';
		countft = 0;
		if ($('.filter-price input:checked').length > 0 ) {
			price = jQuery('.filter-price input:checked').val();
			url_price = url_price + jQuery('.filter-price input[type=checkbox]:checked').attr('data-price');
			url_param = url_param + url_price + '&';
			_query = _query + '&&' + price;
			countft += 1;
		} else {
			url_price = '';
		}
		if (jQuery('.filter-vendor input:checked').length > 0 ) {
			jQuery('.filter-vendor li').each(function(){
				if ( jQuery(this).find('input').is(':checked') ) {				
					vendor = vendor + jQuery(this).find('input').val() + '||';
					url_vendor = url_vendor + $(this).find('label').attr('data-vendor') + ',';countft += 1;	
				}
			});
			vendor = vendor + '####';
			vendor = '(' + vendor.split('||####')[0] + ')';
			url_vendor = url_vendor + '####';
			url_vendor = url_vendor.split(',####')[0];
			url_param = url_param + url_vendor + '&';
			_query = _query + '&&' + vendor;
		} else {
			url_vendor = '';
		}
		if ($('.filter-type input:checked').length > 0 ) {
			jQuery('.filter-type li').each(function(){
				if ( jQuery(this).find('input').is(':checked') ) {				
					type = type + jQuery(this).find('input').val() + '||';
					url_type = url_type + $(this).find('label').attr('data-type') + ',';		countft += 1;	
				}
			});
			type = type + '####';
			type = '(' + type.split('||####')[0] + ')';
			url_type = url_type + '####';
			url_type = url_type.split(',####')[0];
			url_param = url_param + url_type + '&';
			_query = _query + '&&' + type;
		} else {
			url_type = '';
		}
		if ($('.filter-size input:checked').length > 0 ) {
			jQuery('.filter-size li').each(function(){
				if ( jQuery(this).find('input').is(':checked') ) {				
					size = size + jQuery(this).find('input').val() + '||';
					url_size = url_size + $(this).find('label').attr('data-size') + ',';		countft += 1;	
				}
			});
			size = size + '####';
			size = '(' + size.split('||####')[0] + ')';
			url_size = url_size + '####';
			url_size = url_size.split(',####')[0];
			url_param = url_param + url_size + '&';
			_query = _query + '&&' + size;
			console.log('a');
		} else {
			url_size = '';
		}
		if ( $('.filter-tag input:checked').length > 0 ) {
			jQuery('.filter-tag li').each(function(){
				if ( jQuery(this).find('input').is(':checked') ) {				
					tag = tag + jQuery(this).find('input').val() + '||';
					url_tag = url_tag + $(this).find('label').attr('data-tag') + ',';		countft += 1;	
				}
			});
			tag = tag + '####';
			tag = '(' + tag.split('||####')[0] + ')';
			url_tag = url_tag + '####';
			url_tag = url_tag.split(',####')[0];
			url_param = url_param + url_tag + '&';
			_query = _query + '&&' + tag;
		} else {
			url_tag = '';
		}
		if ( $('.filter-color input:checked').length > 0 ) {
			jQuery('.filter-color li').each(function(){
				if ( jQuery(this).find('input').is(':checked') ) {				
					color = color + jQuery(this).find('input').val() + '||';
					url_color = url_color + $(this).find('label').attr('data-color') + ',';		countft += 1;	
				}
			});
			color = color + '####';
			color = '(' + color.split('||####')[0] + ')';
			url_color = url_color + '####';
			url_color = url_color.split(',####')[0];
			url_param = url_param + url_color + '&';
			_query = _query + '&&' + color;
		} else {
			url_color = '';
		}
		var query_final = _query + ')';
		if ($('.filter-type input:checked').length == 0 && $('.filter-vendor input:checked').length == 0 && $('.filter-size input:checked').length == 0 && $('.filter-price input:checked').length == 0 && $('.filter-tag input:checked').length == 0 && $('.filter-color input:checked').length == 0) {
			if ( collectionid == 0 ) {
				query_final = "/search?q=filter=(collectionid:product>" + collectionid + ")";
			} else {
				query_final = "/search?q=filter=(collectionid:product=" + collectionid + ")";
			} 
			if (check_url_param){
				history.pushState(null, null, window.location.pathname);
			}
		}
		else{
			url_param = url_param + '####';
			url_param = url_param.split('&####')[0];		
			if ( check_url_param ){
				history.pushState(null, null, '?' + url_param + '&page=1' + sort_by);
			}
			if ( cur_page >= 1 && check_url_param ) {
				history.pushState(null, null, '?' + url_param + '&page=1' + sort_by);
			}
		}
		query_final = query_final.replace('/search?q=filter=', '');
		query_final = encodeURIComponent(query_final);
		query_final = '/search?q=filter=' + query_final;
		return query_final;
	},
	filter_append_product: () =>{
		clearTimeout(timeOutFilter);
		timeOutFilter = setTimeout(function(){
			total_page = 0;
			var urlfilterlast = '';
			url = Wandacollection.genQuery();
			jQuery.ajax({
				url: url + '&view=pagesize',
				success:function(data){
					total_page = parseInt(data.split('####')[0]);
					collectionSize = parseInt(data.split('####')[1]); 
				}
			});
			console.log(countft)
			urlfilterlast = url + '&view=filter&page='+ cur_page + sort_by;
			jQuery.ajax({
				url: urlfilterlast,
				success:function(data){
					let datasort = $(".sort-by option[data-filter='"+sort_by+"']").attr('value');
					$(".sort-by").val(datasort)
					productsContainer.html('');
					hideFilter.remove();
					setTimeout(() =>{$('body').removeClass('loading-filter')},300);
					productsContainer.html(data);
					countpage = 2;
					$(".collection-body").addClass('success-filter');
					window.location.search.indexOf('&sortby=') > -1 ? $(".result-filter-tag").removeClass('hidden') : $(".result-filter-tag").addClass('hidden');
					setTimeout(() =>{$('html,body').animate({scrollTop: $('.product-list').offset().top - 200}, 500)},50);
				}
			});
		},300);
	},
	paginate_after: () =>{
		$('body').on('click','.success-filter #pagination a',function(e){
			e.preventDefault();
			cur_page = parseInt($(this).attr('data-page'));
			Wandacollection.filter_append_product_by_page($(this).attr('href'));
			let sortby_paginate;
			window.location.search.indexOf('&sortby=') > -1 ? sortby_paginate = '&sortby=' + window.location.search.split('&sortby=')[1].split('&')[0] : sortby_paginate = '';
			history.pushState(null, null, '?' + url_param + '&page='+ cur_page + sortby_paginate);
			setTimeout(() =>{$('html,body').animate({scrollTop: $('.product-list').offset().top - 200}, 500)},50);
		});
	},
	changesort_by: () =>{
		let vlact = $(".sort-by option:selected").attr('data-filter');
		Wandacollection.filter_append_product_by_page(url + '&view=filter&page='+ cur_page + vlact);
		let locationpush = window.location.search.split('&sortby=')[0];
		history.pushState(null, null, locationpush + vlact);
	},
	filter_append_product_by_page: queryByPage =>{
		jQuery.ajax({
			url: queryByPage,
			success:function(data){				
				loadingcomplete = true;	
				productsContainer.html(data);
				hideFilter.remove();
			}
		});
	},
	descriptioncol: () =>{
		if($('.collection-description').innerHeight() < 279 ) {
			$(".see-more").remove();
			$(".collection-description").attr('style','height:auto');
		}
		let flag=true;
		$(".see-more a").click(function (e) { 
			e.preventDefault();
			if(flag){
				flag=false;
				$(".collection-description").attr('style','height:auto');
				$(this).parent().addClass('show no-before');
				$(this).text('Thu gọn');
			}else{
				flag=true;
				$(window).width() > 767 ? $(".collection-description").attr('style','height:350px') : $(".collection-description").attr('style','height:280px');
				$(this).parent().removeClass('show no-before');
				$(this).text('Xem thêm');
			}
		});
	},
	toggle_filter: () =>{
		$("body").on('click','.shop-sidebar .title',function(){
			$(this).toggleClass('minus').next().slideToggle('fast');
		})
	},
	paginateloadmore: () =>{
		$(window).scroll(function(){
			let scrolltop = $("#collection-template .content-product-list > div.d-flex-column:last").offset().top - 600,
					totalpaginate = $('#pagination').data('paginate'),url = $("#pagination .page-view").eq(0).attr('href');
			if($("#pagination").length > 0){
				if(url.indexOf('?page=') > -1){
					url = url.split('?page=')[0] + '?page=' + countpage + '&view=load-more';
				}
				else if(url.indexOf('&view=filter&page') > -1){
					let urlsort = url.split('&sortby=')[1];
					url = url.split('&view=filter&page')[0] + '&page=' + countpage + '&view=data-filter' +'&sortby=' + urlsort;
				}else{ 
					url = url.split('&page')[0] + '&page=' + countpage + '&view=load-more';
				}
				if($(this).scrollTop() > scrolltop && countpage <= totalpaginate){
					$.ajax({ 
						type: "GET",
						url: url,
						async: false,
						success: function(data){
							$(".content-product-list").append(data);
							countpage += 1;
						}
					})
				}
			}
		})
	}
}
$(function(){
	Haravan.queryParams = {};
	if (location.search.length) {
		for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
			aKeyValue = aCouples[i].split('=');
			if (aKeyValue.length > 1) {
				Haravan.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
			}
		}
	}
	$('.sort-by').val(window.wd.collection.sortbydefault).on('change', function() {
		if(window.location.search.indexOf('&sortby') == -1){
			Haravan.queryParams.sort_by = jQuery(this).val();
			window.location.href = window.location.pathname + '?sort_by='+ Haravan.queryParams.sort_by
		}else{
			Wandacollection.changesort_by();
		}
	});
	Wandacollection.init();
	if(window.location.search.indexOf('&sortby=') > -1){
		$(".collection-body").addClass('success-filter');$("body").addClass('loading-filter');
		$(".product-block img").addClass('opacity-none')
	}
})

