const DIALOG = (function(){

    // Constructor
    let dialog = function(title, message, options){
        this.title = title;
        this.message = message;
        this.options = options;
        this.boolean = false;
    };

    // Open the dialog box
    dialog.prototype.open = function(){
        this.blackout = document.createElement("div");
        this.box = document.createElement("div");
        let body = document.getElementsByTagName("body")[0];

        this.blackout.className = "dialog-blackout";
        this.box.className = "dialog-box";

        // The actual content
        this.box.innerHTML = `
            <div class="dialog-box-header">
                <div class="dialog-box-header-text">
                    ${this.title}
                </div>
            </div>
            <div class="dialog-box-body">
                <div class="dialog-box-body-text-container">
                    <div class="dialog-box-body-text">
                        ${this.message}
                    </div>
                </div>
                <div class="dialog-box-body-buttons-container">
                    <div class="dialog-box-body-buttons">
                    </div>
                </div>
            </div>`;

        // Append the content to the page
        body.appendChild(this.blackout);
        body.appendChild(this.box);

        // Fix the buttons
        let buttons = document.getElementsByClassName("dialog-box-body-buttons")[0];
        let option_keys = Object.keys(this.options);
        for(let i = 0; i < option_keys.length; i++){

            // Some needed references
            let option = document.createElement("div");
            window.dialog = this;

            // Set up the elements
            option.className = "dialog-box-body-buttons-option";
            option.innerHTML = `
                <div class="option-button">
                    <a href="#"
                        style="background: ${this.options[option_keys[i]].background};" 
                        onclick="${this.options[option_keys[i]].callback}(window.dialog)"
                        onmouseout="this.style.background=\'${this.options[option_keys[i]].background}\'"
                        onmouseover="this.style.background=\'${this.options[option_keys[i]].hover}\'">
                        ${this.options[option_keys[i]].name}
                    </a>
                </div>`;

            // Append the button
            buttons.appendChild(option);
        }
    }

    // Close the dialog box
    dialog.prototype.close = function(){
        let body = document.getElementsByTagName("body")[0];

        // Remove contents and dialog
        body.removeChild(this.blackout);
        body.removeChild(this.box);

        // Reset window.ref
        window.dialog = null;
    }

    // Functions for determining the state of the dialog 
    dialog.prototype.setTrue = function(){
        this.boolean = true;
    }

    dialog.prototype.setFalse = function(){
        this.boolean = false;
    }

    return dialog;
})();