/*
    Allows instantiation of dialogs and stuffs
    as well as general handling of dialogs.
*/

const DIALOG = (function(){
    let dialog = {};

    // Instantiable dialog
    dialog.instance = function(title, name, options, fields, message){
        this.title = title;
        this.name = name;
        this.options = options;
        this.fields = fields;
        this.message = message;
    }

    // Some non-static methods
    dialog.instance.prototype = {

        // Initialization function for the dialog box
        init: function(){

            // Configure the blackout
            this.blackout = document.createElement('div');
            this.blackout.className = 'dialog-blackout';

            // Dummy target
            let target = document.getElementById('dummytarget');
            let name = this.name;

            if(!target){
                target = document.createElement('iframe');
                target.style.display = 'none';
                target.name = 'dummytarget';
                target.onload = () => {
                    let response = JSON.parse(target.contentWindow.document.body.innerHTML);

                    if(response.success) return new WARNING.instance("Success!", 'success', `${name}-success`, response.response) && setTimeout(() => {
                        window.location.reload();
                    }, 1250);
                    return new WARNING.instance("Oops! Something went wrong.", 'failure', `${name}-failure`, response.response);
                }

                // Include it in the DOM
                document.body.appendChild(target);
            }

            // Configure the parent element
            this.element = document.createElement('form');
            this.element.className = `dialog-box-container`;
            this.element.target = 'dummytarget';
            this.element.innerHTML = `
            <div class="${this.name}-dialog-box dialog-box">
                <div class="${this.name}-dialog-box-header dialog-box-header">
                    <div class="${this.name}-dialog-box-header-title dialog-box-header-title">${this.title}</div>
                    ${this.message ? ('<table class="' + this.name + '-dialog-box-header-message dialog-box-header-message"><tr>' +
                        '<td class="' + this.name + '-dialog-box-header-message-line dialog-box-header-message-line"><td>' +
                        '<td class="' + this.name + '-dialog-box-header-message-text dialog-box-header-message-text">' + 
                            this.message + '</td>' + 
                    '</tr></table>') : ''}
                </div>
                <div class="${this.name}-dialog-box-body dialog-box-body">
                    <div class="${this.name}-dialog-box-body-fields dialog-box-body-fields"></div>
                    <div class="${this.name}-dialog-box-body-options dialog-box-body-options"></div>
                </div>
            </div>`;

            // Append to body so buttons can then be appended
            document.getElementsByTagName('body')[0].appendChild(target);
            document.getElementsByTagName('body')[0].appendChild(this.blackout);
            document.getElementsByClassName('dialog-blackout')[0].appendChild(this.element);

            // Configure the option buttons
            let options = Object.keys(this.options);
            let options_element = document.getElementsByClassName(`${this.name}-dialog-box-body-options`)[0];

            for(let i = 0; i < options.length; i++){

                // Instantiate each of the buttons then append
                let option = document.createElement('div');
                option.className = `${this.name}-dialog-box-body-option ${options[i]}-option dialog-box-body-option dialog-box-body-option-${this.options[options[i]].type}`;
                option.innerHTML = `${options[i]}`;

                // Add event listener
                let action = this.options[options[i]].action;
                option.addEventListener('click', e => {
                    action(e);
                })

                // Append to parent element
                options_element.appendChild(option);
            }

            if(!this.fields) return;
            if(!Object.keys(this.fields).length) return;

            // Configure the fields in case there are any
            let fields = Object.keys(this.fields);
            let fields_element = document.getElementsByClassName(`${this.name}-dialog-box-body-fields`)[0];

            for(let i = 0; i < fields.length; i++){

                // Instantiate each of the fields then append
                let field = null;
                switch(this.fields[fields[i]].type){
                    case 'text':
                    case 'password':
                        field = document.createElement('input');
                        field.className = `${this.name}-dialog-box-body-field ${fields[i]}-option dialog-box-body-field`;
                        field.type = `${this.fields[fields[i]].type}`;
                        field.placeholder = `${this.fields[fields[i]].placeholder}`;
                        field.innerHTML = `${fields[i]}`;
                    break;
                    case 'select':
                        let contents = '';
                        field = document.createElement('select');
                        field.className = `${this.name}-dialog-box-body-select ${fields[i]}-select dialog-box-body-select`;

                        for(let j = 0; j < this.fields[fields[i]].selection.length; j++)
                            contents += `<option class="${this.name}-dialog-box-body-select-option ${fields[i]}-select-option dialog-box-body-select-option" value="${this.fields[fields[i]].selection[j].code}">${this.fields[fields[i]].selection[j].text}</option>\n`;

                        field.innerHTML = contents;
                    break;
                    case 'none':
                        field = document.createElement('input');
                        field.className = `${this.name}-dialog-box-body-field ${fields[i]}-option dialog-box-body-field`;
                        field.type = `${this.fields[fields[i]].type}`;
                        field.placeholder = `${this.fields[fields[i]].placeholder}`;
                        field.value = `${this.fields[fields[i]].value}`;
                        field.innerHTML = `${fields[i]}`;
                        field.style.display = 'none';
                    break;
                }

                field.name = `${this.fields[fields[i]].name}`;

                // Append to parent element
                fields_element.appendChild(field);
            }
        },

        // Kills the dialog box
        kill: function(){
            this.blackout.style.animationName = 'fade-out-full';
            setTimeout(() => {
                
                // Retrieve blackout elemenet
                let blackout = document.getElementsByClassName('dialog-blackout')[0];
                if(!blackout) return;

                // Remove the dialog box
                blackout.parentElement.removeChild(blackout);
            }, 199)
        }
    }

    return dialog;
})();