vSlider
=======
#####jQuery plugin for presentations

###Support: 

__IE8+, Webkit, Gecko__

###Quick start:

```
$(function(){
	$(selector).vSlider();
});
```

###Setting:

__startSlider:   0 (default)__, number of presentation which should begin;

__settingSelector: '.sliderSetting' (default)__, selector to the presentation settings

###Notes:

HTML Structure for fadeIn item into slide:
```
<tag class="hideItemContainer">
  <tag class="hide">
  text
  </tag>
  <tag class="hide">
  text
  </tag>
  ...
</tag>
```

###Control:

```
39: right arrow
32: space
   Go to Next Slide
   
37: left arrow
8:  Backspace					
	 Go to Previous Slide

40: down arrow
34: PgDn
   Go to Next Presentation

38: up arrow
33: PgUp
	 Go to Previous Presentation
					
27: Escape
	 Hide settings & info presentation
					
70: F 
	 Fullscreen
```
