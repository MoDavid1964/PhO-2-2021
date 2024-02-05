/*
    A header class for managing canvases and
    automatically making them occupy the entire
    viewport (given they have the classname 
    "fullscreen")
*/

const CANVAS = (function(){

    let cnv = {};

    // Stores references to canvases
    let canvases = document.getElementsByTagName("canvas");

    // In case screen resizes
    cnv.resize = function(){
        for(let i = 0; i < canvases.length; i++){
            if(canvases[i].className.includes("fullscreen")){
                // Change how the canvas is drawn and its resolution as well
                canvases[i].style.width = canvases[i].width = window.innerWidth;
                canvases[i].style.height = canvases[i].height = window.innerHeight;
            }
        }
    }

    cnv.getSize = function(){
        return {
            width: window.getInnerWidth(),
            height: window.getInnerHeight(),
        }
    }

    // Creates a new canvas and appends it to the specified element
    cnv.new = function(className, w, h, parent){
        let canvas = document.createElement("canvas");
        canvas.className = className;

        if(w) canvas.style.width = canvas.width = w;
        if(h) canvas.style.height = canvas.height = w;

        parent.appendChild(canvas);
    }

    cnv.resize(); 
    window.addEventListener("resize", e => {
        cnv.resize();
    });

    return cnv;
})();

