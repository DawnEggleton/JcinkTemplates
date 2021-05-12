$(document).ready(function(){
	
	$('ul.lux-stripe-tabs li').click(function(){
		$('ul.lux-stripe-tabs li').removeClass('current');
		$('.adr2-temp-content').removeClass('current');

		$(this).addClass('current');
		$('#' + this.id + '-content').addClass('current');
	})

});