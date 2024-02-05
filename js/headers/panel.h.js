const PANEL = (function(){
    let panel = {};

    panel.instance = function(title, name, parent, buttons){
        this.title = title;
        this.name = name;
        this.parent = parent;
        this.buttons = buttons;
    };

    panel.instance.prototype = {
        
        // Initialize the panel instance
        init: function(){

            // Extract hash
            let hash = window.location.href.split('#')[1];

            // Create the panel
            let panel = document.createElement('div');
            panel.className = `${this.name}-panel-container panel-container`;
            panel.innerHTML = `<div class="${this.name}-panel panel">
                <div class="${this.name}-panel-title panel-title">
                    <div class="${this.name}-panel-title-text panel-title-text">
                        ${this.title}
                    </div>
                </div>
            </div>`;
            
            // Instantiate each of the buttons and append them to panel
            let buttons = Object.keys(this.buttons);
            for(let i = 0; i < buttons.length; i++){

                // Button instance
                let button = document.createElement('div');
                button.className = `${this.name}-panel-button panel-button`;
                button.style.animationDelay = `${i * 0.1 + 1}s`;
                button.style.animationName = "slide-in-left-margin";
                button.style.animationDuration = 'var(--default-transition-time)';
                button.style.animationFillMode = 'forwards';
                button.style.opacity = '0';
                button.innerHTML = `
                <div class="${this.name}-panel-button-text-container panel-button-text-container">
                    <div class="${this.name}-panel-button-text panel-button-text">
                        ${buttons[i]}
                    </div>
                </div>`;

                // If selected
                if(`#${hash}` == this.buttons[buttons[i]].redirect)
                    button.className += ' panel-button-selected';
                
                // Append child
                panel.appendChild(button);

                // Carry out the specified action
                let redirect = this.buttons[buttons[i]].redirect;
                button.addEventListener('click', e => {
                    if(`#${hash}` == redirect) return;
                    if(redirect == '#-') return this.buttons[buttons[i]].action();

                    window.location.href = window.location.href.split('#')[0] + redirect;
                    window.location.reload();
                });
            }

            document.getElementsByClassName(this.parent)[0].appendChild(panel);
        }
    };

    return panel;
})();