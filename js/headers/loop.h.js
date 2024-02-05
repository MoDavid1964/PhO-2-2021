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

    loop.create = function(id, process){

        let processWrapper = function(){
            // Execute the process and store the id of the result
            process();

            loop.processes[id] = 
                requestAnimationFrame(processWrapper);
        }

        processWrapper();
    }

    loop.terminate = function(id){
        // Cancel the specified process
        cancelAnimationFrame(loop.processes[id]);
    }

    return loop;
})();

