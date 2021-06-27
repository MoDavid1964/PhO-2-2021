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
    "main-title-font": "Staatliches",
    "main-text-font": "Lato",
    "alt-title-font": "?",
    "alt-text-font": "?",
    "form-input-font": "Roboto Mono",
};

// Some typical sizes used in the document
// Might make a counterpart for phone
const SIZES = {
    "title-size": "78px",
    "subtitle-size": "",
};

// A dictionary of the site's color accents
const ACCENTS = {
    "main-accent": "rgba()",
    "sub-accent": "rgba()",
    "third-accent": "rgba()",
    "fourth-accent": "rgba()",
    "fifth-accent": "rgba()",
};

// Creates the link element to retrieve fonts
(function(){
    let link = document.createElement("link");
    let href = "https://fonts.googleapis.com/css?family=";
    let font_keys = Object.keys(FONTS);
    let size_keys = Object.keys(SIZES);
    let accent_keys = Object.keys(ACCENTS);

    // In case its been added already, just remove it
    let fonts = document.getElementById("fonts");
    if(fonts) document.getElementsByTagName("head")[0].removeChild(fonts);

    // Append the appropriate font families to the url
    for(let i = 0;;){
        href += FONTS[font_keys[i]].replace(/ /g, '+');
        if(++i >= font_keys.length) break;
        href += '|';
    }

    link.rel = "stylesheet";
    link.href = href;
    link.id = "fonts";

    // Append the link to the head of the html file
    document.getElementsByTagName("head")[0].appendChild(link);

    // Set the css variables to their respective font families
    for(let i = 0; i < font_keys.length; i++){
        if(FONTS[font_keys[i]] == "?") continue;
        document.documentElement.style.setProperty(
            `--${font_keys[i]}`, FONTS[font_keys[i]]);
    }

    // Set the css variables to their respective font sizes
    for(let i = 0; i < size_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${size_keys[i]}`, SIZES[size_keys[i]]);
    }

    // Set the css variables to their respective accents
    for(let i = 0; i < accent_keys.length; i++){
        document.documentElement.style.setProperty(
            `--${accent_keys[i]}`, ACCENTS[accent_keys[i]]);
    }
})();

// Means the script has succesfully been loaded
(function(){
    window.PROCEED = true;
})();