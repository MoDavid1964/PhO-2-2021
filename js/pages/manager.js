/*
    Handles the control panel for admin users.
    Utilizes the custom API's of the site (which btw
    I should make private).
*/

const INTERFACE = document.getElementsByClassName("content-interface-body")[0];

// Facilitates stacked requests for multiple pieces of data
function resetRequestLog(){
    localStorage.setItem("last_user_id", 0);
}

// Remove the contents of the interface
function clearInterface(){
    for(let i = 0; i < INTERFACE.children.length; i++)
        INTERFACE.removeChild(INTERFACE.children[i]);
}

function confirmAction(title, message, callback, params){
    let dialog = new DIALOG(
        title, message, {
        confirm: {
            name: "confirm",
            background: "rgba(50, 50, 50, 1)",
            hover: "rgba(75, 75, 100, 1)",
            callback: `(function(dialog){
                ${callback}(${params.join(',')});
                dialog.close();
            })`,
        },
        cancel: {
            name: "cancel",
            background: "rgba(240, 30, 60, 1)",
            hover: "rgba(255, 50, 90, 1)",
            callback: `(function(dialog){
                dialog.close()
            })`,
        }
    }).open();
}

// Actions for editing users
function editUser(action, user_id){
    switch(action){

        // Toggle admin privileges
        case 0:
            alert('toggleAdmin');
            break;

        // Delete the specified user
        case 1:

            break;
    }

    alert();
}

// Generates the user list table
function generateUsers(){

    // User table
    let user_table;
    if(!(user_table = document.getElementById("user_table"))){
        user_table = document.createElement("table");
        user_table.id = "user_table";
        user_table.className = "content-interface-body-user-table data-table";

        // Add the table to the interface
        INTERFACE.appendChild(user_table);
    }

    // Fetch the contents of the table
    let id = localStorage.getItem("last_user_id");
    fetch(`../../php/handlers/user-list.handle.php?start_id=${id}&limit=15`)
        .then(response => response.json())
        .then(data => {

            // The header of the table
            let user_table_header = document.createElement("tr");
            user_table_header.className = "content-interface-body-user-table-header-entry " + 
                "data-table-header-entry";
            user_table_header.innerHTML = `
                <th class="header-entry-user-id">User ID</th>
                <th class="header-entry-user-name">Username</th>
                <th class="header-entry-user-isadmin">Admin</th>
                <th class="header-entry-user-delete"></th>`;
            user_table.appendChild(user_table_header);

            // Put the contents into the table
            for(let i = 0; i < data.length; i++){

                // Create the table entry
                let user_table_entry = document.createElement("tr");
                user_table_entry.className = "content-interface-body-user-table-entry data-table-entry";
                user_table_entry.innerHTML = `
                    <td class="entry-user-id-name entry-button" colspan="2">
                        <a href="#users">
                            <div>${data[i].user_id}</div>
                            <div>${data[i].user_name}</div>
                        </a>
                    </td>
                    <td class="entry-user-isadmin-${data[i].user_isAdmin ? "y" : "n"} entry-button">
                        <a href="#users" onclick="confirmAction('Warning!', 
                            '${data[i].user_isAdmin ? 
                                "The selected user will no longer be an admin." :
                                "The selected user will be given admin priviliges."}',
                            'editUser', [0, ${data[i].user_id}])">
                                toggle: ${data[i].user_isAdmin ? "y" : "n"}
                        </a>
                    </td>
                    <td class="entry-user-delete entry-button">
                        <a href="#users" onclick="confirmAction('Warning!', 
                            'The selected user will be deleted. Note that this action is permanent.',
                            'editUser', [1, ${data[i].user_id}])">
                                delete user
                        </a>
                    </td>`;

                user_table.appendChild(user_table_entry);
            }

            // For next requests
            localStorage.setItem("last_user_id", data[data.length - 1].user_id);
        }).catch();
}

// Generates the team list table
function generateTeams(){

}

// Initializes manager
(function(){
    new SCROLLBAR("content-interface-scrollbar-bar", "content-interface",
        window.innerWidth * 0.056, window.innerHeight, 
        window.innerWidth * 0.056, window.innerHeight).init();
    SCROLLBAR.start();
    
    resetRequestLog();
    clearInterface();
    generateUsers();
})();

// Means the script has succesfully been loaded
(function(){
    window.PROCEED = true;
})();