//general variables
let type, colors = '', image = [''], lHead = [''], sHead = [''], tempCode = '';

//post variables
let temp_post, tag = [''];

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;

//tracker variables
let thread = [0], tYears = [], tMonths = [], threads = [], tracking;

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns;


//Show/Hide Basic Fields
showhide('image', 'ifImg');
showhide('lh', 'ifLH');
showhide('sh', 'ifSH');
showhide('nt', 'ifNT');


//Set Variables
function setValues() {

    //set image
    fromRadio('image', image, '<ib><img src="', '"></ib>\n\n');
    fromRadio('lh', lHead, '<h1>', '</h1>\n\n');
    fromRadio('sh', sHead, '<h2>', '</h2>\n\n');
    fromRadio('nt', tag, '<tag>', '</tag>\n\n');
    type = $('input[name="type"]:checked').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents($('#eventCount').val(), years, months, events, type, 'ev');
    } else if (type == 'tracker') {
        tracking = orderEvents($('#eventCount').val(), tYears, tMonths, threads, type, 'post');
    } else if (type == 'imagedev') {

    }


    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<song><i class="fas fa-play"></i>\n<b>' + $(this).val() + '</b><span>' + $(this).next().val() + '</span></song>\n';
    });

    //set quote details
    quote = $('#quoteBody').val();
    source = '<tag>— ' + $('input[name="quoteSource"]').val() + '</tag>';

    //set up color styles
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>.' +
                        $('input[name="char"]').val() +
                        ' {--accent: ' +
                        $("#accent").spectrum("get").toHexString() +
                        '; --dkAccent: ' +
                        $("#dkAccent").spectrum("get").toHexString() +
                        ';}</style>';
    }
}


//Build Complex Content
function buildTimeline (yearArray, monthArray, eventArray) {  
    console.log(yearArray);  
    for (var i = 0; i < yearArray.length; i++) {
        monthArray.sort();
        var tempYear = '<section><year>\n' + yearArray[i] + '\n</year><events>\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            console.log(monthArray[i][j]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<b>January</b>\n';
                    break;
                case '2':
                    tempYear += '<b>February</b>\n';
                    break;
                case '3':
                    tempYear += '<b>March</b>\n';
                    break;
                case '4':
                    tempYear += '<b>April</b>\n';
                    break;
                case '5':
                    tempYear += '<b>May</b>\n';
                    break;
                case '6':
                    tempYear += '<b>June</b>\n';
                    break;
                case '7':
                    tempYear += '<b>July</b>\n';
                    break;
                case '8':
                    tempYear += '<b>August</b>\n';
                    break;
                case '9':
                    tempYear += '<b>September</b>\n';
                    break;
                case '10':
                    tempYear += '<b>October</b>\n';
                    break;
                case '11':
                    tempYear += '<b>November</b>\n';
                    break;
                case '12':
                    tempYear += '<b>December</b>\n';
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
                    tempYear += '<event>' + $(this).val() + '</event>\n';
                }
            });
        }
        tempYear += '</events></section>';
        eventArray.push(tempYear);
    }
    var eventList = '';
    for (var i = 0; i < eventArray.length; i++) {
        eventList += eventArray[i];
    }
    return eventList;
}

function buildTracker (yearArray, monthArray, eventArray) {
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var tempThread = '', currMonth = '';   
        for (var j = 0; j < monthArray[i].length; j++) {   
            $('.tracker .title').each(function() {
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).next().next().next().next().next().val().replace('0', '');
                } else {
                    simpMonth = $(this).next().next().next().next().next().val();
                }
                
                if(     $(this).next().next().next().next().val() == yearArray[i] &&
                        simpMonth == monthArray[i][j].split('-')[2]
                ) {

                    switch(monthArray[i][j].split('-')[2]) {
                        case '01':
                        case '1':
                            currMonth = 'January';
                            break;
                        case '02':
                        case '2':
                            currMonth = 'February';
                            break;
                        case '03':
                        case '3':
                            currMonth = 'March';
                            break;
                        case '04':
                        case '4':
                            currMonth = 'April';
                            break;
                        case '05':
                        case '5':
                            currMonth = 'May';
                            break;
                        case '06':
                        case '6':
                            currMonth = 'June';
                            break;
                        case '07':
                        case '7':
                            currMonth = 'July';
                            break;
                        case '08':
                        case '8':
                            currMonth = 'August';
                            break;
                        case '09':
                        case '9':
                            currMonth = 'September';
                            break;
                        case '10':
                            currMonth = 'October';
                            break;
                        case '11':
                            currMonth = 'November';
                            break;
                        case '12':
                            currMonth = 'December';
                            break;
                        default:
                            console.log('no month');
                            break;
                    }
                    
                    if($(this).next().next().children(':selected').val() == 'ip') {
                        //in progress
                        tempThread += '<thread><i class="far fa-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                    } else if ($(this).next().next().children(':selected').val() == 'c') {
                        //complete
                        tempThread += '<thread><i class="far fa-check-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                    } else if ($(this).next().next().children(':selected').val() == 'ic') {
                        //incomplete
                        tempThread += '<thread><i class="far fa-times-square"></i><div>\n<a href="?showtopic=' + $(this).next().val() + '"><b>' + $(this).val() + '</b></a> ft. ' + $(this).next().next().next().val() + '</div>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                    }
                }
            });
        }
        eventArray.push(tempThread);
    }
    var threadList = '';
    for (var i = 0; i < eventArray.length; i++) {
        threadList += eventArray[i];
    }
    return threadList;
}


//Build Final Content
function setPostCode() {
    var code =     '<span class="' +
                    $('input[name="char"]').val() +
                    '"><div class="sslp-wrap">' + '\n\n' +
                    image +
                    lHead +
                    sHead +
                    '<div class="sslp-scroll">' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    '</div>' + '\n\n' +
                    tag +
                    '</div></span><link href="//dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                    colors;
    return code;
}

function setTrackerCode() {
    var code =  '<span class="scroll ' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap tracker">' + '\n\n' +
                image +
                lHead +
                sHead +
                '<div class="sslp-scroll">' + '\n\n' + 
                tracking + '\n\n' +
                '</div>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setImageCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap">' + '\n\n' + 
                image +
                lHead +
                sHead +
                '<span class="imgdev col' + columns + '">' + '\n\n' +
                images + '\n\n' +
                '</span>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setPlaylistCode() {
    var code =  '<span class="scroll ' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap playlist">' + '\n\n' +
                image +
                lHead +
                sHead +
                '<div class="sslp-scroll">' + '\n\n' + 
                songs + '\n\n' +
                '</div>' + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setQuoteCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap quote">' + '\n\n' +
                image +
                lHead +
                sHead +
                quote + '\n\n' +
                source + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}

function setTimelineCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="sslp-wrap timeline">' + '\n\n' +
                image +
                lHead +
                sHead +
                timeline + '\n\n' +
                '</div></span><link href="https://dawneggleton.github.io/jcink-temps/sslp/base.css" rel="stylesheet"><link href="https://dawneggleton.github.io/jcink-temps/sslp/characters.css" rel="stylesheet">' +
                colors;
    return code;
}