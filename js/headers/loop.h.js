/*
    Handles processes which execute
    continuously (for example, animations
    and the like).
*/

const LOOP = (function(){
    
    // The loop object
    let loop = {
        processes: {},
    };

    loop.execute = function(id, process, fps){
        this.processes[id] = setInterval(process, 1000 / fps);
    }

    loop.terminate = function(id){
        clearInterval(this.processes[id]);
    }

    return loop;
})();

// Means the script has succesfully been loaded
(function(){
    window.PROCEED = true;
})();