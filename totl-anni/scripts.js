//Tabbed Template
$('.sl-tempTabs span').on('click', function() {
    var tabID = this.id;
    $('.sl-tempTabs span').removeClass('sl-activeTab');
    $('.sl-tempTabCont').removeClass('sl-activeTab');
    $('#' + tabID + '-content').addClass('sl-activeTab');
    $('#' + tabID).addClass('sl-activeTab');
});