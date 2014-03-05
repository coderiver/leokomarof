$(document).ready(function() {

wnd = $(window);

var fbox = $('.fancybox-media, .fancybox-img');

if (fbox.length) {
	fbox.fancybox({
		openEffect  : 'elastic',
		closeEffect : 'elastic',
		padding: 0,
		helpers : {
			media : {}
		}
	});
};





//tabs
function tabs() {
  $(".js-tabs").each(function(){
    var tabs_btn = $(this).find('.tabs__nav a');
    var tabs_container = $(this).find('.tabs__container');
    var tabs_item = $(this).find('.tabs__item');
    tabs_item.hide();
    tabs_item.first().show();
    tabs_btn.on('click', function() {
	    if (!$(this).parent('li').hasClass('is-active')) {
	    	var id = $(this).attr('href');
		    tabs_btn.parent('li').removeClass("is-active");
		    $(this).parent('li').addClass("is-active");
		    tabs_item.slideUp();
		    $('#'+id).slideDown();
	    };
	    return false;
    });
  });
}
tabs();

//sliders
function sl () {
	var el = $('.js-sl');
	if (el.length > 0) {
		el.each(function(){
			el_next = $(this).find('.slider__next');
			el_prev = $(this).find('.slider__prev');
			el_item = $(this).find('.slider__item');
			el_in = $(this).find('.slider__in');
			el_in.cycle({
				fx: 'carousel',
			  timeout: 0,
			  prev: el_prev,
			  next: el_next,
			  slides: el_item
			});
		});
	};	
}
sl();

//sizer
function sizer () {
	var sizer = $('.js-page');
	var slide = $('.js-sl');
	wnd_height = wnd.height();
	sizer.height(wnd_height);
	slide.height(wnd_height - 55);
}
sizer();

//nav
function nav() {
	var el = $('.js-nav');
	btn = el.find('a');
	btn.on('click', function(){
		var attr = $(this).attr('href');
		var top = $(attr).offset().top;
		$('body').animate({scrollTop: top}, 500);			
		return false;
	});	
}
nav();

//order
function order () {
	var el = $('.js-order');
	var item = el.find('.order__item');
	var go = el.find('.order__btn-go');
	var send = el.find('.order__btn-send');
	var close = el.find('.order__form-close');
	item.hover(function(){
		item.removeClass('is-active');
		$(this).addClass('is-active');
	}, function(){});
	go.on('click', function(){
		$(this).parents('.order__item').find('.order__info').slideUp();
		$(this).parents('.order__item').find('.order__form').slideDown();
		$(this).parents('.order__item').find('.order__btn-go').hide();
		$(this).parents('.order__item').find('.order__btn-send').show();
	});
	close.on('click', function(){
		$(this).parents('.order__item').find('.order__info').slideDown();
		$(this).parents('.order__item').find('.order__form').slideUp();
		$(this).parents('.order__item').find('.order__btn-go').show();
		$(this).parents('.order__item').find('.order__btn-send').hide();
	});
}
order();

wnd.resize(function(){
	sizer();
});

});