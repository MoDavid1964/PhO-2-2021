const MANAGER = (function(){
    let manager = {};

    // Resets the id of the last indexed item
    manager.resetRequestLog = () => {
        localStorage.setItem("last_submission_id", 0);
        localStorage.setItem("submissions", []);
    }

    // Retrieve account data
    manager.getSubmissions = (callback, inputs) => {

        let id = localStorage.getItem("last_submission_id") || 0;

        // Fetch account
        fetch(`../../../php/handlers/submission-userlist.handle.php?last_submission_id=${id}&limit=128`)
            .then(response => response.json())
            .then(data => {

                if(data.length){
                    // For next requests
                    localStorage.setItem("last_submission_id", data[data.length - 1].submission_id);
                }

                // Do the thing with the data
                callback(data, ...inputs);
            }).catch();
    }

    return manager;
})();