(function(){
    // Instantiate the login thingy
    let login = new DIALOG.instance("Login", "login", {
        'login': {
            type: 'submit',
            action: e => {
                let form = document.getElementsByTagName('form')[0];
                let inputs = document.getElementsByTagName('input');

                for(let i = 0; i < inputs.length; i++){
                    if(inputs[i].value == '')
                        return;
                }

                form.submit();
            }
        }
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
    }, 'Welcome to (PhO)<sup>2</sup>!');

    // Configure the login thingy
    login.init();
    login.element.method = "POST";
    login.element.action = "../handlers/login.handle.php";

    // Add override elements to the popup instance
    let form = document.getElementsByTagName('form')[0];
    let inputs = document.getElementsByTagName('input');

    // Submit form on enter press
    form.addEventListener('keypress', e => { 
        if(e.which == 13){
            for(let i = 0; i < inputs.length; i++)
                if(inputs[i].value == '') return;

            form.submit();
        }
    });
})();
