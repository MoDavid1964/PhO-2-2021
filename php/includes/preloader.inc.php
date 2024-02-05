<?php
/*
    This PHP header file is included in every
    page. Creates the preloader and avoids 
    redundant code.
*/

    // Creates the preloader template
    function preloader(){

        // The HTML template for the preloader
        echo "
            <div class='preloader' style='position: fixed; width: 100vw; 
                height: 100vh; background: rgba(255, 255, 255, 0.8); z-index: 10; opacity: 0%;'>
                <div class='preloader-dot-container' style='display: inline-block; 
                    position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%);'>
                </div>
                <div class='preloader-message-container' style='position: fixed; top: 0; 
                    width: 100vw; height: 100vh; padding: auto;'>
                    <div class='preloader-message' style='display: inline-block; 
                        position: relative; top: 40%; left: 50%; font-family: calibri; font-size: 100px;
                        font-weight: bold; letter-spacing: 5px; transform: translate(-50%, -50%); opacity: 75%;'>
                        <i><!--LOADING--></i>
                    </div>
                </div>
            </div>";

        // The script which handles the preloader
        echo "
            <script class='preloader-script'>
                (function(){
                    let preloader = document.getElementsByClassName('preloader')[0];
                    let preloader_script = document.getElementsByClassName('preloader-script')[0];
                    let preloader_dots_container = document
                        .getElementsByClassName('preloader-dot-container')[0];
                    let preloader_dots = [], preloader_time = 0, preloader_goal = 0;
                    let preloader_message = document.getElementsByClassName('preloader-message')[0];

                    // Create the dots and append them to the document
                    for(let i = 0; i < 5; i++){
                        let dot = document.createElement('div');
                        dot.className = 'preloader-dot';
                        dot.style = 'display: inline-block; margin-left: 25px; margin-right: 25px;' +
                            'height: 25px; width: 25px; border-radius: 50%;';

                        preloader_dots_container.appendChild(dot);
                        preloader_dots.push(dot);
                    }

                    function getOffset(time, index){
                        return Math.cos(time / 60 * -Math.PI * 2 + index * Math.PI / 3) * 10 + 45;
                    }

                    // Constantly update the preloader
                    let interval = setInterval(() => {
                        for(let i = 0; i < preloader_dots.length; i++){
                            preloader_dots[i].style.background = `rgba(0, 53, 84, 1)`;
                            preloader_dots[i].style.opacity = `\${Math.pow((getOffset(preloader_time, i)
                                 - 35) * 5, 3) / 10000}%`;
                            preloader_dots[i].style.width = `\${getOffset(preloader_time, i)}px`;
                            preloader_dots[i].style.height = `\${getOffset(preloader_time, i)}px`;
                            preloader_dots[i].style.marginBottom = `\${getOffset(preloader_time, i)}px`;
                            
                            if(preloader_goal)
                                preloader_dots[i].style.marginBottom = 
                                    `\${getOffset(preloader_time, i) * -20}px`;
                        }

                        if(preloader_goal){
                            preloader.style.opacity = 
                                `\${100 - (preloader_time - preloader_goal) / 12 * 100}%`;

                            // End the pre_loader
                            if(Math.abs(preloader_time - preloader_goal) > 12){
                                document.getElementsByTagName('body')[0].removeChild(preloader);
                                preloader_script.parentElement.removeChild(preloader_script);
                                clearInterval(interval);
                            }
                        } else {
                            preloader.style.opacity = 
                                `\${100 - ((preloader_time) / 6 * 100) > 100 ? 
                                    100 : (preloader_time) / 6 * 100}%`;
                        }

                        // Update the preloader constantly
                        preloader_message.style.opacity = 
                            `\${Math.sin(preloader_time / 10) * 15 + 30}%`;
                        preloader_time++;
                    }, 1000 / 60);

                    // Tells the document when the preloader should be hidden
                    window.addEventListener('load', () => {
                        setTimeout(() => {
                            preloader_goal = preloader_time > 0 ? preloader_time : 1;
                        }, 1000);
                    }, false);
                })();
            </script>";
    }
?>