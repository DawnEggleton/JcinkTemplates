$('.bea-wrap.timeline h1').on('click', function() {
    $(this).next().slideToggle();
});

$('.bea-wrap.tabbed .bea-notes span').on('click', function() {
    let id = this.id;
    $(this).siblings().removeClass('activeTab');
    $(this).parent().parent().siblings('.bea-main').removeClass('activeTab');
    $(this).addClass('activeTab');
    $(this).parent().parent().siblings('#' + id + '-content').addClass('activeTab');
});
