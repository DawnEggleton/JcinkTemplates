//general variables
let type, colors, lHead = [''], sHead = [''], tempCode = '', tabs = 0;


//Show/Hide Basic Fields
showhide('lh', 'ifLH');
showhide('sh', 'ifSH');

//Show/Hide Complex Fields
var tabHTML = ['<span class="twoCol altCol"><input id="tabTitle', '" placeholder="Tab Title" /><textarea id="tabText', '"placeholder="Tab Contents"></textarea></span>'];
addFields('tabCount', tabHTML, 'tabContents');


//Set Variables
function setValues() {

    //set image
    fromRadio('sh', sHead, '', '');
    fromRadio('lh', lHead, '', '');
    type = $('input[name="type"]:checked').val();
    tabs = $('#tabCount').val();

    //set up color styles
    colors =        '<style>' +
                    '.' + $('input[name="char"]').val() + ' .lux-temp1-container' +
                    ' {--accent: ' +
                    $('input[name="accent"]').spectrum("get").toHexString() +
                    '}</style>';
}


//Build Final Content

function setPostCode() {
    console.log($('#postText').val());
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="lux-temp1-container lux-' + 
                $('select[name="tempSize"]').val() +
                '"><div class="lux-temp1-titlebox"><div class="lux-temp1-title"><span class="link">' + '\n\n' + 
                sHead + '\n\n' + 
                '</span>' + '\n\n' + 
                lHead + '\n\n' +
                '</div></div><div class="lux-temp1-contentbox"><div class="lux-temp1-content" id="scroll">\n' + 
                $('#postText').val() + '\n\n' +
                '</div></div></div></span><link href="//dawneggleton.github.io/jcink-temps/simple/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/simple/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' +
                colors;
    return code;
}

function setTabbedCode() {
    var code =  '<span class="' +
                $('input[name="char"]').val() +
                '"><div class="lux-temp1-container lux-' + 
                $('select[name="tempSize"]').val() +
                ' lux-tabbed"><div class="lux-temp1-titlebox">\n';


    //do tab labels
    for(var i = 0; i < $('#tabCount').val(); i++) {
        if(i == 0) {
            code += '<div class="lux-temp1-title lux-active"><span></span>' + $('#tabTitle' + i).val() + '</div>\n';
        } else {
            code += '<div class="lux-temp1-title"><span></span>' + $('#tabTitle' + i).val() + '</div>\n';
        }
    }

    code += '</div><div class="lux-temp1-contentbox">\n\n';
    
    //code tabs
    for(var i = 0; i < $('#tabCount').val(); i++) {
        if(i == 0) {
            code += '<div class="lux-temp1-content lux-active" id="scroll">\n' + $('#tabText' + i).val() + '\n</div>\n';
        } else {
            code += '<div class="lux-temp1-content" id="scroll">\n' + $('#tabText' + i).val() + '\n</div>\n';
        }
    }
    
    code += '\n<div class="lux-temp1-left"><i class="fas fa-caret-left"></i></div><div class="lux-temp1-right"><i class="fas fa-caret-right"></i></div></div></div></span><link href="//dawneggleton.github.io/jcink-temps/simple/styles.css" rel="stylesheet"><script src=//dawneggleton.github.io/jcink-temps/simple/scripts.js></script><link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">' + colors;
    return code;
}


$('#runScript').on('click', function() {
    let actTab = 1;
    let titles = $('.lux-tabbed .lux-temp1-title');
    let ttabs = $('.lux-tabbed .lux-temp1-content');

    $('.lux-temp1-left').on('click', function(){	
        if (actTab == 1) {
            actTab = ttabs.length;
        }
        else {
            actTab -= 1;
        }
        for (i = 0; i < ttabs.length; i++) {
            $(titles[i]).removeClass('lux-active');
            $(ttabs[i]).removeClass('lux-active');
        }
        $(titles[actTab - 1]).addClass('lux-active');
        $(ttabs[actTab - 1]).addClass('lux-active');
    });

    $('.lux-temp1-right').on('click', function(){	
        if (actTab == ttabs.length) {
            actTab = 1;
        }
        else {
            actTab += 1;
        }
        for (i = 0; i < ttabs.length; i++) {
            $(titles[i]).removeClass('lux-active');
            $(ttabs[i]).removeClass('lux-active');
        }
        $(titles[actTab - 1]).addClass('lux-active');
        $(ttabs[actTab - 1]).addClass('lux-active');
    });
});