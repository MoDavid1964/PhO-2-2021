/*
    A library of utility functions for drawing
    and doing stuff to canvases using the 2d
    rendering context.
*/

const $2D = (function(){

    // Sets up the context object
    let $2D = {};
    let cnv = null;
    let ctx = null;

    // The image data
    let image = null;
    let width = 0;
    let height = 0;

    // Helper functions
    function interpolate(v1, v2, amount){
        return v1 + (v2 - v1) * amount;
    }

    // Specifies which canvas to use
    $2D.useCanvas = function(canvas){
        cnv = canvas;
        ctx = cnv.getContext("2d");
    }

    $2D.width = function(){
        return cnv.width;
    }

    $2D.height = function(){
        return cnv.height;
    }

    // Image data stuff
    $2D.getImageData = function(){
        width = $2D.width(); height = $2D.height()
        image = ctx.getImageData(0, 0, width, height);
    }

    $2D.setImageData = function(r, g, b, a){
        for(let i = 0; i < width * height * 4; i += 4){
            image.data[i + 0] = r(i / 4, i / 4 / $2D.width());
            image.data[i + 1] = g(i / 4, i / 4 / $2D.width());
            image.data[i + 2] = b(i / 4, i / 4 / $2D.width());
            image.data[i + 3] = a(i / 4, i / 4 / $2D.width());
        }

        ctx.putImageData(image, 0, 0);
    }

    // Sets different colors
    $2D.fill = function(r, g, b, a){
        let color;
        
        if(a == 0) color = `rgba(0, 0, 0, 0)`;
        if(a) color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        if(!a && a != 0) color = `rgba(${r}, ${g}, ${b}, 1.0)`;
        if(!b && b != 0) color = `rgba(${r}, ${r}, ${r}, ${g / 255})`;
        if(!g && g != 0) color = `rgba(${r}, ${r}, ${r}, 1.0)`;

        ctx.fillStyle = color;
    }

    $2D.stroke = function(r, g, b, a){
        let color;
        
        if(a == 0) color = `rgba(0, 0, 0, 0)`;
        if(a) color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
        if(!a && a != 0) color = `rgba(${r}, ${g}, ${b}, 1.0)`;
        if(!b && b != 0) color = `rgba(${r}, ${r}, ${r}, ${g / 255})`;
        if(!g && g != 0) color = `rgba(${r}, ${r}, ${r}, 1.0)`;

        ctx.strokeStyle = color;
    }

    $2D.noFill = function(){
        $2D.fill(0, 0);
    }

    $2D.noStroke = function(){
        $2D.stroke(0, 0);
    }

    $2D.lerp = function(r1, g1, b1, a1, r2, g2, b2, a2, amount){
        return {
            r: interpolate(r1, r2, amount),
            g: interpolate(g1, g2, amount),
            b: interpolate(b1, b2, amount),
            a: interpolate(a1, a2, amount),
        }
    }

    $2D.clear = function(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
    }

    // Shape functions
    $2D.poly = function(){
        if(arguments.length % 2 == 1){
            console.error("Error: odd number of parameters for $2D.poly!");
            return;
        }

        ctx.beginPath();
        ctx.moveTo(arguments[0], arguments[1]);

        // The different lines
        for(let i = 2; i < arguments.length; i += 2)
            ctx.lineTo(arguments[i], arguments[i + 1]);
        ctx.lineTo(arguments[0], arguments[1]);

        // Draw it
        ctx.stroke();
        ctx.fill();
    }

    $2D.regular = function(x, y, rad, sides, rot){
        
        // Set up some stuff
        let points = [];
        rot *= Math.PI / 180;

        // Creates the points of the regular polygon
        for(let i = 0; i < sides; i++){
            points.push(Math.cos(Math.PI * 2 / sides * i + rot) * rad + x);
            points.push(Math.sin(Math.PI * 2 / sides * i + rot) * rad + y);
        }

        $2D.poly(...points);
    }

    $2D.rect = function(x, y, w, h){
        $2D.poly(x, y, x + w, y, x + w, y + h, x, y + h);
    }

    $2D.ellipse = function(x, y, radx, rady, rot){
        
        // Convert to degrees from radians
        rot *= Math.PI / 180;

        ctx.beginPath();
        ctx.ellipse(x, y, radx, rady, rot, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

    $2D.circle = function(x, y, rad){
        $2D.ellipse(x, y, rad, rad, 0);
    }

    // Lines and nonfilled stuff
    $2D.line = function(x1, y1, x2, y2){

        // Create a line between two points
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    $2D.arc = function(x, y, radx, rady, rot, start, stop){

        // Convert to degrees from radians
        start *= Math.PI / 180;
        stop *= Math.PI / 180;
        rot *= Math.PI / 180;

        ctx.beginPath();
        ctx.ellipse(x, y, radx, rady, rot, start, stop);
        ctx.stroke();
        ctx.fill();
    }

    // Sets some line properties
    $2D.weight = function(weight){
        ctx.lineWidth = weight;
    }

    $2D.buttCap = function(){
        ctx.lineCap = "butt";
    }
    
    $2D.roundCap = function(){
        ctx.lineCap = "round";
    }

    $2D.squareCap = function(){
        ctx.lineCap = "square";
    }

    return $2D;
})();