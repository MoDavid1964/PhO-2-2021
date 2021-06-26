/*
    This script describes the "include()" function
    which includes a resource in a page, given the
    resource's type. (In this case, primarily css
    and js files are handled).
*/

// Creates the link element to retrieve fonts
function include(type, resource){

    // The head element
    let head = document.getElementsByTagName("head")[0];
    let body = document.getElementsByTagName("body")[0];
    let id = resource.split("/")[resource.split("/").length - 1];
    
    // In case already included
    if(document.getElementById(id)) return;

    switch(type){

        // Include a css file
        case "css":
            let link = document.createElement("link");

            link.id = id;
            link.rel = "stylesheet";
            link.href = resource;

            head.appendChild(link);
            break;

        // Include a js file
        case "js":
            let script = document.createElement("script");

            script.id = id;
            script.src = resource;

            body.appendChild(script);
            break;

        // It aint js or css
        default:
            console.error("That resource type is not supported.");
    }
}