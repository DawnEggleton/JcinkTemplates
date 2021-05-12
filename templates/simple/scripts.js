let actTab = 1;
let titles = $('.lux-tabbed .lux-temp1-title');
let ttabs = $('.lux-tabbed .lux-temp1-content');

$('.lux-temp1-left').on('click', function(){	
	if (actTab == 1) {
		actTab = ttabs.length;
	}
	else {
		actTab -= 1;
	}
	for (i = 0; i < ttabs.length; i++) {
		$(titles[i]).removeClass('lux-active');
		$(ttabs[i]).removeClass('lux-active');
	}
	$(titles[actTab - 1]).addClass('lux-active');
	$(ttabs[actTab - 1]).addClass('lux-active');
});

$('.lux-temp1-right').on('click', function(){	
	if (actTab == ttabs.length) {
		actTab = 1;
	}
	else {
		actTab += 1;
	}
	for (i = 0; i < ttabs.length; i++) {
		$(titles[i]).removeClass('lux-active');
		$(ttabs[i]).removeClass('lux-active');
	}
	$(titles[actTab - 1]).addClass('lux-active');
	$(ttabs[actTab - 1]).addClass('lux-active');
});