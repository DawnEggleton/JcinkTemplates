$('.temp-menuInner span').on('click', function() {
	$('.temp-menuInner span').removeClass('tempActive');
	$('.temp-tabs .scroll').removeClass('tempActive');
	$(this).addClass('tempActive');
	$(this).parent().parent().parent().children('.temp-content').children('#' + this.id + '-content').addClass('tempActive');
});