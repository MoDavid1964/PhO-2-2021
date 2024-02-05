/*
    This script loads the needed fonts for all pages
    of the site, and stores the font families in 
    css variables to make the site and its style
    more versatile.

    Note that the FONTS constant may be edited, and
    more font keys may be added or additional
    customization.
*/

// A dictionary of the sites' fonts
const FONTS = {
    "main-title-font": "SwedenSansBold",
    "main-text-font": "SwedenSans",
    "alt-title-font": "Roboto",
    "alt-text-font": "?",
    "form-input-font": "Lexend",
};

// Some typical sizes used in the document
// Might make a counterpart for phone
const SIZES = {
    "title-size-relative": "2vw",
    "title-size-absolute": "40px",
    "subtitle-size-relative": "1.5vw",
    "subtitle-size-absolute": "30px",
    "subtitle2-size-relative": "1.25vw",
    "subtitle2-size-absolute": "24px", 
    "subtitle3-size-relative": "1vw",
    "subtitle3-size-absolute": "20px", 
    "text-size-relative": "0.8vw",
    "text-size-absolute": "16px",
};

const OFFSETS = {
    "title-size-offset-relative": "0.27vw",
    "title-size-offset-absolute": "5px",
    "subtitle-size-offset-relative": "",
    "subtitle-size--offset-absolute": "",
};

// A dictionary of the site's color accents
const ACCENTS = {
    "main-accent-dark": "rgba(63, 81, 181, 1)",
    "main-accent-light": "rgba(246, 253, 255, 1)",
    "main-shadow-dark": "rgba(63, 81, 181, 0.75)",
    "main-shadow-light": "rgba(246, 253, 255, 0.75)",
    "default-shadow": "rgba(0, 0, 0, 0.05)",
    "secondary-accent-dark": "rgba(36, 181, 207, 1)",
    "secondary-accent-light": "rgba(177, 248, 255, 1)",
    "positive-accent-light": "rgba(120, 255, 215, 1)",
    "negative-accent-light": "rgba(255, 155, 170, 1)",
    "neutral-accent-light": "rgba(160, 200, 255, 1)",
    "positive-accent-light-hover": "rgba(165, 255, 230, 1)",
    "negative-accent-light-hover": "rgba(255, 185, 200, 1)",
    "neutral-accent-light-hover": "rgba(185, 220, 255, 1)", 
    "highlight-accent-light-hover": "rgba(200, 235, 255, 1)",
    "highlight-accent-dark-hover": "rgba(50, 80, 100, 1)",
};

const ANIMS = {
    "default-transition-time": "0.2s",
    "default-transition-interval": "0.1s",
};

// Creates the link element to retrieve fonts
(function(){
    let link = document.createElement("link");
    let link2 = document.createElement("link");
    let href = "https://fonts.googleapis.com/css?family=";
    let href2 = "https://fonts.googleapis.com/css2?family=";
    let font_keys = Object.keys(FONTS);
    let size_keys = Object.keys(SIZES);
    let offset_keys = Object.keys(OFFSETS);
    let accent_keys = Object.keys(ACCENTS);
    let anim_keys = Object.keys(ANIMS);

    // In case its been added already, just remove it
    let fonts = document.getElementById("fonts");
    if(fonts) document.getElementsByTagName("head")[0].removeChild(fonts);

    // Append the appropriate font families to the url
    for(let i = 0; i < font_keys.length ;i++){
        if(FONTS[font_keys[i]].split(",")[0] == "?") {
            i++; continue;
        }

        let font = "";
        font += FONTS[font_keys[i]].split(",")[0].replace(/ /g, '+');
        if(FONTS[font_keys[i]].split(",")[1]){
            font += `:wght@${FONTS[font_keys[i]].split(",")[1]}`;
        }

        font += "|"; 
        if(!FONTS[font_keys[i]].split(",")[1]){
            href += font;
        } else {
            href2 += font;
        }  
    }
    href = href.substr(0, href.length - 1);
    href2 = href2.substr(0, href2.length - 1);
    href2 += "&display=swap";

    // Set some properties
    link.rel = "stylesheet";
    link2.rel = "stylesheet";
    
    link.href = href;
    link2.href = href2;

    link.id = "fonts";
    link2.id = "fonts2";

    // Append the link to the head of the html file
    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(link2);

    // Set the css variables to their respective font families
    for(let i = 0; i < font_keys.length; i++){
        if(FONTS[font_keys[i]] == "?") continue;
        document.documentElement.style.setProperty(
            `--${font_keys[i]}`, FONTS[font_keys[i]].split(",")[0]);
    }

    // Set the css variables to their respective font sizes
    for(let i = 0; i < size_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${size_keys[i]}`, SIZES[size_keys[i]]);
    }

    for(let i = 0; i < offset_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${offset_keys[i]}`, OFFSETS[offset_keys[i]]);
    }

    // Set the css variables to their respective accents
    for(let i = 0; i < accent_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${accent_keys[i]}`, ACCENTS[accent_keys[i]]);
    }

    // Set some css variables for animations and transitions
    for(let i = 0; i < anim_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${anim_keys[i]}`, ANIMS[anim_keys[i]]);
    }
})();

