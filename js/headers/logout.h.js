/*
    For logout functionality handling.
*/

const LOGOUT = (function(){
    let logout = {
        buttons: document.getElementsByClassName('logout-link')
    };

    // Add event listeners for all logout buttons
    for(let i = 0; i < logout.buttons.length; i++){
        logout.buttons[i].addEventListener('click', e => {

            if(document.getElementsByClassName('dialog-blackout').length)
                return;

            // Instantiate dialog box
            let logout_confirm = new DIALOG.instance('Logout?', 'logout', {
                'yes': {
                    type: 'confirm',
                    action: e => {
                        window.location.href = "/php/handlers/logout.handle.php";
                    },
                },
                'no': {
                    type: 'deny',
                    action: e => logout_confirm.kill(),
                }
            }, {}, 'Are you sure you wish to logout?');
            logout_confirm.init();
        });
    }
    
    return logout;
})();