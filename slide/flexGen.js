//general variables
let type, colors, image = [''], tempCode = '';

//post variables
let temp_post, tag = [''], note = [''];

showhide('tag', 'ifTag');
showhide('nt', 'ifNT');

//Set Variables
function setValues() {

    //set variable fields
    fromRadio('tag', tag, '<i class="fas fa-tag"></i> ', '<p>');
    fromRadio('nt', note, '', '');
    type = 'posting';

    //set up color styles
    if ($('input[name="tc"]:checked').val() != 'default') {
        colors =        '<style>.' +
                        $('input[name="char"]').val() + ' .lux-slide-box ' + 
                        ' {--accent: ' +
                        $('input[name="accent"]').spectrum("get").toHexString() +
                        '; --dkAccent: ' +
                        $('input[name="dkAccent"]').spectrum("get").toHexString() +
                        '; --ltAccent: ' +
                        $('input[name="ltAccent"]').spectrum("get").toHexString() +
                        ';}</style>';
    }
}

//Build Final Content
function setPostCode() {
    var code =     '<span class="' + $('input[name="char"]').val() +
                    '"><div class="lux-slide-box"><div class="lux-slide-image">' + '\n\n' +
                    '<img src="' +
                    $('#imgURL').val() + '\n\n' +
                    '"></div><div class="lux-slide-info"><div class="lux-slide-lyrics"><span>' + 
                    $('#icon').val() + 
                    '</span>' + '\n\n' + 
                    $('#postText').val() + '\n\n' +
                    $('#lyrics').val() + '\n\n' + 
                    '</div><div class="lux-slide-tag">' + '\n\n' +
                    tag + '\n\n' +
                    note + '\n\n' + 
                    '</div><div class="lux-slide-togPost">Read <i class="fal fa-long-arrow-right"></i></div></div><div class="lux-slide-post"><div class="lux-slide-postBox"><div class="lux-slide-postBoxIn">' +
                    $('#postText').val() + 
                    '</div></div><div class="lux-slide-togInfo"><i class="fal fa-long-arrow-left"></i> Info</div></div></div></span><link href="//fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap" rel="stylesheet"><link href="//fonts.googleapis.com/css?family=Crimson+Text:400,400i,700,700i&display=swap" rel="stylesheet"><link rel="stylesheet" href="//dawneggleton.github.io/jcink-temps/slide/styles.css"><script defer src="//dawneggleton.github.io/jcink-temps/slide/scripts.js"></script>' + 
                    colors;
    return code;
}


$('#runScript').on('click', function() {
    $('.lux-slide-box').each(function() {
        var slideImage = $(this).find('.lux-slide-image').html();
        $(this).find('.lux-slide-image').append(slideImage);
    
        $(this).find('.lux-slide-togPost').on('click', function() {
            $(this).parent().animate({ left: "+=425" }, 750);
            $(this).parent().parent().find('.lux-slide-post').animate({ left: "+=425" }, 750);
            $(this).parent().parent().find('.lux-slide-image img').addClass('animate');
        });
        
        $(this).find('.lux-slide-togInfo').on('click', function() {
            $(this).parent().animate({ left: "-=425" }, 750);
            $(this).parent().parent().find('.lux-slide-info').animate({ left: "-=425" }, 750);
            $(this).parent().parent().find('.lux-slide-image img').removeClass('animate');
        });
    });
});