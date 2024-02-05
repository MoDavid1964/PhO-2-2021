const MAIN = (function(){
    let main = {
        faq: {
            '0': {
                q: 'Select a question &#9660;',
                a: 'Select a question from the list of FAQs in the dropdown.',
            },
            '1': {
                q: 'Can I take part in the contest even if I’m not in high school?',
                a: 'Yes, but your team will be placed in the “unofficial” open category.',
            },
            '2': {
                q: 'Our team has students in different categories. Can we still participate?',
                a: `Yes, but your team will be placed in the highest category among the different categories which your team members fall under.<br><br>
                For example, a team composed of junior high and senior high students will be placed in the senior high category, while any team with at 
                least one non high school participant will be placed in the open category.`,
            },
            '3': {
                q: 'How do we register?',
                a: 'It’s simple — just fill up the Google Form through this <a href="https://docs.google.com/forms/d/e/1FAIpQLSezIwZvhbZ7pyItuYmHZQGf9yJpP4UTSTiYXGEgaCoMBJGnCg/viewform">link</a>.',   
            },
            '4': {
                q: 'Are we allowed to change team composition or team name after registration?',
                a: `Changes to such details will be accepted only up to the closing date for registration, and must be emailed to 
                <span style="color: var(--main-shadow-dark)">onlinephysoly@pshs.edu.ph</span> with the subject line “Registration Update”. `,   
            },
            '5': {
                q: 'We’ve already registered. What happens next?',
                a: `Once your team has been verified by the contest committee, you will receive an email confirming the successful registration. 
                Before the contest starts, you will also receive an email with your team’s login details to the website.`,   
            },
            '6': {
                q: 'How and where can we submit answers?',
                a: `Answers may be submitted through the contest website. You can access your team’s portal by logging in with your corresponding login details. 
                Any team member can submit answers at any time through the contest portal.`,   
            },
            '7': {
                q: 'What resources are allowed?',
                a: `Basically anything, except other teams.`,   
            },
            '8': {
                q: 'So what isn’t allowed?',
                a: 'Any form of communication outside your team regarding the contest and its problems.',
            },
            '9': {
                q: 'Will team members be allowed to communicate with each other?',
                a: 'Yes. Team members are more than encouraged to work together to solve the problems.',   
            },
            '10': {
                q: 'How will teams be ranked and awarded?',
                a: 'Though both the overall and category-wise rankings will be displayed, teams will be awarded prizes based on their category rankings.',   
            },
            '11': {
                q: 'Do the problems differ per category?',
                a: 'No. All categories will receive the same problems; however, official rankings will be blocked by category.',   
            },
            '12': {
                q: 'If we make a mistake in submitting an answer, can we correct it?',
                a: 'No. You can only make a new submission. Note that every new submission will merit less points for that particular problem.',   
            },
            '13': {
                q: 'What units will be used if the problem does not state it?',
                a: 'Use the corresponding unit in the MKS System of Units unless otherwise specified.',   
            },
            '14': {
                q: 'Do the answers have to be exact?',
                a: 'No; there is a 1% tolerance unless otherwise stated.',   
            },
            '15': {
                q: 'How many significant figures will be used?',
                a: 'A default of 3 significant figures will be used unless otherwise stated.',   
            },
            '16': {
                q: 'Will the team rankings be displayed live during the competition?',
                a: 'The tentative live scoreboard during the competition will only display the number of base points acquired by each team, not the actual number of points acquired.',
            },
            '17': {
                q: 'What happens if the competition website encounters issues (such as crashes)?',
                a: 'The website will be aptly maintained by our team of developers. If all else fails, a backup Discord server will be used where participants can submit answers robustly.',   
            },
            '18': {
                q: 'Will I get a certificate for participating?',
                a: 'Yes, although this will most likely be digital.',   
            },
            '19': {
                q: 'Are there bonus points?',
                a: 'No, but it’s always better for your points to submit a correct answer as early as possible!',   
            },
            '20': {
                q: 'I have more questions outside the scope of these FAQs. Whom do I ask?',
                a: 'Feel free to email us at <span style="color: var(--main-shadow-dark)">onlinephysoly@pshs.edu.ph</span> if this is the case!',
            }
        },
        slide: 0,
        slides: [
            {
                html: `
                    <div class="content-header">
                        <div class="content-header-title">
                            <div class="content-header-title-text">
                                Introducing (PhO)<sup>2</sup>
                            </div>
                        </div>
                        <div class="content-header-subtitle">
                            <div class="content-header-subtitle-text">
                                What exactly is (PhO)<sup>2</sup>?
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-paragraph">
                            The Philippine Online Physics Olympiad is an online physics competition hosted by students of the Philippine Science High School.
                            The competition aims to foster an interest in olympiad-level physics primarily amongst high school students. The competition is
                            expected to take place this coming February and consists of 40 problems to be answered over the course of 7 days.<br><br>
                        </div>
                        <div class="content-body-canvas-container">
                            <canvas class="content-body-canvas"></canvas>
                        </div>
                    </div>
                    <div class="content-footer">
                        <a class="content-footer-login" href="/php/pages/login.php">Login</a>
                        <div class="content-footer-login-subtitle">Already have an account? Login here!<sup class="invisible">2</sup></div>
                    </div>
                `,
                setup: () => {
                    with(window){
                        
                        // Create a bunch of random boxes
                        let boxes = [];
                        let ground = Bodies.rectangle(canvas.width / 2, 400, canvas.width, 60, { isStatic: true });

                        for(let i = 0; i < 100; i++){
                            let b = Math.random() * 255;
                            let g = b * Math.random() * 0.5 + b * 0.5;
                            let r = g * Math.random() * 0.33 + g * 0.67;
                            let s = 20 + Math.random() * 40;
                            let sides = 3 + Math.round(Math.random() * 3);

                            boxes.push(Bodies.polygon(Math.random() * canvas.width, Math.random() * canvas.height, sides, s, {
                                render: {
                                    fillStyle: `rgba(${r},${g},${b},1)`,
                                    text: {
                                        fillStyle: "#000000",
                                        content: 'content',
                                        size: 50,
                                    },
                                }
                            }))
                        }

                        main.interval = setInterval(() => {
                            for(let i = 0; i < boxes.length; i++){
                                if(boxes[i].position.y > 600)
                                    Body.set(boxes[i], 'position', { x: canvas.width / 2, y: -100 });
                            }
                        }, 1000 / 60);

                        // Add all of the bodies to the world
                        Composite.add(engine.world, [...boxes, ground]);
                    }
                }
            },
            {
                html: `
                    <div class="content-header">
                        <div class="content-header-title">
                            <div class="content-header-title-text">
                                Elligibility<sup class="invisible">2</sup>
                            </div>
                        </div>
                        <div class="content-header-subtitle">
                            <div class="content-header-subtitle-text">
                                Who can participate?<sup class="invisible">2</sup>
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-paragraph">
                            <p> The competition is open to all high school students with two categories (junior high school and senior high school). 
                            Winners of each category will be awarded seprately. A third "open category" was planned for students outside of high school; however,
			this will no longer be implemented.</p>
                            <p> Participants must form teams of up to three members; members need not belong to the same school or year level, although note
                            that the team category is determined by the highest year level amongst all team members. </p>
                        </div>
                        <div class="content-body-canvas-container">
                            <canvas class="content-body-canvas"></canvas>
                        </div>
                    </div>
                    <div class="content-footer">
                        <a class="content-footer-login" href="/php/pages/login.php">Login</a>
                        <div class="content-footer-login-subtitle">Already have an account? Login here!<sup class="invisible">2</sup></div>
                    </div>
                `,
                setup: () => {
                    with(window){

                        // Add bodies
                        let group = Body.nextGroup(true),
                        length = canvas.height / 2,
                        width = 25;
                            
                        let pendulum = Composites.stack(canvas.width / 2, 10, 2, 1, -20, 0, function(x, y) {
                            return Bodies.rectangle(x, y, length, width, { 
                                collisionFilter: { group: group },
                                frictionAir: 0,
                                chamfer: 5,
                                render: {
                                    fillStyle: 'rgba(0, 0, 0, 0.5)',
                                    lineWidth: 0
                                }
                            });
                        });

                        engine.gravity.scale = 0.002;

                        Composites.chain(pendulum, 0.45, 0, -0.45, 0, { 
                            stiffness: 0.9, 
                            length: 0,
                            angularStiffness: 0.7,
                            render: {
                                strokeStyle: '#4a485b'
                            }
                        });

                        Composite.add(pendulum, Constraint.create({ 
                            bodyB: pendulum.bodies[0],
                            pointB: { x: -length * 0.42, y: 0 },
                            pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
                            stiffness: 0.9,
                            length: 0,
                            render: {
                                strokeStyle: '#4a485b'
                            }
                        }));

                        let lowerArm = pendulum.bodies[1];

                        Body.rotate(lowerArm, -Math.PI * 0.3, {
                            x: lowerArm.position.x - 100,
                            y: lowerArm.position.y
                        });

                        Composite.add(engine.world, pendulum);

                        let trail = [];

                        Events.on(render, 'afterRender', function() {
                            trail.unshift({
                                position: Vector.clone(lowerArm.position),
                                speed: lowerArm.speed
                            });

                            Render.startViewTransform(render);
                            render.context.globalAlpha = 0.7;

                            for (var i = 0; i < trail.length; i += 1) {
                                var point = trail[i].position,
                                    speed = trail[i].speed;
                                
                                var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
                                render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
                                render.context.fillRect(point.x, point.y, 2, 2);
                            }

                            render.context.globalAlpha = 1;
                            Render.endViewTransform(render);

                            if (trail.length > 2000) {
                                trail.pop();
                            }
                        });
                    }
                },

            },
            {
                html: `
                    <div class="content-header">
                        <div class="content-header-title">
                            <div class="content-header-title-text">
                                Registration<sup class="invisible">2</sup>
                            </div>
                        </div>
                        <div class="content-header-subtitle">
                            <div class="content-header-subtitle-text">
                                How do I register for (PhO)<sup>2</sup>?
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-paragraph">
                            You can register for (PhO)<sup>2</sup> at this <a href="https://docs.google.com/forms/d/e/1FAIpQLSezIwZvhbZ7pyItuYmHZQGf9yJpP4UTSTiYXGEgaCoMBJGnCg/viewform">link</a>.
                            Only a single member is required to fill out the form. Note that for participants under the high school categories, ID's will be required for verification.<br><br>
                        </div>
                        <div class="content-body-canvas-container">
                            <canvas class="content-body-canvas"></canvas>
                        </div>
                    </div>
                    <div class="content-footer">
                        <a class="content-footer-login" href="/php/pages/login.php">Login</a>
                        <div class="content-footer-login-subtitle">Already have an account? Login here!<sup class="invisible">2</sup></div>
                    </div>
                `,
                setup: () => {
                    with(window){

                        // Add bodies
                        let particleOptions = { 
                            friction: 0.05,
                            frictionStatic: 0.1,
                            render: { visible: true } 
                        };

                        function softBody (xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
                            let Common = Matter.Common,
                                Composites = Matter.Composites,
                                Bodies = Matter.Bodies;
                        
                            particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
                            constraintOptions = Common.extend({ stiffness: 0.2, render: { type: 'line', anchors: false } }, constraintOptions);
                        
                            let softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
                                return Bodies.circle(x, y, particleRadius, particleOptions);
                            });
                        
                            Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);
                        
                            return softBody;
                        };

                        Composite.add(engine.world, [
                            softBody(250, 50, 5, 5, 0, 0, true, 18, particleOptions),
                            softBody(400, 300, 8, 3, 0, 0, true, 15, particleOptions),
                            softBody(250, 200, 4, 4, 0, 0, true, 15, particleOptions),
                            Bodies.rectangle(canvas.width / 2, 0, canvas.width, 25, { isStatic: true }),
                            Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 25, { isStatic: true }),
                            Bodies.rectangle(canvas.width, canvas.height / 2, 25, canvas.height, { isStatic: true }),
                            Bodies.rectangle(0, canvas.height / 2, 25, canvas.height, { isStatic: true })
                        ]);
                    }
                }
            },
            {
                html: `
                    <div class="content-header">
                        <div class="content-header-title">
                            <div class="content-header-title-text">
                                FAQ<sup class="invisible">2</sup>
                            </div>
                        </div>
                        <div class="content-header-subtitle">
                            <div class="content-header-subtitle-text">
                                FAQ about the competition.<sup class="invisible">2</sup>
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-paragraph">
                            Here are some of the most frequently asked questions regarding the competition. You may also view the complete guidelines at the following 
                            <a href="https://docs.google.com/document/d/13cjP0Yx229leTOfE8dJCx4j6rVpprO-UjJzFWV_B47s/edit">link</a>.<br><br>
                        </div>
                        <div class="content-body-faq-container">
                            <div class="content-body-faq">
                                <div class="content-body-faq-question">
                                    <select class="content-body-faq-question-selection" name="faq">
                                    </select>
                                </div>
                                <div class="content-body-faq-answer">
                                    Select a question from the selection above.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-footer">
                        <a class="content-footer-login" href="/php/pages/login.php">Login</a>
                        <div class="content-footer-login-subtitle">Already have an account? Login here!<sup class="invisible">2</sup></div>
                    </div>
                `,
                setup: () => {
                    let select = document.getElementsByClassName('content-body-faq-question-selection')[0];
                    let answer = document.getElementsByClassName('content-body-faq-answer')[0];

                    // Configure the selection element
                    let faq = Object.keys(main.faq);
                    for(let i = 0; i < faq.length; i++){
                        let option = document.createElement('option');

                        option.className = 'content-body-faq-question-selection-option';
                        option.innerHTML = main.faq[faq[i]].q;
                        option.value = i + 1;

                        select.appendChild(option);
                    }

                    // On change
                    select.addEventListener('change', e => {
                        answer.innerHTML = main.faq[+select.value - 1].a;
                    });
                }
            },
        ],
    };

    // Execute the main process
    main.init = () => {
        let navigator = document.getElementsByClassName('navigator')[0];
        let content = document.getElementsByClassName('content-container')[0];
        let controls = document.getElementsByClassName('navigator-content-description-controls-instance-hyperlink');
        let paginator = document.getElementsByClassName('navigator-content-description-controls-instance-text')[0];

        content.innerHTML = main.slides[0].html;
        paginator.innerHTML = `1 / ${main.slides.length}`;
        main.updatePage();

        function removeCurrent(){
            let contentCopy = Object.assign(content);
            let parent = content.parentElement;

            contentCopy.style.animationName = 'fade-out-full';
            contentCopy.style.animationDuration = 'var(--default-transition-time)';
            contentCopy.style.animationFillMode = 'forwards';

            parent.removeChild(content);
            parent.appendChild(contentCopy);
        }

        controls[0].addEventListener('click', e => {
            if(main.slide == 0) return;
            
            removeCurrent();
            setTimeout(() => {
                let contentCopy = Object.assign(content);
                let parent = content.parentElement;

                contentCopy.style.animationName = 'slide-in-left-margin';
                contentCopy.style.animationDuration = 'var(--default-transition-time)';
                contentCopy.style.animationFillMode = 'forwards';

                parent.removeChild(content);
                parent.appendChild(contentCopy);
                
                main.slide--;
                main.updatePage();
            }, 300);
        });

        controls[1].addEventListener('click', e => {
            if(main.slide + 1 > main.slides.length - 1) return;

            removeCurrent();
            setTimeout(() => {
                let contentCopy = Object.assign(content);
                let parent = content.parentElement;

                contentCopy.style.animationName = 'slide-in-right-margin';
                contentCopy.style.animationDuration = 'var(--default-transition-time)';
                contentCopy.style.animationFillMode = 'forwards';

                parent.removeChild(content);
                parent.appendChild(contentCopy);

                main.slide++;
                main.updatePage();
            }, 300);
        });

        // The welcome on the landing page
        let greeting = new DIALOG.instance("Welcome!", "greeting", {
            'ok': {
                type: 'neutral',
                action: e => greeting.kill(),
            }
        }, {}, 'Use the arrows on the left panel to navigate the page.');
        let welcome = setInterval(() => {
            let preloader = document.getElementsByClassName('preloader')[0];
            if(preloader) return;

            greeting.init();
            clearInterval(welcome);
        }, 1000 / 60);
    }

    main.configCanvas = () => {
        let canvas = document.getElementsByClassName('content-body-canvas')[0];

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        canvas.style.width = canvas.parentElement.clientWidth + 'px';
        canvas.style.height = canvas.parentElement.clientHeight + 'px';

        window.addEventListener('resize', () => {
            main.configCanvas();
        });
    }

    main.configMatter = () => {
        with(window){
            
            // Aliases
            Engine = Matter.Engine;
            Render = Matter.Render;
            Runner = Matter.Runner;
            Body = Matter.Body;
            Bodies = Matter.Bodies;
            Mouse = Matter.Mouse;
            Constraint = Matter.Constraint;
            MouseConstraint = Matter.MouseConstraint;
            Composite = Matter.Composite;
            Composites = Matter.Composites;
            Events = Matter.Events;
            Vector = Matter.Vector;

            // Create an engine
            engine = Engine.create();
            canvas = document.getElementsByClassName('content-body-canvas')[0];

            // Create a renderer
            render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    wireframes: false,
                    showAngleIndicator: false,
                    width: canvas.width,
                    height: canvas.height,
                    background: 'white',
                }
            });

            // Add mouse control
            let mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

            Composite.add(engine.world, mouseConstraint);

            // Keep the mouse in sync with rendering
            render.mouse = mouse;

            // Setup the world
            main.slides[main.slide].setup();

            // Run the damn thing
            Render.run(render);
            runner = Runner.create();
            main.timeout = setTimeout(() => {
                Runner.run(runner, engine);
            }, 250)
        }
    }

    main.updatePage = () => {
        let content = document.getElementsByClassName('content-container')[0];
        let paginator = document.getElementsByClassName('navigator-content-description-controls-instance-text')[0];

        content.innerHTML = main.slides[main.slide].html;
        paginator.innerHTML = `${main.slide + 1} / ${main.slides.length}`;

        window.clearInterval(main.interval);
        window.clearTimeout(main.timeout);

        try{
            main.configCanvas();
            main.configMatter();
        } catch(err){
            main.slides[main.slide].setup();
        }
    }

    return main;
})();

window.addEventListener('load', () => {
    if(window.innerWidth > window.innerHeight * 6 / 5){
        MAIN.init();
    }
});
