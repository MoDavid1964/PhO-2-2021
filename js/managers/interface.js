(function(){
    // Some utilities
    const keyData = {
        'account_id': {
            name: 'id',
            type: 'text',
        },
        'account_name': {
            name: 'account&nbsp;name',
            type: 'text',
        },
        'account_isAdmin': {
            name: 'admin',
            type: 'none',
            // type: 'dichotomy',
            // trueState: 1,
            // trueValue: 'admin',
            // falseValue: 'not admin',
            // flip: 0,
        },
        'account_isDisqualified': {
            name: 'account&nbsp;status',
            type: 'toggle',
            trueState: 1,
            trueValue: 'disqualified',
            falseValue: 'participating',
            flip: 1,
            action: (e, data) => {
                let disqualify = new DIALOG.instance(data.columns['account_isDisqualified'].data[data.index].text ? 'Allow?' : 'Disqualify?', 'disqualify', {
                    'yes': {
                        type: 'confirm',
                        action: e => {
                            let username = document.createElement('input');
                            let state = document.createElement('input');
                            let form = document.getElementsByTagName('form')[0];

                            // Set inpuits and stuff
                            username.value = data.columns['account_name'].data[data.index].text;
                            username.name = 'username';
                            username.style.display = 'none';

                            state.value = (1 - +data.columns['account_isDisqualified'].data[data.index].text).toString();
                            state.name = 'isDisqualified';
                            state.style.display = 'none';

                            // Configure form
                            form.appendChild(username);
                            form.appendChild(state);
                            form.method = "POST";
                            form.action = "../handlers/account-disqualify.handle.php";
                            
                            // Submit form
                            form.submit();
                        }
                    },
                    'no': {
                        type: 'deny',
                        action: e => disqualify.kill(),
                    },
                }, {}, data.columns['account_isDisqualified'].data[data.index].text ? `Do you wish to allow '${data.columns['account_name'].data[data.index].text}' to take part in the competition?` : `Do you wish to disqualify '${data.columns['account_name'].data[data.index].text}'?`);

                disqualify.init();
            }
        },
        'account_finalScore': {
            name: '1st&nbsp;score',
            type: 'text',
        },
        'account_secondScore': {
            name: '2nd&nbsp;score',
            type: 'text',
        },
        'problem_id': {
            name: 'id',
            type: 'none',
        },
        'problem_code': {
            name: 'code',
            type: 'text',
        },
        'problem_name': {
            name: 'problem&nbsp;name',
            type: 'text',
        },
        'problem_answer': {
            name: 'answer&nbsp;key',
            type: 'text',
        },
        'problem_isDisabled': {
            name: 'problem&nbsp;status',
            type: 'toggle',
            trueState: 1,
            trueValue: 'disabled',
            falseValue: 'enabled',
            flip: 1,
            action: (e, data) => {
                let disable = new DIALOG.instance(data.columns['problem_isDisabled'].data[data.index].text ? 'Enable?' : 'Disable?', 'disable', {
                    'yes': {
                        type: 'confirm',
                        action: e => {
                            let problem = document.createElement('input');
                            let state = document.createElement('input');
                            let form = document.getElementsByTagName('form')[0];

                            // Set inpuits and stuff
                            problem.value = data.columns['problem_name'].data[data.index].text;
                            problem.name = 'problem';
                            problem.style.display = 'none';

                            state.value = (1 - +data.columns['problem_isDisabled'].data[data.index].text).toString();
                            state.name = 'isDisabled';
                            state.style.display = 'none';

                            // Configure form
                            form.appendChild(problem);
                            form.appendChild(state);
                            form.method = "POST";
                            form.action = "../handlers/problem-disable.handle.php";
                            
                            // Submit form
                            form.submit();
                        }
                    },
                    'no': {
                        type: 'deny',
                        action: e => disable.kill(),
                    },
                }, {}, data.columns['problem_isDisabled'].data[data.index].text ? `Do you wish to enable the problem '${data.columns['problem_name'].data[data.index].text}' in the official problem list?` : `Do you wish to disable the problem '${data.columns['problem_name'].data[data.index].text}' from the official problem list?`);

                disable.init();
            }
        },
        'problem_hasTolerance': {
            name: 'has&nbsp;tolerance',
            type: 'toggle',
            trueState: 1,
            trueValue: 'true',
            falseValue: 'false',
            flip: 0,
            action: (e, data) => {
                let disable = new DIALOG.instance(data.columns['problem_hasTolerance'].data[data.index].text ? 'Disable?' : 'Enable?', 'tolerance', {
                    'yes': {
                        type: 'confirm',
                        action: e => {
                            let problem = document.createElement('input');
                            let tolerance = document.createElement('input');
                            let form = document.getElementsByTagName('form')[0];

                            // Set inpuits and stuff
                            problem.value = data.columns['problem_name'].data[data.index].text;
                            problem.name = 'problem';
                            problem.style.display = 'none';

                            tolerance.value = (1 - +data.columns['problem_hasTolerance'].data[data.index].text).toString();
                            tolerance.name = 'hasTolerance';
                            tolerance.style.display = 'none'
                            
                            // Configure form
                            form.appendChild(problem);
                            form.appendChild(tolerance);
                            form.method = "POST";
                            form.action = "../handlers/problem-edittolerance.handle.php";
                            
                            // Submit form
                            form.submit();
                        }
                    },
                    'no': {
                        type: 'deny',
                        action: e => disable.kill(),
                    },
                }, {}, data.columns['problem_hasTolerance'].data[data.index].text ? `Do you wish to disable tolerance for the problem '${data.columns['problem_name'].data[data.index].text}' in the official problem list?` : `Do you wish to enable tolerance for the problem '${data.columns['problem_name'].data[data.index].text}' from the official problem list?`);

                disable.init();
            }
        },
        'problem_hps': {
            name: 'max&nbsp;points',
            type: 'text',
        }
    }
    const fixData = (data, name, xtra) => {
        
        // Formats data for the table
        let formatted_data = {};
        let secondRound = {};

        data.forEach(element => {
            let keys = Object.keys(element);
            secondRound[element['account_id']] = element['account_secondScore'];

            // For each piece of info
            for(let i = 0; i < keys.length; i++){
                if(keyData[keys[i]].type == 'none')
                    continue;

                if(!formatted_data[keys[i]])
                    formatted_data[keys[i]] = {
                        data: [],
                    };

                let subKeys = Object.keys(keyData[keys[i]]);
                for(let j = 0; j < subKeys.length; j++)
                    formatted_data[keys[i]][subKeys[j]] = keyData[keys[i]][subKeys[j]];

                formatted_data[keys[i]].data.push({
                    text: element[keys[i]]
                });
            }
        });

        switch(name){
            case "accounts-overview":
                // Edit password option
                formatted_data['edit-password'] = {
                    name: 'edit&nbsp;password',
                    type: 'button',
                    data: [],
                    action: (e, data) => {
                        let editAccount = new DIALOG.instance('Edit password?', 'edit-password', {
                            'yes': {
                                type: 'confirm',
                                action: e => {
                                    let form = document.getElementsByTagName('form')[0];
                                    let inputs = document.getElementsByTagName('input');

                                    for(let i = 0; i < inputs.length; i++){
                                        if(inputs[i].value == '')
                                            return;
                                    }

                                    form.submit();
                                }
                            },
                            'no': {
                                type: 'deny',
                                action: e => editAccount.kill(),
                            },
                        }, {
                            username: {
                                name: 'username',
                                type: 'text',
                                placeholder: 'Enter username',
                            },
                            password: {
                                name: 'password',
                                type: 'password',
                                placeholder: 'Enter password',
                            },
                        }, `Do you wish to change the password for '${data.columns['account_name'].data[data.index].text}'?`);

                        editAccount.init();
                        editAccount.element.method = "POST";
                        editAccount.element.action = "../handlers/account-repassword.handle.php";

                        let form = document.getElementsByTagName('form')[0];
                        let parent = document.getElementsByClassName('dialog-box-body')[0];
                        let inputs = document.getElementsByTagName('input');

                        // Submit form on enter press
                        parent.addEventListener('keypress', e => { 
                            if(e.which == 13){
                                for(let i = 0; i < inputs.length; i++)
                                    if(inputs[i].value == '') return;
                                
                                form.submit();
                            }
                        });
                    }
                };
                data.forEach(() => { formatted_data['edit-password'].data.push({ text: 'edit password' }) });
                break;

            case "second-round":
                // The empty string
                let empty = []; if(!xtra) xtra = [];
                for(let i = 0; i < xtra.length; i++){ empty.push(0) }

                Object.keys(secondRound).forEach(key => {
                    secondRound[key] = secondRound[key] == '0' ? empty : secondRound[key].split(',');
                });

                for(let i = 0; i < xtra.length; i++){

                    let code = xtra[i].problem_code;
                    formatted_data[`z${code}`] = {
                        name: code,
                        type: 'button',
                        data: [],
                        action: (e, data) => {
                            let editAnswer = new DIALOG.instance('Edit score?', 'edit-score', {
                                'yes': {
                                    type: 'confirm',
                                    action: e => {
                                        let form = document.getElementsByTagName('form')[0];
                                        let inputs = document.getElementsByTagName('input');
    
                                        for(let i = 0; i < inputs.length; i++){
                                            if(inputs[i].value == '')
                                                return;
                                        }
    
                                        form.submit();
                                    }
                                },
                                'no': {
                                    type: 'deny',
                                    action: e => editAnswer.kill(),
                                },
                            }, {
                                account: {
                                    name: 'account',
                                    type: 'none',
                                    value: data.columns['account_id'].data[data.index].text,
                                    placeholder: '',
                                },
                                score: {
                                    name: 'score',
                                    type: 'text',
                                    placeholder: 'Enter score',
                                },
                            }, `Do you wish to edit the score for ${data.columns['account_name'].data[data.index].text} for problem ${xtra[i].problem_code}? It's currently ${secondRound[data.columns['account_id'].data[data.index].text][+xtra[i].problem_code - 1]}.`);
    
                            editAnswer.init();
                            editAnswer.element.method = "POST";
                            editAnswer.element.action = "../handlers/account-editscore.handle.php";
    
                            let form = document.getElementsByTagName('form')[0];
                            let parent = document.getElementsByClassName('dialog-box-body')[0];
                            let inputs = document.getElementsByTagName('input');
    
                            // Submit form on enter press
                            parent.addEventListener('keypress', e => { 
                                if(e.which == 13){
                                    for(let i = 0; i < inputs.length; i++)
                                        if(inputs[i].value == '') return;
                                    
                                    form.submit();
                                }
                            });
                        }
                    };

                    data.forEach(element => { formatted_data[`z${code}`].data.push({ text: `${secondRound[element.account_id][+code - 1]}` }) });
                }
                break;

            case "problems-1":
                // Disable option
                formatted_data['edit-answer'] = {
                    name: 'edit&nbsp;answer',
                    type: 'button',
                    data: [],
                    action: (e, data) => {
                        let editAnswer = new DIALOG.instance('Edit answer?', 'edit-answer', {
                            'yes': {
                                type: 'confirm',
                                action: e => {
                                    let form = document.getElementsByTagName('form')[0];
                                    let inputs = document.getElementsByTagName('input');

                                    for(let i = 0; i < inputs.length; i++){
                                        if(inputs[i].value == '')
                                            return;
                                    }

                                    form.submit();
                                }
                            },
                            'no': {
                                type: 'deny',
                                action: e => editAnswer.kill(),
                            },
                        }, {
                            problem: {
                                name: 'problem',
                                type: 'text',
                                placeholder: 'Enter problem name',
                            },
                            answer: {
                                name: 'answer',
                                type: 'text',
                                placeholder: 'Enter new answer',
                            },
                        }, `Do you wish to edit the answer key for the problem '${data.columns['problem_name'].data[data.index].text}'? It's currently '${data.columns['problem_answer'].data[data.index].text}'.`);

                        editAnswer.init();
                        editAnswer.element.method = "POST";
                        editAnswer.element.action = "../handlers/problem-editanswer.handle.php";

                        let form = document.getElementsByTagName('form')[0];
                        let parent = document.getElementsByClassName('dialog-box-body')[0];
                        let inputs = document.getElementsByTagName('input');

                        // Submit form on enter press
                        parent.addEventListener('keypress', e => { 
                            if(e.which == 13){
                                for(let i = 0; i < inputs.length; i++)
                                    if(inputs[i].value == '') return;
                                
                                form.submit();
                            }
                        });
                    }
                };

                data.forEach(() => { formatted_data['edit-answer'].data.push({ text: 'edit&nbsp;answer' }) });

            case "problems-2":
                formatted_data['edit-code'] = {
                    name: 'edit&nbsp;code',
                    type: 'button',
                    data: [],
                    action: (e, data) => {
                        let editCode = new DIALOG.instance('Edit code?', 'edit-code', {
                            'yes': {
                                type: 'confirm',
                                action: e => {
                                    let form = document.getElementsByTagName('form')[0];
                                    let inputs = document.getElementsByTagName('input');

                                    for(let i = 0; i < inputs.length; i++){
                                        if(inputs[i].value == '')
                                            return;
                                    }

                                    form.submit();
                                }
                            },
                            'no': {
                                type: 'deny',
                                action: e => editCode.kill(),
                            },
                        }, {
                            problem: {
                                name: 'problem',
                                type: 'text',
                                placeholder: 'Enter problem name',
                            },
                            code: {
                                name: 'code',
                                type: 'text',
                                placeholder: 'Enter new problem code',
                            },
                        }, `Do you wish to edit the problem code for '${data.columns['problem_name'].data[data.index].text}'? It's currently '${data.columns['problem_code'].data[data.index].text}'.`);

                        editCode.init();
                        editCode.element.method = "POST";
                        editCode.element.action = `../handlers/problem${hash.split('-')[1]}-editcode.handle.php`;

                        let form = document.getElementsByTagName('form')[0];
                        let parent = document.getElementsByClassName('dialog-box-body')[0];
                        let inputs = document.getElementsByTagName('input');

                        // Submit form on enter press
                        parent.addEventListener('keypress', e => { 
                            if(e.which == 13){
                                for(let i = 0; i < inputs.length; i++)
                                    if(inputs[i].value == '') return;
                                
                                form.submit();
                            }
                        });
                    }
                };    
                
                data.forEach(() => { formatted_data['edit-code'].data.push({ text: 'edit&nbsp;code' }) });    
                break;
        }

        return formatted_data;
    }
    const updateTable = (data, name) => {
        data_table.update(fixData(data, name), data.length);
    }

    // Layout of the UI
    let data_table;
    let interface_panel = new PANEL.instance('Manager', 'interface', 'left-side-panel', {
        'accounts overview': { redirect: '#Accounts-Overview' },
        'second round': { redirect: '#Second-Round' },
        'problems (1)': { redirect: '#Problems-1' },
        'problems (2)': { redirect: '#Problems-2' },
    });

    // Initialize the left side panel
    interface_panel.init();

    // Get the hash
    let hash = window.location.href.split('#')[1];
    if(!hash) (window.location.href = window.location.href.split('#')[0] + '#Accounts') && window.location.reload();

    // Initialize the data table
    data_table = new TABULAR.instance(hash.replace(/\-/g, ' '), hash, 'right-side-content', {}, 0, {});

    switch(hash.toLowerCase()){
        case 'accounts-overview':
            keyData['account_isDisqualified'].type = 'toggle';
            keyData['account_secondScore'].type = 'text';

            MANAGER.getAccounts(updateTable, [hash.toLowerCase()]);
            data_table.updateControls({
                add: {
                    name: 'add account',
                    action: (e, data) => {
                        let addAccount = new DIALOG.instance('Add account', 'addAccount', {
                            'add': {
                                type: 'confirm',
                                action: e => {
                                    let form = document.getElementsByTagName('form')[0];
                                    let inputs = document.getElementsByTagName('input');

                                    for(let i = 0; i < inputs.length; i++){
                                        if(inputs[i].value == '')
                                            return;
                                    }

                                    form.submit();
                                }
                            },
                            'cancel': {
                                type: 'deny',
                                action: e => addAccount.kill(),
                            }
                        }, {
                            username: {
                                name: 'username',
                                type: 'text',
                                placeholder: 'Enter username',
                            },
                            email: {
                                name: 'email',
                                type: 'text',
                                placeholder: 'Enter email address',
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                placeholder: 'Enter account category',
                            },
                            password: {
                                name: 'password',
                                type: 'password',
                                placeholder: 'Enter password',
                            },
                        }, 'Register a new account with the specified details.');

                        addAccount.init();
                        addAccount.element.method = "POST";
                        addAccount.element.action = "../handlers/account-add.handle.php";

                        let form = document.getElementsByTagName('form')[0];
                        let parent = document.getElementsByClassName('dialog-box-body')[0];
                        let inputs = document.getElementsByTagName('input');

                        // Submit form on enter press
                        parent.addEventListener('keypress', e => { 
                            if(e.which == 13){
                                for(let i = 0; i < inputs.length; i++)
                                    if(inputs[i].value == '') return;
                                
                                form.submit();
                            }
                        });
                    }
                }
            });
            break;

        case 'second-round':
            keyData['account_isDisqualified'].type = 'none';
            keyData['account_secondScore'].type = 'none';
            MANAGER.getSecondRound((data, name) => {
                data_table.update(fixData(data.accounts, name, data.problems), data.accounts.length);
            }, [hash.toLowerCase()]);
            break;

        case 'problems-1':
        case 'problems-2':
            MANAGER.getProblems(updateTable, [hash.toLowerCase()]);
            break;
    }

    console.log(hash.toLowerCase());
})();
