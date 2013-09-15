vSlider
=======

Presentation jQuery plugin

Support: IE8+, Webkit, Gecko

Quick start:
$(function(){
		$(selector).vSlider();
});

Setting:
startSlider:     0 (default), number of presentation which should begin;
settingSelector: '.sliderSetting' (default), selector to the presentation settings

Notes:
HTML Structure for fadeIn item into slide:
<tag class="hideItemContainer">
  <tag class="hide">
  text
  </tag>
  <tag class="hide">
  text
  </tag>
  ...
</tag>

Control:
39: // right arrow
32: // space
   Go to Next Slide
   
37: // left arrow
8: //  Backspace					
	 Go to Previous Slide

40: // down arrow
34: // PgDn
   Go to Next Presentation

38: // up arrow
33: // PgUp
	 Go to Previous Presentation
					
27: // Escape
	 Hide settings & info presentation
					
70: // F 
	 Fullscreen