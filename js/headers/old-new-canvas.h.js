const CANVAS = (function(){
    let canvas = {
        instances: {},
        cnv: null,
        ctx: null,
        w: 0, h: 0,
    };

    // A canvas instance to be appended to the body
    canvas.instance = function(parent, name, type, width, height){
        this.parent = parent;
        this.name = name;
        this.type = type || '2d';
        this.width = width || 0;
        this.height = height || 0;

        // Append to the dictionary
        canvas.instances[this.name] = this;
    }

    // Some non-static methods
    canvas.instance.prototype = {

        // Initialization function
        init: function(){

            // The parent and the element itself
            this.parentElement = document.getElementsByClassName(this.parent)[0] || document.getElementsByTagName('body')[0];
            this.canvasElement = document.createElement('canvas');

            // Configure the details of the canvas element
            this.canvasElement.className = `${this.name}-canvas canvas`;
            this.canvasContext = this.canvasElement.getContext(this.type);

            // Append the thingy to the parent
            this.parentElement.appendChild(this.canvasElement);

            // Configures the size of the canvas
            window.addEventListener('resize', this.resize);
            this.resize();
        },

        // Function for resizing the canvas
        resize: function(){

            // Retrieve the values of the dimensions
            let width = this.width;
            let height = this.height;

            // If not given an absolute size
            if(width < 1 && height < 1){
                if(!width && !height){

                    // Default size is fullscreen
                    width = window.innerWidth;
                    height = window.innerHeight;
                } else {

                    // Scaling of the screen is also an option
                    width *= window.innerWidth;
                    height *= window.innerHeight;
                }
            }

            // Actually set the size
            this.canvasElement.style.width = width + 'px';
            this.canvasElement.style.height = height + 'px';
            this.canvasElement.width = width;
            this.canvasElement.height = height;
        }
    };

    // Tell the class to focus on a canvas for modification
    canvas.use = id => {
        canvas.cnv = canvas.instances[id].canvasElement;
        canvas.ctx = canvas.instances[id].canvasContext;

        canvas.resize();
    }

    canvas.resize = () => {
        canvas.w = canvas.cnv.width;
        canvas.h = canvas.cnv.height;
    }

    window.addEventListener('resize', () => {
        setTimeout(() => {
            canvas.resize()
        }, 100);
    })

    // Utility functions for drawing on a 2d canvas
    canvas.$2d = {

        // Image functions
        getImageData: function(){
            this.image = canvas.$2d.ctx.getImageData(0, 0, canvas.w, canvas.h);
        },

        setImageData: function(r, g, b, a){
            for(let i = 0; i < canvas.w * canvas.h * 4; i += 4){
                this.image.data[i + 0] = r(i / 4, i / 4 / canvas.w);
                this.image.data[i + 1] = g(i / 4, i / 4 / canvas.w);
                this.image.data[i + 2] = b(i / 4, i / 4 / canvas.w);
                this.image.data[i + 3] = a(i / 4, i / 4 / canvas.w);
            }
    
            canvas.ctx.putImageData(this.image, 0, 0);
        },

        // Color functions
        fill: function(r, g, b, a){
            let color;
            
            if(a == 0) color = `rgba(0, 0, 0, 0)`;
            if(a) color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            if(!a && a != 0) color = `rgba(${r}, ${g}, ${b}, 1.0)`;
            if(!b && b != 0) color = `rgba(${r}, ${r}, ${r}, ${g / 255})`;
            if(!g && g != 0) color = `rgba(${r}, ${r}, ${r}, 1.0)`;
    
            canvas.ctx.fillStyle = color;
        },

        stroke: function(r, g, b, a){
            let color;
            
            if(a == 0) color = `rgba(0, 0, 0, 0)`;
            if(a) color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            if(!a && a != 0) color = `rgba(${r}, ${g}, ${b}, 1.0)`;
            if(!b && b != 0) color = `rgba(${r}, ${r}, ${r}, ${g / 255})`;
            if(!g && g != 0) color = `rgba(${r}, ${r}, ${r}, 1.0)`;
    
            canvas.ctx.strokeStyle = color;
        },

        noFill: function(){
            canvas.$2d.fill(0, 0);
        },

        noStroke: function(){
            canvas.$2d.stroke(0, 0);
        },

        clear: function(){
            canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);
        },

        // Shape functions
        poly: function(){
            canvas.ctx.beginPath();
            canvas.ctx.moveTo(arguments[0], arguments[1]);
    
            // The different lines
            for(let i = 2; i < arguments.length; i += 2)
                canvas.ctx.lineTo(arguments[i], arguments[i + 1]);
                canvas.ctx.lineTo(arguments[0], arguments[1]);
    
            // Draw it
            canvas.ctx.stroke();
            canvas.ctx.fill();
        },

        regular: function(x, y, rad, sides, rot){
        
            // Set up some stuff
            let points = [];
            rot *= Math.PI / 180;
    
            // Creates the points of the regular polygon
            for(let i = 0; i < sides; i++){
                points.push(Math.cos(Math.PI * 2 / sides * i + rot) * rad + x);
                points.push(Math.sin(Math.PI * 2 / sides * i + rot) * rad + y);
            }
    
            canvas.$2d.poly(...points);
        },

        rect: function(x, y, w, h){
            canvas.$2d.poly(x, y, x + w, y, x + w, y + h, x, y + h);
        },

        ellipse: function(x, y, radx, rady, rot){
        
            // Convert to degrees from radians
            rot *= Math.PI / 180;
    
            canvas.ctx.beginPath();
            canvas.ctx.ellipse(x, y, radx, rady, rot, 0, Math.PI * 2);
            canvas.ctx.stroke();
            canvas.ctx.fill();
        },
    
        circle: function(x, y, rad){
            canvas.$2d.ellipse(x, y, rad, rad, 0);
        }
    }

    // // Lines and nonfilled stuff
    // $2D.line = function(x1, y1, x2, y2){

    //     // Create a line between two points
    //     ctx.beginPath();
    //     ctx.moveTo(x1, y1);
    //     ctx.lineTo(x2, y2);
    //     ctx.stroke();
    // }

    // $2D.arc = function(x, y, radx, rady, rot, start, stop){

    //     // Convert to degrees from radians
    //     start *= Math.PI / 180;
    //     stop *= Math.PI / 180;
    //     rot *= Math.PI / 180;

    //     ctx.beginPath();
    //     ctx.ellipse(x, y, radx, rady, rot, start, stop);
    //     ctx.stroke();
    //     ctx.fill();
    // }

    // // Sets some line properties
    // $2D.weight = function(weight){
    //     ctx.lineWidth = weight;
    // }

    // $2D.buttCap = function(){
    //     ctx.lineCap = "butt";
    // }
    
    // $2D.roundCap = function(){
    //     ctx.lineCap = "round";
    // }

    // $2D.squareCap = function(){
    //     ctx.lineCap = "square";
    // }

    return canvas;
})();
