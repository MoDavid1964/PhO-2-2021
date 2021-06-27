/*
    A header file for defining scroll behaviour
    within a webpage (makes it smoother and easier
    to customize; css scrolling can also be a bit
    buggy).
*/

const SCROLLBAR = (function(){

    // Constructor for scroll bar
    let scrollbars = [];
    let scroll = function(classname, targetname, 
        baseline, maximum, targetbase, targetmax){

        // The scroll bar and target element
        let bar = document.getElementsByClassName(classname)[0];
        let target = document.getElementsByClassName(targetname)[0];

        this.bar = bar;
        this.target = target;
        
        // Scroll bar details
        this.height = parseInt(bar.offsetHeight);
        this.theight = parseInt(target.offsetHeight);
        this.base = baseline; this.max = maximum;
        this.tbase = targetbase; this.tmax = targetmax;

        // offset and whether or not being held
        this.offset = 0;
        this.scroll = baseline;
        this.holding = false;

        scrollbars.push(this);
        return this;
    };

    scroll.prototype.init = function(){

        // Set the current scroll value
        this.bar.style.top = `${this.base}px`;
        this.target.style.top = `${this.tbase}px`;
        let instance = this;

        // Create and add the event listeners
        this.bar.addEventListener("mousedown", e => { 
            this.holding = true;
            this.offset = e.clientY - this.scroll;
        });

        this.bar.addEventListener("mouseover", e =>{
            instance.hover();
        });

        this.bar.addEventListener("mouseout", e => {
            instance.reset();
        });

        return this;
    }

    // Scroll bar state methods
    scroll.prototype.hover = function(){
        this.bar.style.background = "rgba(155, 155, 225, 1)";
    }

    scroll.prototype.hold = function(){
        this.bar.style.background = "rgba(185, 185, 235, 1)";
    }

    scroll.prototype.letgo = function(){
        this.holding = false;
    }

    scroll.prototype.update = function(){

        // How much the target should be offset
        let targetscroll = this.tbase + (this.scroll - this.base) / 
            (this.max - this.base - this.height) * 
            (this.theight + this.tbase - this.tmax);

        // Smooth movement
        this.bar.style.top = `${parseInt(this.bar.style.top) - 
            (parseInt(this.bar.style.top) - this.scroll) / 3}px`;
        this.target.style.top = `${parseInt(this.target.style.top) - 
            (parseInt(this.target.style.top) - targetscroll) / 3}px`;
    }

    scroll.prototype.reset = function(){
        this.bar.style.background = "rgba(155, 155, 155, 1)";
    }

    // Handle dragging the scrollbars
    document.addEventListener("mouseup", e => {
        for(let i = 0; i < scrollbars.length; i++){
            scrollbars[i].letgo();
            scrollbars[i].reset();
        }
    });

    document.addEventListener("mousemove", e => {
        for(let i = 0; i < scrollbars.length; i++){
            if(scrollbars[i].holding){
                scrollbars[i].hold();

                if(e.clientY - scrollbars[i].offset < scrollbars[i].base){
                    scrollbars[i].scroll = scrollbars[i].base;
                } else if(e.clientY - scrollbars[i].offset > 
                    scrollbars[i].max - scrollbars[i].height){
                    scrollbars[i].scroll = scrollbars[i].max - 
                        scrollbars[i].height;
                } else {
                    scrollbars[i].scroll = e.clientY - scrollbars[i].offset;
                }
            }
        }
    });

    // Update all scroll bars
    scroll.update = function(){
        for(let i = 0; i < scrollbars.length; i++)
            scrollbars[i].update();
    }

    // Constantly update the scrollbars
    scroll.start = function(){
        LOOP.execute("scrollbars", scroll.update, 60);
    }

    return scroll;
})();

// Means the script has succesfully been loaded
(function(){
    window.PROCEED = true;
})();