//Form Variables
let code, type, accentMode, tempSize, fontSize, scrollMode, colorMode, content, colors = '';

//Other Variables
let group, identifier, accent, accent55, accent75;

//Show/Hide
//Accent Color Options
document.body.addEventListener('change', (e) => {
    switch(e.target.value) {
        case 'color_group': 
            document.querySelector('.ifCustomColor').style.display = 'none';
            document.querySelector('.ifGroupColor').style.display = 'block';
            break;
        case 'color_custom': 
            document.querySelector('.ifCustomColor').style.display = 'block';
            document.querySelector('.ifGroupColor').style.display = 'none';
            break;
        case 'color_default': 
        default: 
            document.querySelector('.ifCustomColor').style.display = 'none';
            document.querySelector('.ifGroupColor').style.display = 'none';
            break;
    }
})



//Set Variables ONLY when template is set to generate
function setValues() {

    //Pull Form Variables
    type = document.querySelector('input[name="type"]:checked').value;
    accentMode = document.querySelector('input[name="accentColor"]:checked').value;
    tempSize = document.querySelector('select[name="tempSize"]').value;
    fontSize = document.querySelector('select[name="fontSize"]').value;
    scrollMode = document.querySelector('select[name="scrollMode"]').value;
    colorMode = document.querySelector('select[name="colorMode"]').value;
    content = document.querySelector('textarea[name="postText"]').value;


    //Set Accent
    switch(accentMode) {
        case 'color_group': 
            group = document.querySelector('select[name="groupColor"]').value;
            identifier = undefined;
            accent = undefined;
            accent55 = undefined;
            accent75 = undefined;
            colors = '';
            break;
        case 'color_custom': 
            group = undefined;
            identifier = document.querySelector('input[name="identifier"]').value;
            const accentRGB = hexToRgb($('input[name="accent"]').spectrum("get").toHexString().split('#')[1]);
            accent = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 1)`;
            accent55 = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.55)`;
            accent75 = `rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.75)`;
            colors = `<style>.${identifier} {--accent: ${accent}; --accent-55: ${accent55}; --accent-75: ${accent75};}</style>`;
            break;
        case 'color_default': 
        default: 
            colors = '';
            break;
    }

}



//Build Final Content
function setPostCode() {
    let classList = `${tempSize} ${fontSize} ${scrollMode} ${colorMode}`;
    let template = `<div class="btc2-wrap"><div class="scroll">\n
        ${content}
    \n</div></div><link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i|Share+Tech+Mono&display=swap" rel="stylesheet"><link href="https://dawneggleton.github.io/JcinkTemplates/templates/btc-fall2020/styles.css" rel="stylesheet"><link href="//dawneggleton.github.io/JcinkTemplates/styles/characters.css" rel="stylesheet">${colors}`;
    switch(accentMode) {
        case 'color_group':
            code = `<${group}>${template}</${group}>`;
            break;
        case 'color_custom':
            code = `<span class="${identifier} ${classList}">${template}</span>`;
            break;
        case 'color_default':
        default:
            code = `${template}`;
            break;
    }

    return code;
}


//Run any script on button press
document.querySelector('#runScript').addEventListener('click', () => {
    //scripts here
});