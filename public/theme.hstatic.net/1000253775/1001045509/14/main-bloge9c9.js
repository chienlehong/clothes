const Wandablog = {
	init: function() {
		var $that = this;
		$that.menusidebar();
		if($('.article-body h2').length > 0 && window.wd.template.includes('article')){$that.tableofcontent();}
	},
	menusidebar: () =>{
		$("body").on('click','.cl-open-sb',function(e){
			e.preventDefault();
			let $menu = $(this);
			$menu.next().slideToggle('fast');
			$menu.toggleClass('minus-menu');
		});
		$(".article-body img").addClass('dt-width-auto').attr('height','600').attr('width','600');
	},
	tableofcontent: () =>{
		class TableOfContents {
			constructor({ from, to }) {
				this.fromElement = from;
				this.toElement = to;
				// Get all the ordered headings.
				this.headingElements = this.fromElement.querySelectorAll("h1,h2,h3,h4,h5,h6");
				this.tocElement = document.createElement("div")
			}
			getMostImportantHeadingLevel() {
				let mostImportantHeadingLevel = 6; 
				for (let i = 0; i < this.headingElements.length; i++) {
					let headingLevel = TableOfContents.getHeadingLevel(this.headingElements[i]);
					mostImportantHeadingLevel = (headingLevel < mostImportantHeadingLevel) ? headingLevel : mostImportantHeadingLevel;
				}
				return mostImportantHeadingLevel;
			}
			static generateId(headingElement) {
				return urlfriendly(headingElement.textContent)
			}
			static getHeadingLevel(headingElement) {
				switch (headingElement.tagName.toLowerCase()) {
					case "h1": return 1;
					case "h2": return 2;
					case "h3": return 3;
					case "h4": return 4;
					default: return 1;
				}
			}
			generateToc() {
				let currentLevel = this.getMostImportantHeadingLevel() - 1,
						currentElement = this.tocElement;
				for (let i = 0; i < this.headingElements.length; i++) {
					let headingElement = this.headingElements[i],
							headingLevel = TableOfContents.getHeadingLevel(headingElement),
							headingLevelDifference = headingLevel - currentLevel,
							linkElement = document.createElement("a");
					if (!headingElement.id) {
						headingElement.id = TableOfContents.generateId(headingElement);
					}
					linkElement.href = `#${headingElement.id}`;
					linkElement.textContent = headingElement.textContent;
					if (headingLevelDifference > 0) {
						// Go down the DOM by adding list elements.
						for (let j = 0; j < headingLevelDifference; j++) {
							let listElement = document.createElement("ul"),
									listItemElement = document.createElement("li");
							listElement.appendChild(listItemElement);
							currentElement.appendChild(listElement);
							currentElement = listItemElement;
						}
						currentElement.appendChild(linkElement);
					} else {
						// Go up the DOM.
						for (let j = 0; j < -headingLevelDifference; j++) {
							currentElement = currentElement.parentNode.parentNode;
						}
						let listItemElement = document.createElement("li");
						listItemElement.appendChild(linkElement);
						currentElement.parentNode.appendChild(listItemElement);
						currentElement = listItemElement;
					}

					currentLevel = headingLevel;
				}
				this.toElement.appendChild(this.tocElement.firstChild);
			}
		}
		let stringtemplate = $(`<div id="table-content-container" class="table-of-contents"><div class="title-table"><div class="title-table">Nội dung bài viết<span class="toc_toggle">[<a class="icon-list" href="javascript:void(0)">Ẩn</a>]</span></div><button class="close-table"><img width="15" height="15" src="${cancelimg}">Close</button></div></div>`);
		stringtemplate.insertAfter($(".article-body p").eq(0))
		new TableOfContents({
			from: document.querySelector(".article-body"),
			to: document.querySelector("#table-content-container")
		}).generateToc();
		$("#table-content-container .icon-list").click(function(){
			$(this).parents("#table-content-container").find("ul:first").slideToggle({ direction: "left" }, 100);
			var texxx = $(this).text();
			if(texxx == "Ẩn"){
				$(this).html("Hiện")
			}else{
				$(this).html("Ẩn")
			}
		})
		let buttontable = `<div class="fixed-table"><button class="btn-fixed-table-content"><i class="fa fa-list-ol" aria-hidden="true"></i></button><div id="clone-table" class="table-of-contents"></div></div>`;
		$("body").append(buttontable).ready(function(){
			var tablehtml = $("#table-content-container").html()
			$("#clone-table").html(tablehtml);
		});
		$("#table-content-container ul li a").click(function(){
			var idd = $(this).attr('href');
			let heighthead = $("#header").height() + 15;
			$("html,body").animate({ scrollTop: $(idd).offset().top - heighthead }, "fast")
		})
		$(".fixed-table button").click(function(){
			$(".fixed-table").toggleClass('active');
		})
	}
}
$(function(){
	Wandablog.init();
})
$(document).ready(() =>{
	if(window.wd.template.indexOf('article') > -1){
		let ofsettop_ = $(".article-body #table-content-container").offset().top + $("#table-content-container").innerHeight();
		$("body").on('click','#clone-table ul li a',function(){
			var idd = $(this).attr('href');
			let heightheadfix = $("#header").height() + 15;
			$("html, body").animate({ scrollTop: $(idd).offset().top - heightheadfix }, "fast")
		})
		$("body").on('click','.close-table',function(){
			 $('.fixed-table').removeClass('active');
		}); 
		$(window).scroll(function(){
			let ofsettop_ = $(".article-body #table-content-container").offset().top + $("#table-content-container").innerHeight();
			if($(window).scrollTop() > ofsettop_){
				$(".fixed-table").addClass('show');
			}else{
				$(".fixed-table").removeClass('show');
			}
		});
	}
})

