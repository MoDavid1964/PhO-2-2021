// Initializes manager
(function(){
    new SCROLLBAR("content-interface-scrollbar-bar", "content-interface",
        window.innerWidth * 0.056, window.innerHeight, 
        window.innerWidth * 0.056, window.innerHeight).init();
    SCROLLBAR.start();
})();

// Means the script has succesfully been loaded
(function(){
    window.PROCEED = true;
})();

new DIALOG("Warning!", "Are you sure you wish to proceed with the indicated action? This action cannot be undone.", {
    confirm: {
        name: "confirm",
        background: "rgba(50, 50, 50, 1)",
        hover: "rgba(75, 75, 100, 1)",
        callback: "alert",
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