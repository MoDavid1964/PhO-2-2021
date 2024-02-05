const TABULAR = (function(){
    let tabular = {};

    tabular.instance = function(title, name, parent, columns, row_count, controls){
        this.title = title;
        this.name = name;
        this.parent = parent;
        this.columns = columns;
        this.row_count = row_count;
        this.controls = controls;
    };

    tabular.instance.prototype = {
        init: function(){

            // Instantiate the tabular
            if(!this.tabular){
                this.tabular = document.createElement('div');
    
                // Append to document so it can be modified
                document.getElementsByClassName(this.parent)[0].appendChild(this.tabular);
            }

            this.tabular.className = `${this.name}-tabular-container tabular-container`;
            this.tabular.innerHTML = `
            <div class="${this.name}-tabular tabular">
                <div class="${this.name}-tabular-header tabular-header">
                    <div class="${this.name}-tabular-header-title tabular-header-title">
                        ${this.title}
                    </div>
                    <div class="${this.name}-tabular-header-controls tabular-header-controls"></div>
                </div>
                <table class="${this.name}-tabular-table tabular-table">
                </table>
            </div>`;

            // The header controls
            let controls = Object.keys(this.controls);
            let controls_element = document.getElementsByClassName(`${this.name}-tabular-header-controls`)[0];

            for(let i = 0; i < controls.length; i++){

                // Instantiate each of the buttons
                let button = document.createElement('div');
                button.className = `${this.name}-tabular-header-controls-button tabular-header-controls-button`;
                button.innerHTML = `
                    <div class="${this.name}-tabular-header-controls-button-text tabular-header-controls-button-text">
                        ${this.controls[controls[i]].name}
                    </div>
                `;

                // Add event listener
                let action = this.controls[controls[i]].action;
                button.addEventListener('click', e => {
                    action(e);
                });

                // Append button to controls
                controls_element.appendChild(button);
            }

            // Populate the tabular with data
            let table = document.getElementsByClassName(`${this.name}-tabular-table`)[0];
            let columns = Object.keys(this.columns);
            let header_row = document.createElement('tr');
            let buffer = document.createElement('th');
            let buffer_row = document.createElement('tr');

            table.style.animationDelay = `${1}s`;
            table.style.animationName = "slide-in-down-margin";
            table.style.animationDuration = 'var(--default-transition-time)';
            table.style.animationFillMode = 'forwards';
            table.style.opacity = '0';

            header_row.className = `${this.name}-tabular-table-header-row tabular-table-header-row`;
            header_row.appendChild(document.createElement('th'));
            buffer.className = `${this.name}-tabular-table-row-data tabular-table-row-data tabular-table-row-buffer`;
            buffer.innerHTML = `<div class="${this.name}-tabular-table-row-data-text tabular-table-row-data-text tabular-table-row-buffer-text"></div>`;
            buffer_row.innerHTML = `<td><div style="display: inline-block; height: 0;"></div></td>`;

            // Header row
            for(let i = 0; i < columns.length; i++){

                // Instantiate header
                let data = document.createElement('th');
                data.className = `${this.name}-tabular-table-header-row-data tabular-table-header-row-data`;
                data.innerHTML = `<div class="${this.name}-tabular-table-header-row-data-text tabular-table-header-row-data-text">${this.columns[columns[i]].name}</div>`;

                // Append to row
                header_row.appendChild(data);

                // In case its a button
                let action = this.columns[columns[i]].action;
                if(this.columns[columns[i]].type == 'button' || this.columns[columns[i]].type == 'toggle')
                    data.addEventListener('click', e => {
                        action(e);
                    });
            }

            // Append to table
            header_row.appendChild(buffer);
            table.appendChild(header_row);

            // Data rows
            for(let i = 0; i < this.row_count; i++){

                // Instantiate row element
                let row = document.createElement('tr');
                let marker = document.createElement('td');
                let buffer = document.createElement('td');

                row.className = `${this.name}-tabular-table-row tabular-table-row`;
                row.style.animationDelay = `${i * 0.025 + 1.3}s`;
                row.style.animationName = "fade-in-full";
                row.style.animationDuration = 'var(--default-transition-time)';
                row.style.animationFillMode = 'forwards';
                row.style.opacity = '0';

                marker.className = `${this.name}-tabular-table-row-data tabular-table-row-data tabular-table-row-marker`;
                marker.innerHTML = `<div class="${this.name}-tabular-table-row-data-text tabular-table-row-data-text tabular-table-row-marker-text"></div>`;
                buffer.className = `${this.name}-tabular-table-row-data tabular-table-row-data tabular-table-row-buffer`;
                buffer.innerHTML = `<div class="${this.name}-tabular-table-row-data-text tabular-table-row-data-text tabular-table-row-buffer-text"></div>`;

                // Append marker
                row.appendChild(marker);

                for(let j = 0; j < columns.length; j++){

                    // Content of the element
                    let text = '';
                    switch(this.columns[columns[j]].type){
                        case 'text':
                        case 'button':
                            text = this.columns[columns[j]].data[i].text;
                            break;
                        case 'dichotomy-main':
                            row.className += ` tabular-table-row-${this.columns[columns[j]].data[i].text == this.columns[columns[j]].trueState ? 'positive' : 'negative'}`;
                        case 'toggle':
                        case 'dichotomy':
                            text = this.columns[columns[j]].data[i].text == this.columns[columns[j]].trueState ?
                                this.columns[columns[j]].trueValue :
                                this.columns[columns[j]].falseValue;
                            break;
                        default:
                            text = 'bruh';
                            break;
                    }

                    // Instantiate data element
                    let data = document.createElement('td');
                    data.className = `${this.name}-tabular-table-row-data tabular-table-row-data`;
                    data.innerHTML = `<div class="${this.name}-tabular-table-row-data-${this.columns[columns[j]].type} tabular-table-row-data-${this.columns[columns[j]].type} ` + 
                        `${this.columns[columns[j]].trueState == undefined ? '' : ((this.columns[columns[j]].data[i].text == this.columns[columns[j]].trueState) ^ this.columns[columns[j]].flip ? 'isTrue' : 'isFalse')}">` + 
                        `${text}</div>`;

                    // Add event listeners in case
                    switch(this.columns[columns[j]].type){
                        case 'button':
                        case 'toggle':
                            let columns_copy = this.columns;
                            let data_copy = this.columns[columns[j]];
                            data.addEventListener('click', e => {
                                data_copy.action(e, {
                                    columns: columns_copy,
                                    index: i,
                                });
                            });
                            break;
                    }

                    // Append to row
                    row.appendChild(data);
                }

                row.appendChild(buffer);

                // Append to table
                table.appendChild(row);
            }

            table.appendChild(buffer_row);
        },

        update: function(columns, row_count){
            this.columns = columns;
            this.row_count = row_count;

            this.init();
        },

        updateControls: function(controls){
            this.controls = controls;
        },

        kill: function(){
            console.log(this.tabular)
            this.tabular.parentElement.removeChild(this.tabular);
        }
    };

    return tabular;
})();