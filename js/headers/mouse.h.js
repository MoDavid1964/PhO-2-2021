const MOUSE = (function(){
    let mouse = {
        px: 0,
        py: 0,
        x: 0,
        y: 0,

        click: false,
        press: false,
        release: false,
    };

    // Clicks and presses
    window.addEventListener('mousedown', e => {
        mouse.press = true;
    });

    window.addEventListener('mouseup', e => {
        mouse.release = true;
    });

    window.addEventListener('mouseclick', e => {
        mouse.click = true;
    });

    // For mouse motion
    window.addEventListener('mousemove', e => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });

    // Resets the mouse settings each frame
    setInterval(() => {
        mouse.press = false;
        mouse.release = false;
        mouse.click = false;
    }, 1000 / 60);

    return mouse;
})();