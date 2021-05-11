//general variables
let type, colors = '', image = [''], lHead = [''], sHead = [''], tempCode = '', idHead = [''];

//post variables
let temp_post, tag = [''], messages;

//timeline variables
let tevent = [0], years = [], months = [], events = [], timeline;

//tracker variables
let thread = [0], tYears = [], tMonths = [], threads = [], tracking;

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns;


//Show/Hide Basic Fields
showhide('psc', 'ifPostScroll');
showhide('tabsc', 'ifTabScroll');


$('input[name="tinType"]').change(function () {
    if($(this).val() == 'tinP') {
        $('.ifTinP').show();
        $('.ifTinM').hide();
        $('.ifTinO').hide();
    } else if($(this).val() == 'tinM') {
        $('.ifTinP').hide();
        $('.ifTinM').show();
        $('.ifTinO').hide();
    } else if($(this).val() == 'tinO') {
        $('.ifTinP').hide();
        $('.ifTinM').hide();
        $('.ifTinO').show();
    } else {
        $('.ifTinP').hide();
        $('.ifTinM').hide();
        $('.ifTinO').hide();
    }
});
$('input[name="igType"]').change(function () {
    if($(this).val() == 'igP') {
        $('.ifIGP').show();
        $('.ifIGNP').hide();
        $('.ifIGC').hide();
    } else if($(this).val() == 'igNP') {
        $('.ifIGP').hide();
        $('.ifIGNP').show();
        $('.ifIGC').hide();
    } else if($(this).val() == 'igC') {
        $('.ifIGP').hide();
        $('.ifIGNP').hide();
        $('.ifIGC').show();
    } else {
        $('.ifIGP').hide();
        $('.ifIGNP').hide();
        $('.ifIGC').hide();
    }
});

var charHTML = ['<span class="twoCol altCol"><span><select name="wantGroup', '"><option value="">Group Not Decided</option><option value="deity">Deity</option><option value="creature">Creature</option><option value="spirit">Spirit</option><option value="gifted">Gifted</option><option value="mortal">Mortal</option></select><input id="charName', '" placeholder="Section Title" style="margin-top: 10px;" /><input id="charImg', '" placeholder="Section Image" style="margin-top: 10px;" /><input id="charDeets', '" placeholder="Section Details" style="margin-top: 10px;" /></span><textarea id="charText', '"placeholder="Section Contents"></textarea></span>'];
addFields(charCount, 'charCount', charHTML, 'wantContents');

//Set Variables
function setValues() {

    //set image
    //fromRadio('lh', lHead, '', '');
    type = $('input[name="type"]:checked').val();

    //timeline vs tracker
    if(type == 'timeline') {
        timeline = orderEvents($('#eventCount').val(), years, months, events, type, 'ev');
    } else if (type == 'tracker') {
        tracking = orderEvents($('#eventCount').val(), tYears, tMonths, threads, type, 'post');
    }

    //set phone messages
    messages = '';
    $('.message').each(function() {
        messages += '<div class="bs-phoneMsg">' + $(this).val() + '</div>\n';
    });

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<div class="cell-msg"><span>\n<b>' + $(this).val() + '</b><i>' + $(this).next().val() + '</i></span></div>\n';
    });

    //set up color styles
    
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>' +
                        '.' + $('input[name="char"]').val() + ' .temp-wrap,' +
                        '.' + $('input[name="char"]').val() + ' .cell-wrap,' +
                        '.' + $('input[name="char"]').val() + ' .tindr-wrap,' +
                        '.' + $('input[name="char"]').val() + ' .insta-wrap,' +
                        '.' + $('input[name="char"]').val() + ' .insta-smlWrap,' +
                        '.' + $('input[name="char"]').val() + '.md-charWrap' +
                        ' {--dkAccent: ' +
                        $('input[name="dkAccent"]').spectrum("get").toHexString() +
                        '; --accent: ' +
                        $('input[name="accent"]').spectrum("get").toHexString() +
                        '; --textAccent: ' +
                        $('input[name="textAccent"]').spectrum("get").toHexString() +
                        ';}</style>';
    }
}


//Build Complex Content
function buildTimeline (yearArray, monthArray, eventArray) {    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray.sort();
        var tempYear =  '<div class="temp-sectWrap"><div class="temp-fancyTop"><div class="temp-fancyTitle">\n' +
                        yearArray[i] + '\n</div><span></span></div>\n';
        for (var j = 0; j < monthArray[i].length; j++) {
            console.log(monthArray[i]);
            switch(monthArray[i][j].split('-')[2]) {
                case '1':
                    tempYear += '<div class="temp-lineTitle">January</div>\n';
                    break;
                case '2':
                    tempYear += '<div class="temp-lineTitle">February</div>\n';
                    break;
                case '3':
                    tempYear += '<div class="temp-lineTitle">March</div>\n';
                    break;
                case '4':
                    tempYear += '<div class="temp-lineTitle">April</div>\n';
                    break;
                case '5':
                    tempYear += '<div class="temp-lineTitle">May</div>\n';
                    break;
                case '6':
                    tempYear += '<div class="temp-lineTitle">June</div>\n';
                    break;
                case '7':
                    tempYear += '<div class="temp-lineTitle">July</div>\n';
                    break;
                case '8':
                    tempYear += '<div class="temp-lineTitle">August</div>\n';
                    break;
                case '9':
                    tempYear += '<div class="temp-lineTitle">September</div>\n';
                    break;
                case '10':
                    tempYear += '<div class="temp-lineTitle">October</div>\n';
                    break;
                case '11':
                    tempYear += '<div class="temp-lineTitle">November</div>\n';
                    break;
                case '12':
                    tempYear += '<div class="temp-lineTitle">December</div>\n';
                    break;
                default:
                    console.log('no month');
                    break;
            }
            tempYear += '<div class="temp-body">';
            $('.event').each(function () {
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).prev().val().replace('0', '');
                } else {
                    simpMonth = $(this).prev().val();
                }
                if($(this).prev().prev().val() == yearArray[i] && simpMonth == monthArray[i][j].split('-')[2]) {
                    tempYear += '' + $(this).val() + '<p>\n';
                }
            });
            tempYear += '</div>';
        }
        tempYear += '</div>';
        eventArray.push(tempYear);
    }
    var eventList = '';
    for (var i = 0; i < eventArray.length; i++) {
        eventList += eventArray[i];
    }
    return eventList;
}

function buildTracker (yearArray, monthArray, eventArray) {
    var tempThread = '';
    tempThread += '<div class="temp-sectWrap"><div class="temp-fancyTop2"><div class="temp-fancyTitle">active</div><span></span></div><div class="temp-body temp-track">';    
    if ($('input[name="tsc"]:checked').val() == 'y') {
        tempThread += '<div class="scroll pad20">' + '\n\n';
    } else {
        tempThread += '\n\n';
    }
    
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var currMonth = '';   
        for (var j = 0; j < monthArray[i].length; j++) {             
            $('.tracker .title').each(function() { 
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).next().next().next().next().next().val().replace('0', '');
                } else {
                    simpMonth = $(this).next().next().next().next().next().val();
                }

                if(     $(this).next().next().next().next().val() == yearArray[i] &&
                        simpMonth == monthArray[i][j].split('-')[2] &&
                        $(this).next().next().children(':selected').val() == 'ip'
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
                    
                    tempThread += '<thread><a href="?showtopic=' + $(this).next().val() + '">' + $(this).val() + '</a>\n<i>featuring ' + $(this).next().next().next().val() + '</i>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                }
            }); 
        }
    }    
    if ($('input[name="tsc"]:checked').val() == 'y') {
        tempThread += '</div>';
    } else {
        tempThread += '\n\n';
    }
    tempThread += '</div></div>';
    tempThread += '<div class="temp-sectWrap"><div class="temp-fancyTop2"><div class="temp-fancyTitle">archived</div><span></span></div><div class="temp-body temp-track">';    
    if ($('input[name="tsc"]:checked').val() == 'y') {
        tempThread += '<div class="scroll pad20">' + '\n\n';
    } else {
        tempThread += '\n\n';
    }
    for (var i = 0; i < yearArray.length; i++) {
        monthArray[i].sort();
        var currMonth = '';   
        for (var j = 0; j < monthArray[i].length; j++) {                      
            $('.tracker .title').each(function() {    
                var simpMonth;                
                if(monthArray[i][j].split('-')[2] != '10') {
                    simpMonth = $(this).next().next().next().next().next().val().replace('0', '');
                } else {
                    simpMonth = $(this).next().next().next().next().next().val();
                }
                if(     $(this).next().next().next().next().val() == yearArray[i] &&
                        simpMonth == monthArray[i][j].split('-')[2] &&
                        ($(this).next().next().children(':selected').val() == 'c' || $(this).next().next().children(':selected').val() == 'ic')
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
                    
                    tempThread += '<thread><a href="?showtopic=' + $(this).next().val() + '">' + $(this).val() + '</a>\n<i>featuring ' + $(this).next().next().next().val() + '</i>\n<span>' + currMonth + ' ' + yearArray[i] + '. ' + $(this).next().next().next().next().next().next().val() + '. ' + $(this).next().next().children(':selected').text() + '.</span></thread>';
                }
            });  
        }
    }    
    if ($('input[name="tsc"]:checked').val() == 'y') {
        tempThread += '\n\n</div>';
    } else {
        tempThread += '\n\n';
    }
    tempThread += '</div></div>';
    return tempThread;
}


//Build Final Content
function setPostCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="psc"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top">' + '\n\n';
    code += $('#postTitle').val() + '\n\n';
    code += '</div><div class="temp-content"><div class="scroll">' + '\n\n';
    code += $('#postText').val() + '\n\n';
    code += '</div></div><div class="temp-bottom">' + '\n\n';
    code += $('#postTag').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTabbedCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="tabsc"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top2">';
    code += $('#tabsTitle').val();
    code += '</div><div class="temp-tabs"><div class="temp-menu"><div class="temp-menuInner">' + '\n\n';
    for (var i = 0; i < $('#tabCount').val(); i++) {
        if (i == 0) {
            code += '<span id="tab-' + i + '" class="tempActive" title="' + $('#tabTitle' + i).val() + '">' + $('#tabTitle' + i).val() + '<div></div></span>\n';
        } else {
            code += '<span id="tab-' + i + '" title="' + $('#tabTitle' + i).val() + '">' + $('#tabTitle' + i).val() + '<div></div></span>\n';
        }
    }
    code += '</div></div><div class="temp-content">' + '\n\n';
    for (var i = 0; i < $('#tabCount').val(); i++) {
        if (i == 0) {
            code += '<div id="tab-' + i + '-content" class="scroll tempActive">' + '\n\n' + $('#tabText' + i).val() + '\n\n' + '</div>\n';
        } else {
            code += '<div id="tab-' + i + '-content" class="scroll">' + '\n\n' + $('#tabText' + i).val() + '\n\n' + '</div>\n';
        }
    }
    code += '\n\n</div></div><div class="temp-bottom2">' + '\n\n';
    code += $('#tabsNotes').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setWantedCode () {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top2">' + '\n\n';
    code += $('#wantTitle').val() + '\n\n';
    code += '</div><div class="temp-content">' + '\n\n';
    for (var i = 0; i < $('#charCount').val(); i++) {
        code +='<div class="md-charWrap ' + $('select[name="wantGroup' + i + '"]').val();
        code += '"><div class="md-charTop"><div class="md-img">\n<img src="' + $('#charImg' + i).val();
        code += '">\n</div><div class="md-name"><a>\n' + $('#charName' + i).val();
        code += '\n</a><span></span></div></div><div class="md-info">\n' + $('#charDeets' + i).val();
        code += '\n</div><div class="md-desc"><div class="scroll pad20">\n' + $('#charText' + i).val();
        code += '\n</div></div></div>';
    }
    code += '\n\n</div><div class="temp-bottom2">' + '\n\n';
    code += $('#wantNotes').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPhoneCode () {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="cell-wrap"><div class="cell-top">\n';
    code += $('#phoneTime').val();
    code += '\n<span style="float: right;"><i class="fad fa-signal"></i> <i class="fad fa-wifi"></i> <i class="far fa-battery-full"></i></span></div><div class="cell-content">' + '\n\n';
    for (var i = 0; i < $('#msgCount').val(); i++) {
        code += '<div class="cell-msg"><span>' + $('#msg' + i).val() + '</span></div>\n';
    }
    code += '\n\n</div><div class="cell-imgWrap"><div class="cell-img"><img src="';
    code += $('#phoneImg').val();
    code += '"></div><span>\nto ';
    code += $('#phoneTag').val();
    code += '\n</span></div><div class="cell-bottom">';
    if ($('input[name="phoneType"]:checked').val() == 'text' ) {
        code += 'message sent!';
    } else if ($('input[name="phoneType"]:checked').val() == 'call' ) {
        code += 'currently calling...';
    } 
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTindrCode () {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    if ($('input[name="tinType"]:checked').val() == 'tinP') {
        //profile
        code += '<div class="tindr-wrap">\n<img src="';
        code += $('#tinPImg').val();
        code += '">\n<div class="tindr-content">\n<b>';
        code += $('#tinPName').val();
        code += ' \n<span>' + $('#tinPAge').val() + '</span></b>\n<i class="fal fa-briefcase"> ';
        code += $('#tinPJob').val();
        code += '</i>\n<div class="scroll pad20">' + '\n\n';
        code += $('#tinPBio').val() + '\n\n';
        code += '</div></div></div>';
    } else if ($('input[name="tinType"]:checked').val() == 'tinM') {
        //message
        code += '<div class="tindr-wrap"><div class="tindr-msgTop"><div class="tindr-img">\n<img src="';
        code += $('#tinMImg').val();
        code += '">\n</div>\n<b>';
        code += $('#tinMName').val();
        code += '</b>\n</div><div class="tindr-content"><div class="scroll pad20">' + '\n\n';
        code += $('#tinMMsg').val() + '\n\n';
        code += '</div></div></div>';
    } else if ($('input[name="tinType"]:checked').val() == 'tinO') {
        //swipe
        code += '<a href="' + $('#tinOURL').val();
        code += '"><div class="tindr-wrap"><div class="tindr-content"><div class="scroll pad20"><b>' + '\n\n';
        code += $('#tinOMsg').val() + '\n\n';
        code += '</b></div></div></div></a>';
    }
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setInstaCode () {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    if ($('input[name="igType"]:checked').val() == 'igP') {
        //profile
        code += '<div class="insta-wrap"><div class="insta-top"><div class="insta-imgTop">\n<img src="';
        code += $('#igPImg').val();
        code += '">\n</div><b>\n';
        code += $('#igPName').val();
        code += '\n</b><div class="insta-stats"><span>\n<b>';
        code += $('#igPPosts').val();
        code += '</b> posts\n</span><span>\n<b>';
        code += $('#igPFollowers').val();
        code += '</b> followers\n</span><span>\n<b>';
        code += $('#igPFollowing').val();
        code += '</b> following\n</span></div><div class="insta-bio">\n';
        code += $('#igPBio').val() + '\n';
        code += '</div></div><div class="insta-grid">' + '\n\n';
        for (var i = 0; i < 9; i++) {
            code += '<img src="' + $('input[name="igPI' + i + '"]').val() + '">\n';
        }
        code += '\n</div></div>';
    } else if ($('input[name="igType"]:checked').val() == 'igNP') {
        //new post
        code += '<div class="insta-smlWrap"><div class="insta-postImg">\n<img src="';
        code += $('#igNPImg').val();
        code += '">\n</div><div class="insta-smlContent"><i>liked by \n<b>';
        code += $('#igNPLike').val();
        code += '</b> and <b>';
        code += $('#igNPLikeNum').val();
        code += ' others</b>\n</i><div class="scroll pad20"><span>' + '\n\n';
        for (var i = 0; i < $('#commCount').val(); i++) {
            code += '<b>' + $('#igNPCName' + i).val() + '</b> ' + $('#igNPCText' + i).val() + '<p>\n';
        }
        code += '\n</span></div></div></div>';
    } else if ($('input[name="igType"]:checked').val() == 'igC') {
        //comment
        code += '<div class="insta-smlWrap"><div class="insta-smlContent"><div class="scroll pad20">\n\n<b>';
        code += $('#igCName').val();
        code += '</b> ';
        code += $('#igCText').val();
        code += '\n\n</div></div></div>';
    }
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTimelineCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top2">' + '\n\n';
    code += $('#timeTitle').val() + '\n\n';
    code += '</div><div class="temp-content">' + '\n\n';
    code += timeline;
    code += '\n\n</div><div class="temp-bottom2">' + '\n\n';
    code += $('#timeNotes').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTrackerCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top2">' + '\n\n';
    code += $('#trackTitle').val() + '\n\n';
    code += '</div><div class="temp-content">' + '\n\n';
    code += tracking;
    code += '\n\n</div><div class="temp-bottom2">' + '\n\n';
    code += $('#trackNotes').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setImageCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += $('input[name="cols"]:checked').val();
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap"><div class="temp-top">' + '\n\n';
    code += $('#imgTitle').val() + '\n\n';
    code += '</div><div class="temp-content temp-grid">' + '\n\n';
    code += images;
    code += '\n\n</div><div class="temp-bottom">' + '\n\n';
    code += $('#imgNotes').val() + '\n\n';
    code += '</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPlaylistCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="cell-wrap"><div class="cell-top">' + '\n\n';
    code += $('#musicTime').val() + '\n\n';
    code += '<span style="float: right;"><i class="fad fa-signal"></i> <i class="fad fa-wifi"></i> <i class="far fa-battery-full"></i></span></div><div class="cell-content cell-playlist">' + '\n\n';
    code += songs;
    code += '\n\n</div><div class="cell-imgWrap"><div class="cell-img">\n<img src="';
    code += $('#musicImg').val();
    code += '">\n</div><span>\n<a href="';
    code += $('#musicLink').val();
    code += '" target="_blank">listen</a>\n</span></div><div class="cell-bottom">now playing</div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setQuoteCode() {
    var code = '';
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    } else if  ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += $('select[name="groupColor"]').val();
    }
    code += $('select[name="tempSize"]').val() + ' ';
    code += $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'darkMode ';
    }
    code += '">';
    
    //content starts
    code += '<div class="temp-wrap temp-quote"><div class="temp-top"></div><div class="temp-content">' + '\n\n';
    code += $('#quoteBody').val() + '\n';
    code += '<qs>&mdash; ';
    code += $('#quoteSource').val();
    code += '</qs>\n\n</div><div class="temp-bottom"></div></div>';
    //content ends
    
    code += '</span>';
    
    code += '<link href="//dawneggleton.github.io/jcink-temps/blacksands/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/blacksands/characters.css" rel="stylesheet">' + colors;
    return code;
}


$('#runScript').on('click', function() {
    $('.temp-menuInner span').on('click', function() {
        $('.temp-menuInner span').removeClass('tempActive');
        $('.temp-tabs .scroll').removeClass('tempActive');
        $(this).addClass('tempActive');
        $(this).parent().parent().parent().children('.temp-content').children('#' + this.id + '-content').addClass('tempActive');
    });
});