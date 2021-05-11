//general variables
let type, colors, image = [''], lHead = [''], sHead = [''], tempCode = '', idHead = [''];

//post variables
let temp_post, tag = [''];

//dev variables
let imageNum = [0], songNum = [0], quote, source, images, songs, columns, wanteds = '', wantTabs = '';


//Show/Hide Basic Fields
showhide('sc', 'ifScroll');

//Show/Hide Complex Fields

var charHTML = ['<span class="twoCol altCol"><span><input id="charName', '" placeholder="Section Title" /><input id="charImg', '" placeholder="Section Image" style="margin-top: 20px;" /><input id="charDeets', '" placeholder="Section Details" style="margin-top: 20px;" /></span><textarea id="charText', '"placeholder="Section Contents"></textarea></span>'];
addFields(charCount, 'charCount', charHTML, 'wantContents');


//Set Variables
function setValues() {

    //set image
    //fromRadio('lh', lHead, '', '');
    type = $('input[name="type"]:checked').val();

    //set wanted
    wanteds = '';
    if($('input[name="wt"]:checked').val() == 'y') {
        for(var i = 0; i < $('#charCount').val(); i++) {
            if(i != 0) {
                wanteds += '\n\n<divider></divider>\n\n';
            }
            wanteds +=    '<div class="sl-tempChar">\n<img src="' +
                        $('#charImg' + i).val() +
                        '">\n<b class="tag">' +
                        $('#charName' + i).val() +
                        '</b>\n<span>' +
                        $('#charDeets' + i).val() +
                        '</span>\n</div><div class="sl-tempScroll">\n' +
                        $('#charText' + i).val() +
                        '\n</div>';
        }        
    } else if ($('input[name="wt"]:checked').val() == 'n') {
        for(var i = 0; i < $('#charCount').val(); i++) {
            if (i == 0) {
                wantTabs += '<span id="tab' + 
                            i +
                            '" class="sl-activeTab"><img src="' + 
                            $('#charImg' + i).val() + 
                            '" title="' + 
                            $('#charName' + i).val() + 
                            '"></span>';
                wanteds +=  '<div id="tab' + 
                            i +
                            '-content" class="sl-tempScroll sl-tempTabCont sl-activeTab">\n' +
                            '<h1>' +
                            $('#charName' + i).val() +
                            '</h1>\n<h2>' +
                            $('#charDeets' + i).val() +
                            '</h2>\n' +
                            $('#charText' + i).val() +
                            '</div>';
            } else {
                wantTabs += '<span id="tab' + 
                            i +
                            '"><img src="' + 
                            $('#charImg' + i).val() + 
                            '" title="' + 
                            $('#charName' + i).val() + 
                            '"></span>';
                wanteds +=  '<div id="tab' + 
                            i +
                            '-content" class="sl-tempScroll sl-tempTabCont">' +
                            '\n<h1>' +
                            $('#charName' + i).val() +
                            '</h1>\n<h2>' +
                            $('#charDeets' + i).val() +
                            '</h2>\n' +
                            $('#charText' + i).val() +
                            '</div>';
            }
        }      
    }

    //set image dev
    columns = $('input[name="cols"]:checked').val();
    images = setImageDev('i');
    
    //set song dev
    songs = '';
    $('.songTitle').each(function() {
        songs += '<div class="sl-tempSong"><i class="fas fa-play"></i>\n<b>' + $(this).val() + '</b><span>' + $(this).next().val() + '</span></div>\n';
    });

    //set quote dev
    quote = '<quote>' + $('#quoteBody').val() + '</quote>\n<qSource>' + $('#quoteSource').val() + '</qSource>';

    //set up color styles
    var accentArr = hexToRgb($('input[name="dullAccent"]').spectrum("get").toHexString().split('#')[1]);
    var accent70 = 'rgba(' + accentArr.r + ', ' + accentArr.g + ', ' + accentArr.b + ', 0.7)';
    var accent35 = 'rgba(' + accentArr.r + ', ' + accentArr.g + ', ' + accentArr.b + ', 0.35)';
    
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>' +
                        '.' + $('input[name="char"]').val() + ' .sl-tempWrap' +
                        ' {--dullAccent-70: ' +
                        accent70 +
                        '; --dullAccent-35: ' +
                        accent35 +
                        '; --brightAccent: ' +
                        $('input[name="brightAccent"]').spectrum("get").toHexString() +
                        ';}.' + $('input[name="char"]').val() +
                        ' .sl-tempBox {border-color: var(--brightAccent);}</style>';
    }
}


//Build Final Content
function setGeneralCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">' + '\n\n';
    code += $('#genText').val() + '\n\n';
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPostCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempChar">\n<img src="';
    code += $('#postImage').val();
    code += '">\n<b class="tag">';
    code += $('#postTag').val();
    code += '</b>\n<span>';
    code += $('#postLyrics').val();
    code += '</span>\n</div><divider></divider><div class="sl-tempScroll">' + '\n\n';
    code += $('#postText').val() + '\n\n';
    code += '</div></div></div></div>';

    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setTabbedCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempTab"><div class="sl-tempTabs"><div class="sl-sticky">\n';
    for(var i = 0; i < $('#tabCount').val(); i++) {
        console.log('tab ' + i);
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<span id="' + label + '" class="sl-activeTab">' + $('#tabTitle' + i).val() + '</span>\n';
        } else {
            code += '<span id="' + label + '">' + $('#tabTitle' + i).val() + '</span>\n';
        }
    }
    code += '<div style="clear:both;"></div></div></div>' + '\n\n';
    for(var i = 0; i < $('#tabCount').val(); i++) {
        var labelArr = $('#tabTitle' + i).val().split(' ');
        var label = '';
        for (var h = 0; h < labelArr.length; h++) {
            label += '' + labelArr[h];
        }
        if(i == 0) {
            code += '<div id="' + label + '-content" class="sl-tempScroll sl-tempTabCont sl-activeTab">\n' + $('#tabText' + i).val() + '\n</div>\n';
        } else {
            code += '<div id="' + label + '-content" class="sl-tempScroll sl-tempTabCont">\n' + $('#tabText' + i).val() + '\n</div>\n';
        }
    }
    code += '\n</div></div></div></span>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setWantedCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempWant">' + '\n\n';
        code += wanteds + '\n\n';
        code += '</div></div></div></span>';
    } else {
        code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempTab sl-tempWantTab"><div class="sl-tempTabs"><div class="sl-sticky">\n';
        code += wantTabs;
        code += '\n<div style="clear:both;"></div></div></div>' + '\n\n';
        code += wanteds + '\n\n';
        code += '</div></div></div>';
    }
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setPlaylistCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap sl-tempPlay"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">' + '\n\n';
    code += songs + '\n\n';
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setImageCode() {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += $('input[name="cols"]:checked').val();
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent"><div class="sl-tempScroll">' + '\n\n';
    code += images + '\n\n';
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}

function setQuoteCode () {
    var code = '';
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '<' + $('select[name="groupColor"]').val() + '>';
    }
    code += '<span class="';
    if ($('input[name="tc"]:checked').val() == 'y') {
        //custom color
        code += $('#char').val() + ' ';
    }
    code += $('select[name="tempSize"]').val() + ' ' + $('select[name="fontSize"]').val() + ' ';
    if ($('input[name="wt"]:checked').val() == 'y') {
        code += $('input[name="scrollSize"]:checked').val() + ' ';
    }
    if ($('input[name="dm"]:checked').val() == 'y') {
        code += 'dark ';
    }
    code += '">';

    //content start
    code += '<div class="sl-tempWrap"><div class="sl-tempBox"><div class="sl-tempContent sl-tempQuote"><div class="sl-tempScroll">' + '\n\n';
    code += quote + '\n\n';
    code += '</div></div></div></div>';
    //content end
    
    code += '</span>'
    if ($('input[name="tc"]:checked').val() == 'n') {
        //group color
        code += '</';
        code += $('select[name="groupColor"]').val();
        code += '>';
    }
    
    code += '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/base.css" rel="stylesheet"><link href="//dawneggleton.github.io/jcink-temps/totl-anni/characters.css" rel="stylesheet">' + colors;
    return code;
}


$('#runScript').on('click', function() {
    $('.sl-tempTabs span').on('click', function() {
        $('.sl-tempTabs span').removeClass('sl-activeTab');
        $('.sl-tempTabCont').removeClass('sl-activeTab');
        $(this).addClass('sl-activeTab');
        $(this).parent().parent().siblings('#' + this.id + '-content').addClass('sl-activeTab');
    });
});