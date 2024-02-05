(async function(){

    // Embed the pdf of the problem list
    const embedProblems = () => {

        // Create and iframe for the problems and configure it
        let problems = document.createElement('iframe');
        problems.className = 'problems-iframe';
        problems.src = 'https://drive.google.com/file/d/17rpxdGWUqybeU43HjUCf1RAHd338v-_R/preview';

        problems.width = window.innerWidth * 0.775;
        problems.height = window.innerHeight - window.innerWidth * 0.055;   

        window.addEventListener("resize", () => {
            problems.width = window.innerWidth * 0.775;
            problems.height = window.innerHeight - window.innerWidth * 0.055;
        });

        document.getElementsByClassName('right-side-content')[0].appendChild(problems);
    }

    const embedSubmissions = () => {
        
        // Create an iframe for the submissions and configure it
        let submissions = document.createElement('iframe');
        submissions.className = 'submissions-iframe';
        submissions.src = 'https://docs.google.com/forms/d/e/1FAIpQLSf10fZ4FRw95VhdyD1VJdUo8pcT7N4OLmezJ0NXM1T7QZ5PbA/viewform?usp=sf_link';

        submissions.width = window.innerWidth * 0.775;
        submissions.height = window.innerHeight - window.innerWidth * 0.055;   

        window.addEventListener("resize", () => {
            submissions.width = window.innerWidth * 0.775;
            submissions.height = window.innerHeight - window.innerWidth * 0.055;
        });

        document.getElementsByClassName('right-side-content')[0].appendChild(submissions);
    }

    // Layout of the UI
    let data_table; 
    let problems_panel = new PANEL.instance('Problems', 'problems', 'left-side-panel', {
        'all problems': { redirect: '#All-Problems' },
        'submissions': { redirect: '#Submissions' },
    });

    problems_panel.init();

    const keyData = {
        'submission_id': {
            type: 'none',
        },
        'submission_problem': {
            name: 'problem&nbsp;name',
            type: 'text',
        },
        'submission_answer': {
            name: 'submitted&nbsp;answer',
            type: 'text',
        },
        'submission_verdict': {
            name: 'verdict',
            type: 'dichotomy-main',
            trueState: 1,
            trueValue: 'correct',
            falseValue: 'wrong',
            flip: 0,
        },
        'submission_timestamp': {
            name: 'submission&nbsp;timestamp',
            type: 'text',
            modifier: time => {
                let date = new Date(time);
                return date.toString().split(" ").slice(1, 5).join(" ");    
            }
        }
    };
    const fixData = (data) => {
        
        // Formats data for the table
        let formatted_data = {};

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
    const updateData = (data) => {
        data_table.update(fixData(data), data.length);
    }

    // Get the hash
    let hash = window.location.href.split('#')[1];
    if(!hash) (window.location.href = window.location.href.split('#')[0] + '#All-Problems') && window.location.reload();

    // Initialize the data table
    data_table = new TABULAR.instance(hash.replace(/\-/g, ' '), hash, 'right-side-content', {}, 0, {});

    // The different pages
    switch(hash.toLowerCase()){
        case 'all-problems':
            embedProblems();
            break;
        case 'submissions':

            // Just a timer and shit
            window.onload = () => {
                
                // Some delay just to be safe
                setTimeout(() => {
                    let title = document.getElementsByClassName('Submissions-tabular-header-title')[0]; 

                    // Update the timer yes
                    setInterval(() => {
                        let timeLeft = "";
                        let timestamp = Date.now();

                        // Format the timer
                        timeLeft = Math.floor((5 - (timestamp - localStorage.getItem('lastSubmit')) / (1000 * 60))) + 
                            ':' + Math.floor(60 - (((timestamp - localStorage.getItem('lastSubmit')) / 1000) % 60));

                        if(Math.floor(60 - (((timestamp - localStorage.getItem('lastSubmit')) / 1000) % 60)) < 10)
                            timeLeft = timeLeft.split(':')[0] + ':0' + timeLeft.split(':')[1];

                        // If already more than five minutes
                        if(timestamp - localStorage.getItem('lastSubmit') > 1000 * 60 * 5) timeLeft = '0:00';

                        title.innerHTML = `Submissions — [${timeLeft}]`;
                    }, 1000 / 20)
                }, 1000)
            }

            // The enabled problems
            let enabled_problems = [];
            await fetch('/php/handlers/problem-userlist.handle.php')
                .then(response => response.json())
                .then(data => {

		    // Sort by problem code fuckersss
            	    data.sort((o_a, o_b) => {
                	let a = o_a.problem_code, b = o_b.problem_code;
        	        let lettera = a.slice(-1).charCodeAt(0) - 96, letterb = b.slice(-1).charCodeAt(0) - 96;

	                if(lettera < 1 || lettera > 26) lettera = 0;
        	        if(letterb < 1 || letterb > 26) letterb = 0;

        	        return lettera + parseInt(a) * 27 - letterb - parseInt(b) * 27;
	            })


                    data.forEach(element => {
                        enabled_problems.push({
                            id: element['problem_id'],
                            code: element['problem_code'],
                            name: element['problem_name'],
                            text: `(${element['problem_code']}) — ${element['problem_name']}`,
                        });
                    });
                });

            MANAGER.getSubmissions(updateData, []);

            data_table.updateControls({
                submit: {
                    name: 'new submission',
                    action: (e, data) => {
                        let submitAnswer = new DIALOG.instance('Submit answer', 'submitAnswer', {
                            'submit': {
                                type: 'confirm',
                                action: (e, data) => {
                                    let form = document.getElementsByTagName('form')[0];
                                    let inputs = document.getElementsByTagName('input');
                    
                                    for(let i = 0; i < inputs.length; i++){
                                        if(inputs[i].value == '')
                                            return;
                                    }
                    
                                    // Verify the validity of the input
                                    let answer = document.getElementsByClassName('answer-option')[0];
                                    let valid = (function(){
                                        
                                        // Convert to scinot
                                        let scinot = answer.value.trim().toLowerCase().split('e');
                                        if(scinot.length > 2) return false;
                                        if(!(/^\-{0,1}[0-9\.]{1,}$/.test(scinot[0]))) return false;
                                        if(scinot.length > 1) if(!(/^\-{0,1}[0-9]{1,}$/.test(scinot[1]))) return false;

                                        // Check the main number part
                                        let mantissa = scinot[0].split('.');
                                        if(mantissa.length > 2) return false;

                                        // Return the number if valid
                                        return answer.value.toLowerCase();
                                    })();

                                    // Submit form if valid input
                                    if(!valid && valid !== 0) return;
                                    answer.value = valid;

                                    form.submit();
                                }
                            },
                            'cancel': {
                                type: 'deny',
                                action: (e, data) => submitAnswer.kill(),
                            }
                        }, {
                            problem: {
                                name: 'problem',
                                type: 'select',
                                selection: enabled_problems,
                            },
                            answer: {
                                name: 'answer',
                                type: 'text',
                                placeholder: 'Enter answer',
                            },
                        }, 'Submit your answer to a problem here.');

                        submitAnswer.init();
                        submitAnswer.element.action = '/php/handlers/submit.handle.php';
                        submitAnswer.element.method = 'POST';

                        let form = document.getElementsByTagName('form')[0];
                        let parent = document.getElementsByClassName('dialog-box-body')[0];
                        let inputs = document.getElementsByTagName('input');
                    }
                }
            });

            // embedSubmissions();

            break;
    }
})();
