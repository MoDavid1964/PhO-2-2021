
const MANAGER = (function(){
    let manager = {};

    // Retrieve account data
    manager.getAccounts = (callback, inputs) => {

        // Fetch account
        fetch(`../../../php/handlers/account-list1.handle.php?limit=128`)
            .then(response => response.json())
            .then(data => {

                // Do the thing with the data
                callback(data, ...inputs);
            }).catch();
    }

    // Retrieve sheet for second round shit
    manager.getSecondRound = (callback, inputs) => {

        fetch(`../../../php/handlers/problem2-list.handle.php?limit=128`)
            .then(response => response.json())
            .then(data => {

                // Sort by problem code fuckersss
                data.sort((o_a, o_b) => {
                    let a = o_a.problem_code, b = o_b.problem_code;
                    let lettera = a.slice(-1).charCodeAt(0) - 96, letterb = b.slice(-1).charCodeAt(0) - 96;
                    
                    if(lettera < 1 || lettera > 26) lettera = 0;
                    if(letterb < 1 || letterb > 26) letterb = 0;
                    
                    return lettera + parseInt(a) * 27 - letterb - parseInt(b) * 27
                })

                // Fetch account
                fetch(`../../../php/handlers/account-list2.handle.php?limit=128`)
                    .then(response2 => response2.json())
                    .then(data2 => {

                        console.log({data, data2})

                        // Do the thing with the data
                        callback({ 
                            'accounts': data2,
                            'problems': data 
                        }, ...inputs);       
                    }).catch();

            }).catch();
    }

    // Retrieve problem data
    manager.getProblems = (callback, inputs) => {

        let link = `../../../php/handlers/problem${inputs[0].split('-')[1]}-list.handle.php?limit=128`;

        // Fetch account
        fetch(link)
            .then(response => response.json())
            .then(data => {

                // Sort by problem code fuckersss
                data.sort((o_a, o_b) => {
                    let a = o_a.problem_code, b = o_b.problem_code;
                    let lettera = a.slice(-1).charCodeAt(0) - 96, letterb = b.slice(-1).charCodeAt(0) - 96;
                    
                    if(lettera < 1 || lettera > 26) lettera = 0;
                    if(letterb < 1 || letterb > 26) letterb = 0;
                    
                    return lettera + parseInt(a) * 27 - letterb - parseInt(b) * 27
                })

                // Do the thing with the data
                callback(data, ...inputs);
            }).catch();
    }

    // Retrieve problem data
    manager.getLeaderboard = (callback, inputs) => {

        let cat = inputs[0].split('-').slice(-1);
        let link = `../../../php/handlers/leaderboard-list.handle.php?`;

        if(cat == 'jhs') link = `../../../php/handlers/leaderboard-list-jhs.handle.php?`;
        if(cat == 'shs') link = `../../../php/handlers/leaderboard-list-shs.handle.php?`;

        // Fetch account
        fetch(link)
            .then(response => response.json())
            .then(data => {

		data.sort((a, b) => {
			return b.account_name.localeCompare(a.account_name);
		});

                // Do the thing with the data
                callback(data, ...inputs);
            }).catch();
    }

    return manager;
})();
