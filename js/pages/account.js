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