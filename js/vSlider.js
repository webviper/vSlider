/**
 * vSlider
 */
(function($) {
	$.fn.vSlider = function(o){   /*   ---  vSlider Options   ---   */
		o = $.extend({
		
			startSlider: 0,  
			settingSelector: '.sliderSetting'
			
		}, o || {}); 
		return this.each(function(){
		
			var $slider_container = $(this);
			var $slider_items = $slider_container.children('.slider');
			var $slide_items = $slider_items.children('.slider-slide');
			var $slider_current = $slider_items.eq(point);
			
			var n_slider = $slider_items.length;
			var point = 0;
			var point_slider = o.startSlider;
			var current_slide_n = $slider_current.children('.slider-slide').length;
						
			var $slide_current;
			var $slide_next;
			var $slide_prev;
			
			//  Setting & Info Elements
			var $slider_index = $(o.settingSelector).find('.sliderIndex');
			var $slider_index_current = $(o.settingSelector).find('.sliderIndex-current');
			var $hide_setting_btn = $(o.settingSelector).find('.hideSetting');
			var $slide_index = $(o.settingSelector).find('.slideIndex');
			var $next_btn_slide = $(o.settingSelector).find('.nextSlide');
			var $prev_btn_slide = $(o.settingSelector).find('.prevSlide');
			var $next_btn_slider = $(o.settingSelector).find('.nextSlider');
			var $prev_btn_slider = $(o.settingSelector).find('.prevSlider');
			
	/***  Hash Functions  ***/		
			function getHash(){
				return location.hash.substr(1).split(',');
			}

			function updateHash(){
				location.replace('#'+ (point_slider + 1) +','+ (point + 1));
			}
	/***  END Hash Functions  ***/

	/***  Initialization presentation  ***/
			function init(){	
				var str = '';
				
				for (var i = 1; i <= n_slider; i++) {
					str += '<li>'+ i +'</li>';
				}
				$slider_index.append('<ul role="navigation">'+ str +'</ul>');
				
				var getSlideHash = getHash();							
				
				if (getSlideHash.length > 1) {
					var hash_slider = parseInt(getSlideHash[0]) - 1 || 0;
					var hash_slide = parseInt(getSlideHash[1]) - 1 || 0;	
					initNewSlider($slider_items.eq(hash_slider), hash_slider, $slider_items.eq(hash_slider).children('.slider-slide').eq(hash_slide), hash_slide);
				} else {
					initNewSlider($slider_items.eq(o.startSlider), o.startSlider);
				}												
			}
			init();
	/***  END Initialization presentation  ***/		
	
	/***  Initialization/Change NEW presentation  ***/	
			function initNewSlider($slider, init_point_slider, hash_slide, hash_point){	
				$slide_items.removeClass('slide_current slide_next slide_prev').attr('aria-hidden', 'true');
				$slider_items.removeClass('slider_current slider_next slider_prev');
				point = hash_point || 0;
				point_slider = init_point_slider;
				$slider_current = $slider;
				current_slide_n = $slider_current.children('.slider-slide').length;
				
				if (point_slider == 0) {
					$prev_btn_slider.hide().attr('aria-hidden', 'true');
				} else if (point_slider > 0) {
					$prev_btn_slider.show().attr('aria-hidden', 'false');
				}
				if (point_slider >= n_slider - 1) {
					$next_btn_slider.hide().attr('aria-hidden', 'true');
				} else if (n_slider - 1 > point_slider) {
					$next_btn_slider.show().attr('aria-hidden', 'false');
				}
				
				updateInfo();				
								
				$slider.addClass('slider_current').removeClass('slider_prev slider_next').attr('aria-hidden', 'false')
					.prev('.slider').addClass('slider_prev').removeClass('slider_current slider_next').end()
					.next('.slider').addClass('slider_next').removeClass('slider_current slider_prev');
					
				$slide_current = hash_slide || $slider.children('.slider-slide').eq(point);
				$slide_next = $slide_current.next('.slider-slide');
				$slide_prev = $slide_current.prev('.slider-slide');
				
				$slide_current.addClass('slide_current').attr('aria-hidden', 'false');				
				$slide_next.addClass('slide_next').attr('aria-hidden', 'false');
				if (point > 0) {
					$slide_prev.addClass('slide_prev').attr('aria-hidden', 'false');
				} else {
					$prev_btn_slide.hide().attr('aria-hidden', 'true');
				}
				$next_btn_slide.show().attr('aria-hidden', 'false');
				updateHash();
			}
	/***  END Initialization/Change NEW presentation  ***/
	
			function fadeInSlideItem($item){
				$item.removeClass('hide');
			}
	
	/***  Change slide  ***/
			function nextSlide(){
				if ($slide_current.find('.hideItemContainer .hide').length) {
					fadeInSlideItem($slide_current.find('.hideItemContainer .hide').eq(0));
					return;
				}
				if  (!$slide_next.length) {
					return;
				}
				++point;
				updateInfo();
								
				$slide_current = $slide_next;
				$slide_next = $slide_next.next('.slider-slide');
				$slide_prev = $slide_current.prev('.slider-slide');
				$prev_btn_slide.show().attr('aria-hidden', 'false');
				
				$slide_current.removeClass('slide_next').addClass('slide_current')
					.next('.slider-slide').addClass('slide_next').attr('aria-hidden', 'false');
				$slide_prev.removeClass('slide_current').addClass('slide_prev')
					.prev('.slider-slide').removeClass('slide_prev').attr('aria-hidden', 'true');
				
				if  (!$slide_next.length) {
					$next_btn_slide.hide().attr('aria-hidden', 'true');
				}
				updateHash();
			}
			
			function prevSlide(){
				if  (!$slide_prev.length) {
					return;
				}
				--point;
				updateInfo();
								
				$slide_current = $slide_prev;
				$slide_next = $slide_current.next('.slider-slide');
				$slide_prev = $slide_current.prev('.slider-slide');
				$next_btn_slide.show().attr('aria-hidden', 'false');
				
				$slide_current.removeClass('slide_prev').addClass('slide_current')
					.prev('.slider-slide').addClass('slide_prev').attr('aria-hidden', 'false');
				$slide_next.removeClass('slide_current').addClass('slide_next')
					.next('.slider-slide').removeClass('slide_next').attr('aria-hidden', 'true');
					
				if  (!$slide_prev.length) {
					$prev_btn_slide.hide().attr('aria-hidden', 'true');
				}
				updateHash();
			}
	/***  END Change slide  ***/
	
	/***  Change presentation  ***/
			function nextSlider(){
				if (point_slider < n_slider - 1) {
					++point_slider;
					initNewSlider($slider_current.next('.slider'), point_slider);
				}
			}
			
			function prevSlider(){
				if (point_slider > 0) {
					--point_slider;
					initNewSlider($slider_current.prev('.slider'), point_slider);
				}
			}
	/***  END Change presentation  ***/
			
			function updateInfo(){
				if ($slide_index) {
					$slide_index.text(point + 1 +'/'+ current_slide_n);
					$slider_index_current.text(point_slider + 1);
					$slider_index.find('li').removeClass('selected').eq(point_slider).addClass('selected');
				}
			}
			
			function hideSetting(){
				$slider_container.toggleClass('slider-hideSetting');
				$(o.settingSelector).toggleClass('hidden');
			}
			
			function fullscreen(e){
				if (e.target == document.body && !(e.shiftKey && e.metaKey)) {
					if (document.mozFullScreen !== undefined && !document.mozFullScreen) {
						document.body.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					} else if (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
						document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				}
			}
			
	/***  Attached Events  ***/		
			function addEvents(){
				$slider_index.find('ul').click(function(e){
					var $item = $(e.target);
					var index = $item.index();
					initNewSlider($slider_items.eq(index), index);
				});
				$next_btn_slide.mousedown(function(e){
					nextSlide();
					e.preventDefault();
				});
				$prev_btn_slide.mousedown(function(e){
					prevSlide();
					e.preventDefault();
				});
				$next_btn_slider.mousedown(function(e){
					nextSlider();
					e.preventDefault();
				});
				$prev_btn_slider.mousedown(function(e){
					prevSlider();
					e.preventDefault();
				});
				$hide_setting_btn.click(function(e){
					hideSetting();
					e.preventDefault();
				});
			}
			addEvents();
	/***  END Attached Events  ***/		
	
	/***  Keyboard control  ***/	
			$(function keyboard(){
				$(document).keydown(function(e){ 
					switch (e.keyCode) {
					case 39: // right arrow
					case 32: // space					
						nextSlide();
						e.preventDefault();
						break;

					case 37: // left arrow
					case 8: //  Backspace					
						prevSlide();
						e.preventDefault();
						break;

					case 40: // down arrow
					case 34: // PgDn
						nextSlider();
						e.preventDefault();
						break;

					case 38: // up arrow
					case 33: // PgUp
						prevSlider();
						e.preventDefault();
						break;
					
					case 27: // Escape
						hideSetting();
						e.preventDefault();
						break;
					
					case 70: // F (Fullscreen)
						fullscreen(e);
						e.preventDefault();
						break;
					}
				});	
			});
	/***  END Keyboard control  ***/			
		});
	};
})(jQuery)