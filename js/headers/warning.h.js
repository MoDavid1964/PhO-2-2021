const WARNING = (function(){
    let warning = {};

    // Queue of warnings
    warning.timeout = 2000;
    warning.queue = [];
    warning.current = false;

    // Instantiable warning
    warning.instance = function(title, type, name, message){
        this.title = title;
        this.type = type;
        this.name = name;
        this.message = message;

        // Append to the queue
        if(!warning.queue.length){
            warning.queue.push(this);
        } else {
            if(warning.queue[warning.queue.length - 1].name != name){
                warning.queue.push(this);
            }

            warning.queue[0].kill();
        }
    }

    warning.instance.prototype = {
        init: function(){

            // Configure the warning
            this.element = document.createElement('div');
            this.element.className = `warning-container`;
            this.element.innerHTML = `
                <div class="warning warning-${this.type}">
                    <div class="warning-header warning-header-${this.type}">
                        <div class="warning-header-title warning-header-title-${this.type}">
                            ${this.title}
                        </div>
                    </div>
                    <div class="warning-body warning-body-${this.type}">
                        <div class="warning-body-message warning-body-message${this.type}">
                            ${this.message}
                        </div>
                    </div>
                </div>
            `;

            // Push warning to body
            document.getElementsByTagName('body')[0].appendChild(this.element);

            // Kill the warning after specified amount of time
            setTimeout(() => {
                this.kill();
            }, warning.timeout);
        },

        kill: function(){
            this.element.parentElement.removeChild(this.element);
            
            warning.current = false;
            warning.queue.shift();
        },
    }

    warning.update = () => {

        // Keep running it
        requestAnimationFrame(warning.update);

        // If no new warnings, just skip
        if(!warning.queue.length){
            warning.current = false;
            return;
        }

        // Otherwise, run em one by one or remove once run
        if(!warning.current){
            warning.current = true;
            warning.queue[0].init();
        }
    }

    return warning;
})();

WARNING.update();