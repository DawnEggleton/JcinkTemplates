//general variables
let type, colors, lHead = [''], sHead = [''], tempCode = '', tabs = 0;

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;


//Show/Hide Basic Fields
showhide('image', 'ifImg');
showhide('lh', 'ifLH');
showhide('sh', 'ifSH');


//Set Variables
function setValues() {

    //set image
    fromRadio('sh', sHead, '', '');
    type = $('input[name="type"]:checked').val();
    tabs = $('#tabCount').val();
    console.log(tabs);

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents(tevent[0], years, months, events, type, 'ev');
    } else if (type == 'tracker') {
        tracking = orderEvents(thread[0], tYears, tMonths, threads, type, 'post');
    }

    //set up color styles
    
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>' +
                        '.' + $('input[name="char"]').val() + ' .adr2-template,' + 
                        '.' + $('input[name="char"]').val() + ' .lux-timeline-contain' +
                        ' {--accent: ' +
                        $('input[name="accent"]').val() +
                        '; --ltAccent: ' +
                        $('input[name="ltAccent"]').val() +
                        ';}</style>';
    }
}


//Create Flexible Fields
function addFieldSet(fieldVar, fieldType) {
    switch(fieldType) {
        case 'event':
            $('.ifTime span.timeline').append('<input type="text" name="ev' + fieldVar + '" class="year" placeholder="YYYY" /><input type="text" name="ev' + fieldVar + '" class="month" placeholder="MM" /><input type="text" name="ev' + fieldVar + '" class="event" placeholder="Event" />');
            break;
    }  
}


//Build Complex Content
function buildTimeline (yearArray, monthArray, eventArray) {    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray.sort();
        var tempYear = '<div class="lux-timeline-section"><div class="lux-timeline-marker"><div class="lux-timeline-markline"></div><div class="lux-timeline-dot"></div></div><div class="lux-timeline-text"><h2>\n' + yearArray[i] + '\n</h2><div class="lux-timeline-blurbs">\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<b>January</b><br>\n';
                    break;
                case '2':
                    tempYear += '<b>February</b><br>\n';
                    break;
                case '3':
                    tempYear += '<b>March</b><br>\n';
                    break;
                case '4':
                    tempYear += '<b>April</b><br>\n';
                    break;
                case '5':
                    tempYear += '<b>May</b><br>\n';
                    break;
                case '6':
                    tempYear += '<b>June</b><br>\n';
                    break;
                case '7':
                    tempYear += '<b>July</b><br>\n';
                    break;
                case '8':
                    tempYear += '<b>August</b><br>\n';
                    break;
                case '9':
                    tempYear += '<b>September</b><br>\n';
                    break;
                case '10':
                    tempYear += '<b>October</b><br>\n';
                    break;
                case '11':
                    tempYear += '<b>November</b><br>\n';
                    break;
                case '12':
                    tempYear += '<b>December</b><br>\n';
                    break;
                default:
                    console.log('no month');
                    break;
            }
            $('.event').each(function () {
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).prev().val().replace('0', '');
                } else {
                    simpMonth = $(this).prev().val();
                }
                if($(this).prev().prev().val() == yearArray[i] && simpMonth == monthArray[i][j].split('-')[2]) {
                    tempYear += $(this).val() + '<p>\n';
                }
            });
        }
        tempYear += '</div></div><div style="clear: both;"></div></div>';
        eventArray.push(tempYear);
    }
    var eventList = '';
    for (var i = 0; i < eventArray.length; i++) {
        eventList += eventArray[i];
    }
    return eventList;
}


//Build Final Content

function setLargeCode() {
    if($('input[name="sh"]:checked').val() == 'y') {
        var code =     '<span class="' +
                        $('input[name="char"]').val() +
                        '"><div class="adr2-template sub"><div class="adr2-temp-title"><span>' + '\n\n' +
                        $('#lhText').val() + '\n\n' +
                        '</span></div><div class="adr2-temp-subbar"><span>' + '\n\n' +
                        sHead + '\n\n' +
                        '</span></div><div class="adr2-temp-content"><div class="adr2-temp-inner">' + '\n\n' + 
                        $('#postText').val() + '\n\n' +
                        '</div></div></div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' +
                        colors;
    } else {
        var code =     '<span class="' +
                        $('input[name="char"]').val() +
                        '"><div class="adr2-template"><div class="adr2-temp-title"><span>' + '\n\n' +
                        $('#lhText').val() + '\n\n' +
                        '</span></div><div class="adr2-temp-content"><div class="adr2-temp-inner">' + '\n\n' + 
                        $('#postText').val() + '\n\n' +
                        '</div></div></div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' +
                        colors;
    }
    return code;
}

function setSmallCode() {
    if($('input[name="sh"]:checked').val() == 'y') {
        var code =  '<span class="scroll ' +
                    $('input[name="char"]').val() +
                    '"><div class="adr2-template sml sub"><div class="adr2-temp-title"><span>' + '\n\n' +
                    $('#lhText').val() + '\n\n' +
                    '</span></div><div class="adr2-temp-subbar"><span>' + '\n\n' +
                    sHead + '\n\n' +
                    '</span></div><div class="adr2-temp-content"><div class="adr2-temp-inner">' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    '</div></div></div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' +
                    colors;
    } else {
        var code =  '<span class="scroll ' +
                    $('input[name="char"]').val() +
                    '"><div class="adr2-template sml"><div class="adr2-temp-title"><span>' + '\n\n' +
                    $('#lhText').val() + '\n\n' +
                    '</span></div><div class="adr2-temp-content"><div class="adr2-temp-inner">' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    '</div></div></div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' +
                    colors;
    }
    return code;
}

function setTabbedCode() {
    console.log(tabs);
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="adr2-template sub claim-tabs"><div class="adr2-temp-title"><span>' + '\n\n' + 
                $('#lhText').val() + '\n\n' + 
                '</span></div><div class="adr2-temp-subbar"><ul class="lux-stripe-tabs">' + '\n';

    //do tab labels
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var j = i + 1;
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if (i == 0) {
            code += '<li class="lux-stripe-tab' + j + ' current" id="' + label + '">' + $('#tabTitle' + i).val() + '</li>';
        } else {
            code += '<li class="lux-stripe-tab' + j + '" id="' + label + '">' + $('#tabTitle' + i).val() + '</li>';
        }
    }

    code += '</ul></div>';
    
    //code tabs
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<div id="' + label + '-content" class="adr2-temp-content current"><div class="adr2-temp-inner">' + $('#tabText' + i).val() + '</div></div>';
        } else {
            code += '<div id="' + label + '-content" class="adr2-temp-content"><div class="adr2-temp-inner">' + $('#tabText' + i).val() + '</div></div>';
        }
    }
    
    code += '</div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' + colors;
    return code;
}

function setTimelineCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="lux-timeline-contain"><h1>' + '\n\n' +
                $('#tlhText').val() + '\n\n' +
                '</h1><img src="' + 
                $('#imgURL').val() + 
                '"><div style="height: 50px;"></div>' + 
                timeline + 
                '<div class="lux-timeline-section-last"></div></div></span><link href="//fonts.googleapis.com/css?family=Raleway:400,400i,700,700i" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Oswald:400,700&amp;subset=cyrillic,latin-ext" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/stripe/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/stripe/scripts.js></script>' +
                colors;
    return code;
}


$('#runScript').on('click', function() {
    $('ul.lux-stripe-tabs li').click(function(){
		$('ul.lux-stripe-tabs li').removeClass('current');
		$('.adr2-temp-content').removeClass('current');

		$(this).addClass('current');
		$('#' + this.id + '-content').addClass('current');
	})
});