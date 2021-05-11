//default counter variables
let imgCount, songCount, tabCount, msgCount, igCount, eventCount, threadCount, charCount;

$("#dkAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#accent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#darkAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#brightAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#textAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#ltAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});
$("#dullAccent").spectrum({
    color: "#000",
    showInput: true,
    showInitial: true,
    preferredFormat: "hex",
    change: function(color) {
        console.log(color.toHexString());
    }
});

if ($('#imgCount').val()) {
    imgCount = [$('#imgCount').val()];
}
if ($('#songCount').val()) {
    songCount = [$('#songCount').val()];
}
if ($('#tabCount').val()) {
    tabCount = [$('#tabCount').val()];
}
if ($('#msgCount').val()) {
    msgCount = [$('#msgCount').val()];
}
if ($('#commCount').val()) {
    igCount = [$('#commCount').val()];
}
if ($('#eventCount').val()) {
    eventCount = [$('#eventCount').val()];
}
if ($('#threadCount').val()) {
    threadCount = [$('#threadCount').val()];
}
if ($('#charCount').val()) {
    charCount = [$('#charCount').val()];
}
$('input[name="tc"]').change(function () {
    if($(this).val() == 'y') {
        $('.ifCustomCol').show();
        $('.ifGroupCol').hide();
    } else if($(this).val() == 'n') {
        $('.ifCustomCol').hide();
        $('.ifGroupCol').show();
    } else {
        $('.ifGroupCol').hide();
        $('.ifCustomCol').hide();
    }
});

//Preview Tabs
$('.result h3').on('click', function () {
    $('.result h3').removeClass('active');
    $('.result .scroll').removeClass('active');
    $(this).addClass('active');
    $('#' + this.id + '-content').addClass('active');
});

//Template Production
$('#updateTemp').on('click', function() {
    setValues();
    switch(type) {
        case 'general':
            tempCode = setGeneralCode();
            break;
        case 'posting':
            tempCode = setPostCode();
            break;
        case 'large':
            tempCode = setLargeCode();
            break;
        case 'small':
            tempCode = setSmallCode();
            break;
        case 'tabbed':
            tempCode = setTabbedCode();
            break;
        case 'timeline': 
            tempCode = setTimelineCode();
            break;
        case 'tracker': 
            tempCode = setTrackerCode();
            break;
        case 'playlist': 
            tempCode = setPlaylistCode();
            break;
        case 'imagedev': 
            tempCode = setImageCode();
            break;
        case 'quotedev': 
            tempCode = setQuoteCode();
            break;
        case 'wanted': 
            tempCode = setWantedCode();
            break;
        case 'phone': 
            tempCode = setPhoneCode();
            break;
        case 'instagram':
            tempCode = setInstaCode();
            break;
        case 'tindr':
            tempCode = setTindrCode();
            break;
        default:
            $('#display').html('Please select a template.');
            break;
    }

    $('#display').html(tempCode);
    var copyCode = tempCode.replace(/>/ig, '&gt;').replace(/</ig, '&lt;');
    $('#code').html('[dohtml]' + copyCode + '[/dohtml]');
});

//order by month and year
function orderEvents(num, yearArray, monthArray, eventArray, type, prefix) {
    yearArray = [];
    monthArray = [];
    eventArray = [];
    for (var i = 0; i < num; i++) {
        var year = $('input[name="' + prefix + i + '"].year').val();
        if(jQuery.inArray(year, yearArray) == -1) {
            yearArray.push(year);
        }
    }
    yearArray.sort();

    //set up months per year
    for (var i = 0; i < yearArray.length; i++) {
        var monthGroups = [];
        
        $('.' + type + ' .month').each(function () {
            if ($(this).prev().val() == yearArray[i]) { 
                var month;
                if($(this).val() != '10') {
                    month = 'ym-' + yearArray[i] + '-' + $(this).val().replace('0', '');
                } else {
                    month = 'ym-' + yearArray[i] + '-' + $(this).val();
                }
                if(jQuery.inArray(month, monthGroups) == -1) {
                    monthGroups.push(month);
                }
            }
        });
        monthGroups.sort();
        monthArray.push(monthGroups);
    }
    
    //set up timeline / tracker (optimize - separate into functions)
    if(type == 'timeline') {
        return buildTimeline(yearArray, monthArray, eventArray);
    } else if (type == 'tracker') {
        return buildTracker(yearArray, monthArray, eventArray);
    }
}

//get value from yes/no fields
function fromRadio(radioName, varName, prefix, suffix) {
    if($('input[name="' + radioName + '"]:checked').val() == 'y') {
        varName[0] = prefix + $('input[name="' + radioName + '"]:checked').parent().parent().next().val() + suffix;
    } else {
        varName[0] = '';
    }
}

//set up images for image dev
function setImageDev(imgNamePrefix) {
    var tempImages = '';
    for (var i = 0; i < imgCount; i++) {
        var tempImage = '<img src="' + $('input[name="' + imgNamePrefix + i + '"]').val() + '">\n';
        tempImages += tempImage;
    }
    return tempImages;
}

//selection code
$('selectCode').on('click', function() {
	var selected = $('pre').children('code');
	selected.selectText();
});
jQuery.fn.selectText = function(){
    var doc = document, element = this[0], range, selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

//Add Flexible Fields
/*
function addFields (fieldVar, fieldType) {
    for(var i = 0; i < $('input[name=add' + fieldType + ']').val(); i++) {
        fieldVar[0]++;
        addFieldSet(fieldVar, fieldType);
    }
}*/

//Show/Hide Fields
function showhide (inputName, shClass) {
    $('input[name="' + inputName + '"]').change(function () {
        if($(this).val() == 'y') {
            $('.' + shClass).show();
        } else {
            $('.' + shClass).hide();
        }
    })
}

//hex to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  
//Add/Subtract Fields
/*
function addFieldsOriginal(counterName, htmlPieces, appendBox) {
    $('input[name="' + counterName + '"]').change(function () {
        var html = '';
        for (var i = 0; i < $(this).val(); i++) {
            for (var j = 0; j < htmlPieces.length; j++) {
                if (j == 0) {
                    html += htmlPieces[j];
                } else {
                    html += i + htmlPieces[j];
                }            
            }
        }
        $('.' + appendBox).html(html);
    });
}
*/
function addFields(counter, counterName, htmlPieces, appendBox) {
    $('input[name="' + counterName + '"]').change(function () {
        if ($(this).val() < counter) {
            //if decrement
            var diff = counter - $(this).val();
            console.log('diff ' + diff);
            for (var i = 0; i < diff; i++) {
                $('.' + appendBox).children().last().remove();
            }
            counter[0] = $(this).val();
        } else if ($(this).val() > counter) {
            //if increment
            var diff = $(this).val() - counter;
            for (var i = 0; i < diff; i++) {
                var html = '';
                for (var j = 0; j < htmlPieces.length; j++) {
                    if (j == 0) {
                        html += htmlPieces[j];
                    } else {
                        html += ($(this).val() - diff + i) + htmlPieces[j];
                    }            
                }
                $('.' + appendBox).append(html);
            }
            counter[0] = $(this).val();
        } else {
            console.log('no real change');
        }
    });
}
function addFieldsPL(counterName, htmlPieces, appendBox) {
    var html = '';
    for (var i = 0; i < $('input[name="' + counterName + '"]').val(); i++) {
        for (var j = 0; j < htmlPieces.length; j++) {
            if (j == 0) {
                html += htmlPieces[j];
            } else {
                html += i + htmlPieces[j];
            }            
        }
    }
    $('.' + appendBox).html(html);
}

//Complex Field Generation
var imgHTML = ['<input type="text" name="i', '" class="iLink" />'];
addFields(imgCount, 'imgCount', imgHTML, 'imgContent');

var songHTML = ['<span class="twoCol fullWidth"><input type="text" name="s', '" class="songTitle" placeholder="Song Name" /><input type="text" name="s', '" class="songArtist" placeholder="Song Artist" /></span>'];
addFields(songCount, 'songCount', songHTML, 'songContent');

var tabHTML = ['<span class="twoCol altCol"><input id="tabTitle', '" placeholder="Tab Title" /><textarea id="tabText', '"placeholder="Tab Contents"></textarea></span>'];
addFields(tabCount, 'tabCount', tabHTML, 'tabContents');

var msgHTML = ['<textarea class="message" id="msg', '"></textarea>'];
addFields(msgCount, 'msgCount', msgHTML, 'msgContents');

var igHTML = ['<span class="twoCol"><input type="text" id="igNPCName', '" name="igNPCName', '" placeholder="Commenter Name" /><input type="text" id="igNPCText', '" name="igNPCText', '" placeholder="Comment" /></span>'];
addFields(igCount, 'commCount', igHTML, 'igComments');

var eventHTML = ['<span class="threeCol"><input type="text" name="ev', '" class="year" placeholder="YYYY" /><input type="text" name="ev', '" class="month" placeholder="MM" /><input type="text" name="ev', '" class="event" placeholder="Event" /></span>'];
addFields(eventCount, 'eventCount', eventHTML, 'eventContent');

var threadHTML = ['<span><input type="text" name="post', '" class="title" placeholder="Thread Title" /><input type="text" name="post', '" class="tid" placeholder="Topic ID" /><select name="post', '" class="status"><option value="ip">in progress</option><option value="c">complete</option><option value="ic">incomplete</option></select><input type="text" name="post', '" class="feat" placeholder="Featuring" /><input type="text" name="post', '" class="year" placeholder="YYYY" /><input type="text" name="post', '" class="month" placeholder="MM" /><input type="text" name="post', '" class="location" placeholder="location" /></span>'];
addFields(threadCount, 'threadCount', threadHTML, 'threadContent');


//set up complex fields
$('input[name="type"]').change(function () {
	switch($(this).val()) {
        case 'general': 
            $('.typeSwitch').hide();
            $('.ifGen').show();
            break;
        case 'posting': 
        case 'small': 
        case 'large': 
            $('.typeSwitch').hide();
            $('.ifPost').show();
            break;
        case 'tabbed': 
            $('.typeSwitch').hide();
            $('.ifTab').show(); 
            $('.ifTabbed').show();            
            addFieldsPL('tabCount', tabHTML, 'tabContents');
            break;
        case 'wanted': 
            $('.typeSwitch').hide();
            $('.ifWant').show();            
            addFieldsPL('charCount', charHTML, 'wantContents');
            break;
        case 'phone': 
            $('.typeSwitch').hide();
            $('.ifPhone').show();         
            addFieldsPL('msgCount', msgHTML, 'msgContents');
            break;
        case 'tindr': 
            $('.typeSwitch').hide();
            $('.ifTindr').show();
            break;
        case 'instagram': 
            $('.typeSwitch').hide();
            $('.ifInsta').show();
            addFieldsPL('commCount', igHTML, 'igComments');
            break;
        case 'timeline': 
            $('.typeSwitch').hide();
            $('.ifTime').show();
            addFieldsPL('eventCount', eventHTML, 'eventContent');
            break;
        case 'tracker': 
            $('.typeSwitch').hide();
            $('.ifTrack').show();
            addFieldsPL('threadCount', threadHTML, 'threadContent');
            break;
        case 'imagedev': 
            $('.typeSwitch').hide();
            $('.ifImage').show();          
            addFieldsPL('imgCount', imgHTML, 'imgContent');
            break;
        case 'playlist': 
            $('.typeSwitch').hide();
            $('.ifMusic').show();
            addFieldsPL('songCount', songHTML, 'songContent');
            break;
        case 'quotedev': 
            $('.typeSwitch').hide();
            $('.ifQuote').show();
            break;
        default:
            console.log('template type: ' + $(this).val());
            break;
    }
});