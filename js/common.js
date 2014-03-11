$(document).ready(function() {

wnd = $(window);

var body = $('body');
var wrap = $('.wrapper');
//scroll
wrap.bind('mousewheel', function(event, delta) {
	var el = $('.js-scroll-nav');
	var act = el.find('li.is-current');
	if (body.hasClass('is-running')) {
		//alert('i am running dont talk to me');
	}
	else{
		//alert('go!');
  	if (delta < 0) {
  		if (act.next().length>0) {
  			body.addClass('is-running');
  			act.removeClass('is-current').next().addClass('is-current');
  			var attr = act.next().attr('data-page');
  			var top = $('#'+attr).offset().top;
  			$('html, body').animate({scrollTop: top}, 1000, 'easeInOutQuint', function(){
  				body.removeClass('is-running');
  			});		
  		};
  	}
  	else {
  		if (act.prev().length>0) {
  			body.addClass('is-running');
  			act.removeClass('is-current').prev().addClass('is-current');
  			var attr = act.prev().attr('data-page');
  			var top = $('#'+attr).offset().top;
  			$('html, body').animate({scrollTop: top}, 1000, 'easeInOutQuint', function(){
  				body.removeClass('is-running');
  			});		
  		};
  	}
  }
  return false;
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
	var el = $('.js-sl');
	if (el.length > 0) {
		el.each(function(){
			el_next = $(this).find('.slider__next');
			el_prev = $(this).find('.slider__prev');
			el_item = $(this).find('.slider__item');
			el_in = $(this).find('.slider__in');
			if (navigator.userAgent.indexOf('iPad') == -1 || navigator.userAgent.indexOf('iPod') == -1 || navigator.userAgent.indexOf('iPhone') == -1){
				el_anim = 'carousel';
				$('body').addClass('no-ios');
			}
			else{
				el_anim = 'fade';
			};
			el_in.cycle({
				fx: el_anim,
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
	if (navigator.userAgent.indexOf('iPad') == -1){
		var sizer = $('.js-page');
		var slide = $('.js-sl-height');
		wnd_height = wnd.height();
		sizer.height(wnd_height);
		sl_height = wnd_height - 55;
		slide.height(sl_height);
	}
}
sizer();

//nav
function nav() {
	var el = $('.js-nav');
	btn = el.find('a');
	btn.on('click', function(){
		var nav = $('.js-scroll-nav');
		var attr = $(this).attr('href');
		var nav_item = nav.find('li');
		nav_item.each(function(){
			var nav_attr = $(this).attr('data-page');
			nav_attr = '#' + nav_attr; 
			console.log(attr+'_'+nav_attr);
			if (attr == nav_attr) {
				nav_item.removeClass('is-current');
				$(this).addClass('is-current');
			};
		});
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
if (navigator.userAgent.indexOf('iPad') == -1 || navigator.userAgent.indexOf('iPod') == -1 || navigator.userAgent.indexOf('iPhone') == -1){
	$('div[data-type="background"]').each(function(){
	  var $bgobj = $(this);
	  $(window).scroll(function() {
	    var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
	    var coords = 'center '+ yPos + 'px';
	    $bgobj.css({ backgroundPosition: coords });
	  });
	});
}

wnd.resize(function(){
	sizer();
});

});