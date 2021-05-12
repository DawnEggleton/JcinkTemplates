//general variables
let type, colors, lHead = [''], sHead = [''], tempCode = '', tabs = 0;

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;


//Show/Hide Basic Fields
showhide('lh', 'ifLH');
showhide('sh', 'ifSH');

//Show/Hide Complex Fields
var tabHTML = ['<span class="twoCol altCol"><input id="tabTitle', '" placeholder="Tab Title" /><textarea id="tabText', '"placeholder="Tab Contents"></textarea></span>'];
addFields('tabCount', tabHTML, 'tabContents');

var eventHTML = ['<input type="text" name="ev', '" class="year" placeholder="YYYY" /><input type="text" name="ev', '" class="month" placeholder="MM" /><input type="text" name="ev', '" class="event" placeholder="Event" />'];
addFields('eventCount', eventHTML, 'eventContent');


//Create Flexible Fields
function addFieldSet(fieldVar, fieldType) {
    switch(fieldType) {
        case 'event':
            $('.ifTime span.timeline').append('<input type="text" name="ev' + fieldVar + '" class="year" placeholder="YYYY" /><input type="text" name="ev' + fieldVar + '" class="month" placeholder="MM" /><input type="text" name="ev' + fieldVar + '" class="event" placeholder="Event" />');
            break;
    }  
}


//Set Variables
function setValues() {

    //set image
    fromRadio('sh', sHead, '', '');
    fromRadio('lh', lHead, '', '');
    type = $('input[name="type"]:checked').val();
    tabs = $('#tabCount').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents($('#eventCount').val(), years, months, events, type, 'ev');
    }

    //set up color styles
    
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>' +
                        '.' + $('input[name="char"]').val() + ' .lux-moments' +
                        ' {--accent: ' +
                        $('input[name="accent"]').spectrum("get").toHexString() +
                        '; --ltAccent: ' +
                        $('input[name="ltAccent"]').spectrum("get").toHexString() +
                        '}</style>';
    }
}


//Build Complex Content
function buildTimeline (yearArray, monthArray, eventArray) {    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray.sort();
        var tempYear = '<div class="temp-timeline"><div class="time-line"></div><div class="time-dot">\n' + yearArray[i] + '\n</div><div class="time-content">\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<h4>January</h4>\n';
                    break;
                case '2':
                    tempYear += '<h4>February</h4>\n';
                    break;
                case '3':
                    tempYear += '<h4>March</h4>\n';
                    break;
                case '4':
                    tempYear += '<h4>April</h4>\n';
                    break;
                case '5':
                    tempYear += '<h4>May</h4>\n';
                    break;
                case '6':
                    tempYear += '<h4>June</h4>\n';
                    break;
                case '7':
                    tempYear += '<h4>July</h4>\n';
                    break;
                case '8':
                    tempYear += '<h4>August</h4>\n';
                    break;
                case '9':
                    tempYear += '<h4>September</h4>\n';
                    break;
                case '10':
                    tempYear += '<h4>October</h4>\n';
                    break;
                case '11':
                    tempYear += '<h4>November</h4>\n';
                    break;
                case '12':
                    tempYear += '<h4>December</h4>\n';
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
                    tempYear += '<blockquote>' + $(this).val() + '</blockquote>\n';
                }
            });
        }
        tempYear += '</div></div>';
        eventArray.push(tempYear);
    }
    var eventList = '';
    for (var i = 0; i < eventArray.length; i++) {
        eventList += eventArray[i];
    }
    return eventList;
}


//Build Final Content

function setPostCode() {
    if($('input[name="scrolling"]:checked').val() == 'y') {
        var code =     '<span class="' +
                        $('input[name="char"]').val() +
                        '"><div class="lux-moments"><div class="temp-container temp-' + 
                        $('#tempSize :checked').val() +
                        ' template"><div class="temp-header"><div class="temp-title">' + '\n\n' +
                        $('#lhText').val() + '\n\n' +
                        '</div><div class="temp-subtitle">' + '\n\n' +
                        sHead + '\n\n' +
                        '</div></div><div class="temp-content"><div class="temp-scroll">' + '\n\n' + 
                        $('#postText').val() + '\n\n' +
                        '</div></div></div></div></span><link href="//dawneggleton.github.io/jcink-temps/moments/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/moments/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' +
                        colors;
    } else {
        var code =     '<span class="' +
                        $('input[name="char"]').val() +
                        '"><div class="lux-moments"><div class="temp-container temp-' + 
                        $('#tempSize :checked').val() +
                        ' template"><div class="temp-header"><div class="temp-title">' + '\n\n' +
                        $('#lhText').val() + '\n\n' +
                        '</div><div class="temp-subtitle">' + '\n\n' +
                        sHead + '\n\n' +
                        '</div></div><div class="temp-content">' + '\n\n' + 
                        $('#postText').val() + '\n\n' +
                        '</div></div></div></span><link href="//dawneggleton.github.io/jcink-temps/moments/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/moments/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' +
                        colors;
    }
    return code;
}

function setTabbedCode() {
    console.log(tabs);
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="lux-moments"><div class="temp-container-tabbed temp-' + 
                $('#tempSize :checked').val() +
                ' template"><div class="temp-header"><div class="temp-title">' + '\n\n' + 
                lHead + '\n\n' + 
                '</div><div class="temp-subtitle">' + '\n\n' + 
                sHead + '\n\n' +
                '</div></div><div class="temp-tabs">\n';


    //do tab labels
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        console.log('start: ' + code);
        if (i == 0) {
            code += '<span class="mom-active" id="' + label + '"></span>';
        } else {
            code += '<span id="' + label + '"></span>';
        }
        console.log('end: ' + code);
    }

    code += '</div>';
    
    //code tabs
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<div class="temp-content mom-active" id="' + label + '-content"><div class="temp-scroll">' + $('#tabText' + i).val() + '</div></div>';
        } else {
            code += '<div class="temp-content" id="' + label + '-content"><div class="temp-scroll">' + $('#tabText' + i).val() + '</div></div>';
        }
    }
    
    code += '</div></div></span><link href="//dawneggleton.github.io/jcink-temps/moments/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/moments/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' + colors;
    return code;
}

function setTimelineCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="lux-moments"><div class="temp-container temp-' +
                $('#tempSize :checked').val() + 
                ' template"><div class="temp-header"><div class="temp-title">' + '\n\n' +
                lHead + '\n\n' +
                '</div><div class="temp-subtitle">' + 
                sHead + 
                '</div></div><div class="temp-content">' + 
                timeline + 
                '</div></div></div></span><link href="//dawneggleton.github.io/jcink-temps/moments/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/moments/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' +
                colors;
    return code;
}


$('#runScript').on('click', function() {
    $('.lux-moments .temp-tabs span').on('click', function() {
        $('.lux-moments .temp-tabs span').removeClass('mom-active');
        $('.lux-moments .temp-tabs ~ .temp-content').removeClass('mom-active');
        $('#' + this.id + '-content').addClass('mom-active');
        $(this).addClass('mom-active');
    });
});