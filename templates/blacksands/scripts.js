//template icons
$('group i.bs-tempIcon').addClass('th').addClass('th-stars-o');
$('gryffindor i.bs-tempIcon').addClass('th').addClass('th-lion-o');
$('ravenclaw i.bs-tempIcon').addClass('th').addClass('th-eagle-o');
$('hufflepuff i.bs-tempIcon').addClass('th').addClass('th-badger-o');
$('slytherin i.bs-tempIcon').addClass('sf').addClass('sf-snake-o');
$('professor i.bs-tempIcon').addClass('th').addClass('th-apple-o');
$('ministry i.bs-tempIcon').addClass('sf').addClass('sf-magic-wand-o');
$('healer i.bs-tempIcon').addClass('th').addClass('th-holly-o');
$('quidditch i.bs-tempIcon').addClass('fal').addClass('fa-quidditch');
$('research i.bs-tempIcon').addClass('sf').addClass('sf-beaker-o');
$('media i.bs-tempIcon').addClass('fal').addClass('fa-camcorder');
$('adult i.bs-tempIcon').addClass('th').addClass('th-briefcase-o');
$('student i.bs-tempIcon').addClass('sf').addClass('sf-book-o');


//template scroll padding
$('.scroll .bs-content').each(function() {
    if($(this).outerHeight() + "px" == $(this).css("max-height")) {
        $(this).css({'padding-right': '10px'});
    }
});
$('.bs-ship .bs-content').each(function() {
    if($(this).outerHeight() + "px" == $(this).css("max-height")) {
        $(this).css({'padding-right': '10px'});
    }
});
$('.bs-memDir .bs-content').each(function() {
    if($(this).outerHeight() + "px" == $(this).css("max-height")) {
        $(this).css({'padding-right': '10px'});
    }
});


//template tabs - general
$('.bs-tabs a').on('click', function() {
    $(this).siblings('a').removeClass('bs-actTab');
    $(this).parent().parent().parent().parent().siblings('.bs-contCol').children('.bs-content').removeClass('bs-actTab');
    $(this).parent().parent().parent().siblings('.bs-contCol').children('.bs-wantTab').removeClass('bs-actTab');
    $(this).addClass('bs-actTab');
    $(this).parent().parent().parent().parent().siblings('.bs-contCol').children('.bs-content#' + this.id + '-content').addClass('bs-actTab');
    $(this).parent().parent().parent().siblings('.bs-contCol').children('.bs-wantTab#' + this.id + '-content').addClass('bs-actTab');
});


var bsyears = $('.bs-years b');
var bsevents = $('.bs-timeline .bs-content');
var actYear = 1;

if(actYear == 1) {
        $('.upClass').hide();
}
if(actYear == bsevents.length) {
        $('.downClass').hide();	
}

$('.upClass').on('click', function(){	
    actYear--;
    if (actYear == 1) {
        $('.upClass').hide();
        $('.downClass').show();
    }
    else {
        $('.upClass').show();
        $('.downClass').show();
    }
    for(var i = 0; i < bsevents.length; i++) {
        $(bsyears[i]).css({'top': '+=200px'});
        $(bsevents[i]).css({'top': '+=300px'});
    }
});

$('.downClass').on('click', function(){	
    actYear++;
    if (actYear == bsevents.length) {
        $('.downClass').hide();
        $('.upClass').show();
    }
    else {
        $('.upClass').show();
        $('.downClass').show();
    }
    for(var i = 0; i < bsevents.length; i++) {
        $(bsyears[i]).css({'top': '-=200px'});
        $(bsevents[i]).css({'top': '-=300px'});
    }
});


//template - image height
$('.bs-imgDev .bs-contCol img').each(function() {
    var width = $(this).outerWidth();
    $(this).css({'height': width + 'px'});
});



$('.bs-contCol').each(function() {
    if($(this).outerWidth() < 200) {
        $(this).parent().addClass('bs-gridChange');
    }
});