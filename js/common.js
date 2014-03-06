$(document).ready(function() {

wnd = $(window);

//scroll
var body = $('body');
var wrap = $('.wrapper');

wrap.bind('mousewheel', function(event, delta) {
	if (body.hasClass('is-running')) {
		//alert('i am running dont talk to me');
	}
	else{
		//alert('go!');
		body.addClass('is-running');
  	if (delta < 0) {

  	}
  }
});

//fancybox
var fbox = $('.fancybox-media, .fancybox-img');
if (fbox.length) {
	fbox.fancybox({
		openEffect  : 'elastic',
		closeEffect : 'elastic',
		prevEffect: 'fade',
		nextEffect: 'fade',
		padding: 0,
		maxWidth: 1000,
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
    tabs_item.removeClass('is-active');
    tabs_item.first().addClass('is-active');
    tabs_btn.on('click', function() {
	    if (!$(this).parent('li').hasClass('is-active')) {
	    	var id = $(this).attr('href');
		    tabs_btn.parent('li').removeClass("is-active");
		    $(this).parent('li').addClass("is-active");
		    tabs_item.removeClass('is-active');
		    $('#'+id).addClass('is-active');
	    };
	    return false;
    });
  });
}
tabs();

//sliders
function sl () {
	var el = $('.js-sl-on');
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
		$('html, body').animate({scrollTop: top}, 1000, 'easeInOutQuint');			
		return false;
	});	
}
nav();

//order
function order () {
	var el = $('.js-order');
	var item = el.find('.order__item');
	var info = el.find('.order__info');
	var form = el.find('.order__form');
	var go = el.find('.order__btn-go');
	var send = el.find('.order__btn-send');
	var close = el.find('.order__form-close');
	item.hover(function(){
		item.removeClass('is-active');
		$(this).addClass('is-active');
	}, function(){
		//$(this).find('.order__item-in').removeClass('is-flipped');
	});
	go.on('click', function(){
		$(this).parents('.order__item-in').addClass('is-flipped');
	});
	close.on('click', function(){
		$(this).parents('.order__item-in').removeClass('is-flipped');
	});
	var max = -1;
	var min = 320;
	info.each(function(){
		var h = $(this).height(); 
		max = h > max ? h : max;
	})
	info.height(max);
	form.height(max);
}
order();

//paralax
$('div[data-type="background"]').each(function(){
  var $bgobj = $(this); // создаем объект
  $(window).scroll(function() {
    var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
    // Присваиваем значение background-position
    var coords = 'center '+ yPos + 'px';
    // Создаем эффект Parallax Scrolling
    $bgobj.css({ backgroundPosition: coords });
  });
});

wnd.resize(function(){
	sizer();
});

});