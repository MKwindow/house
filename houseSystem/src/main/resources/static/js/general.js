jQuery(document).ready(function($) {			
		
		$("a").each(function() {
			$(this).attr("hideFocus", "true").css("outline", "none");
		});
	
		$(".dropdown ul").parent("li").addClass("parent");
		$(".dropdown li:first-child, .pricing_box li:first-child").addClass("first");
		$(".dropdown li:last-child, .pricing_box li:last-child").addClass("last");
		$(".dropdown li:only-child").removeClass("last").addClass("only");	
		$(".dropdown .current-menu-item, .dropdown .current-menu-ancestor").prev().addClass("current-prev");		

		$("ul.tabs").tabs("> .tabcontent", {
			tabs: 'li', 
			effect: 'fade'
		});
		
	$(".recent_posts li:odd").addClass("odd");
	$(".popular_posts li:odd").addClass("odd");
	$(".widget_recent_comments li:even, .widget_recent_entries li:even, .widget_twitter .tweet_item:even, .widget_archive li:even").addClass("even");
	
// cols
	$(".row .col:first-child").addClass("alpha");
	$(".row .col:last-child").addClass("omega"); 	

// quick search
	$("#link_q_filter").click(function(){
		$(this).toggleClass("active");
		$(this).next(".quick_filter_box").slideToggle(300,'easeInOutCubic');
	});
	
// toggle content
	$(".toggle_content").hide(); 
	
	$(".toggle").toggle(function(){
		$(this).addClass("active");
		}, function () {
		$(this).removeClass("active");
	});
	
	$(".toggle").click(function(){
		$(this).next(".toggle_content").slideToggle(300,'easeInQuad');
	});
	
	$(".table-pricing tr:even").addClass("even");

// gallery
	$(".gl_col_2 .gallery-item::nth-child(2n)").addClass("nomargin");
	
// pricing
	$(".pricing_box li.price_col").css('width',$(".pricing_box ul").width() / $(".pricing_box li.price_col").size());

// buttons	
	if (!$.browser.msie) {
		$(".button_link, .button_styled, .btn-share, .tf_pagination .page_prev, .tf_pagination .page_next").hover(function(){
			$(this).stop().animate({"opacity": 0.85});
		},function(){
			$(this).stop().animate({"opacity": 1});
		});
	}
	
// preload images
	var cache_i = [];
	$.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache_i.push(cacheImage);
    }
	$.preLoadImages(
	"images/dropdown_sprite.png",
	"images/dropdown_sprite2.png",
	"images/opacity_gray_90.png",
	"images/quick_search_bg.png");
}	

});
