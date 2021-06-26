/*
    Handles the animations in the bg of both
    the login and registration pages.
*/

const BG = (function(){
    let bg = {};

    bg.vertexShaderSource = `
        void main() {
            gl_Position = vec4(0, 0, 0, 1.0);
        }
    `;

    bg.fragmentShaderSource = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 0, 0, 1.0);
        }
    `;
    
    // Initialize the process
    bg.init = function(){

        // Initialize the context and loop
        GL.useCanvas(document.getElementsByTagName("canvas")[0]);
        LOOP.execute("bg", bg.process, 60);

        bg.program = GL.createProgram({
            vertex: bg.vertexShaderSource,
            fragment: bg.fragmentShaderSource,
        });
    }

    bg.process = function(){
        GL.clear();
        GL.use(bg.program);   
    }

    document.getElementsByTagName("body")[0].onload = bg.init;

    return bg;
})();

