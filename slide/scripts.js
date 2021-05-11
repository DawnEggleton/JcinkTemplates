$('.lux-slide-box').each(function() {
	var slideImage = $(this).find('.lux-slide-image').html();
	$(this).find('.lux-slide-image').append(slideImage);

	$(this).find('.lux-slide-togPost').on('click', function() {
		$(this).parent().animate({ left: "+=425" }, 750);
		$(this).parent().parent().find('.lux-slide-post').animate({ left: "+=425" }, 750);
		$(this).parent().parent().find('.lux-slide-image img').addClass('animate');
	});
	
	$(this).find('.lux-slide-togInfo').on('click', function() {
		$(this).parent().animate({ left: "-=425" }, 750);
		$(this).parent().parent().find('.lux-slide-info').animate({ left: "-=425" }, 750);
		$(this).parent().parent().find('.lux-slide-image img').removeClass('animate');
	});
});