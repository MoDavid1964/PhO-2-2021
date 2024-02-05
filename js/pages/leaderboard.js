
(function(){
    let data_table; 
    let leaderboard_panel = new PANEL.instance('Leaderboard', 'leaderboard', 'left-side-panel', {
        'tentative ranking - all': { redirect: '#Tentative-Ranking-All' },
        'tentative ranking - jhs': { redirect: '#Tentative-Ranking-JHS' },
        'tentative ranking - shs': { redirect: '#Tentative-Ranking-SHS' },
        'final ranking - jhs': { redirect: '#Final-Ranking-JHS' },
        'final ranking - shs': { redirect: '#Final-Ranking-SHS' },
        'final ranking - all': { redirect: '#Final-Ranking-All' },
    });

    leaderboard_panel.init();

    const keyData = {
        'account_id': {
	    name: 'ranking',
            type: 'text',
        },
        'account_name': {
            name: 'team&nbsp;name',
            type: 'text',
        },
        'account_baseScore': {
            name: 'base&nbsp;score&nbsp;/&nbsp;236',
            type: 'text',
        },
        'account_finalScore': {
            name: 'final&nbsp;score',
            type: 'none',
        },
        'account_catScore': {
            name: 'final&nbsp;score',
            type: 'text',
        },
    };
    const fixData = (data, name) => {
        
        // Formats data for the table
        let formatted_data = {};

        switch(name.split('-')[0]){
            case 'tentative':
                data.sort((a, b) => - parseFloat(a.account_baseScore) + parseFloat(b.account_baseScore));
                break;
            case 'final':
                data.sort((a, b) => - parseFloat(a.account_catScore) + parseFloat(b.account_catScore));
                break;
        }

        let index = 0, ranking = 0;
        let previous = -1;
        data.forEach(entry => {
            index++;
	if(name.split('-')[0] == 'tentative'){
            if(previous != entry.account_baseScore){ 
                ranking = index;
            }
	} else {
		ranking = index;
	}

            entry.account_id = ranking;
            previous = entry.account_baseScore;
        });

	data.sort((a, b) => {
		let rankinga = a.account_id < 10 ? `0${a.account_id}` : a.account_id;
		let rankingb = b.account_id < 10 ? `0${b.account_id}` : b.account_id;
		return (rankinga + a.account_name).localeCompare(rankingb + b.account_name);
	});

	data.reverse();

        data.forEach(element => {
            let keys = Object.keys(element);

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

                // Store value and modify when necessary
                let value = element[keys[i]];
                if(keyData[keys[i]].modifier) value = keyData[keys[i]].modifier(value);

                formatted_data[keys[i]].data.unshift({
                    text: value
                });
            }
        });

        return formatted_data;
    }

    const updateData = (data, name) => {
        data_table.update(fixData(data, name), data.length);
    }

    // Get the hash
    let hash = window.location.href.split('#')[1];
    if(!hash) (window.location.href = window.location.href.split('#')[0] + '#Tentative-Ranking-All') && window.location.reload();

    // Initialize the data table
    data_table = new TABULAR.instance(hash.replace(/\-/g, ' '), hash, 'right-side-content', {}, 0, {});

    // The different pages
    switch(hash.toLowerCase()){
        case 'tentative-ranking-all':
            MANAGER.getLeaderboard(updateData, ['tentative-all']);
            break;
        case 'tentative-ranking-jhs':
            MANAGER.getLeaderboard(updateData, ['tentative-jhs']);
            break;
        case 'tentative-ranking-shs':
            MANAGER.getLeaderboard(updateData, ['tentative-shs']);
            break;
        case 'final-ranking-jhs':
            MANAGER.getLeaderboard(updateData, ['final-jhs']);
            break;
        case 'final-ranking-shs':
            MANAGER.getLeaderboard(updateData, ['final-shs']);
            break;
        case 'final-ranking-all':
            MANAGER.getLeaderboard(updateData, ['final-all']);
            break;
    }

    // Even if users change this it wont actually give them any privileges dw
    if(+localStorage.getItem('admin')){
        data_table.updateControls({
            add: {
                name: 'update leaderboard',
                action: (e, data) => {
                    let updateLeaderboard = new DIALOG.instance('Update leaderboard', 'updateLeaderboard', {
                        'ok': {
                            type: 'confirm',
                            action: e => {
                                let form = document.getElementsByTagName('form')[0];
                                let inputs = document.getElementsByTagName('input');

                                form.submit();

                                setTimeout(() => {
                                    window.location.reload();
                                }, 100);
                            }
                        },
                        'cancel': {
                            type: 'deny',
                            action: e => addAccount.kill(),
                        }
                    }, {}, 'Update the rankings on the leaderboard.');

                    updateLeaderboard.init();
                    updateLeaderboard.element.method = "POST";
                    updateLeaderboard.element.action = "../handlers/leaderboard-compute.handle.php";

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
    }
})();
