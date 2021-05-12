//Form Variables
let type, accentMode;

//Other Variables
let group, identifier, accent, accent55, accent75;

//Show/Hide
$('input[name="accentColor"]').change(function () {
	switch($(this).val()) {
        case 'color_group': 
            $('.ifCustomColor').hide();
            $('.ifGroupColor').show();
            break;
        case 'color_custom': 
            $('.ifCustomColor').show();
            $('.ifGroupColor').hide();
            break;
        case 'color_default': 
        default: 
            $('.ifCustomColor').hide();
            $('.ifGroupColor').hide();
            break;
    }
});



//Set Variables ONLY when template is set to generate
function setValues() {

    //Pull Form Variables
    type = document.querySelector('input[name="type"]:checked').value;
    accentMode = document.querySelector('input[name="accentColor"]:checked');


    //Set Accent
    switch(accentMode) {
        case 'color_group': 
        console.log('group');
            group = document.querySelector('select[name="groupColor"]').value;
            identifier = undefined;
            accent = undefined;
            accent55 = undefined;
            accent75 = undefined;
            break;
        case 'color_custom': 
            group = undefined;
            identifier = document.querySelector('input[name="identifier"]').value;
            const accentRGB = hexToRgb($('input[name="accent"]').spectrum("get").toHexString().split('#')[1]);
            accent = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 1)`;
            accent55 = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.55)`;
            accent75 = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.75)`;
            break;
        case 'color_default': 
        default: 
            break;
    }

}