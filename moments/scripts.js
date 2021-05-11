$('.lux-moments .temp-tabs span').on('click', function() {
    $('.lux-moments .temp-tabs span').removeClass('mom-active');
    $('.lux-moments .temp-tabs ~ .temp-content').removeClass('mom-active');
    $('#' + this.id + '-content').addClass('mom-active');
    $(this).addClass('mom-active');
});