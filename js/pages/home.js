(function(){
    let main_window = document.getElementsByClassName('right-side-content')[0];
    let start = localStorage.getItem('start');
	let end = localStorage.getItem('end');
    let timer = '';

    setInterval(() => {
        let now = Date.now();
        let sign = now - start < 0 ? '-' : '+';
        let difference = Math.abs(now - start);
	let endDifference = now - end;
	let ended =  false;

	if(endDifference >= 0){
		difference = endDifference;
		ended = true;
	}

        // Compute the time difference
        let day = Math.floor(difference / 1000 / 60 / 60 / 24); day = day > 9 ? day : '0' + day;
        let hour = Math.floor(difference / 1000 / 60 / 60) % 24; hour = hour > 9 ? hour : '0' + hour;
        let min = Math.floor(difference / 1000 / 60) % 60; min = min > 9 ? min : '0' + min;
        let sec = Math.floor(difference / 1000) % 60; sec = sec > 9 ? sec : '0' + sec;

        if(window.innerHeight < window.innerWidth){
            timer = `${day}<span class="timer-label">&nbsp;days</span>&nbsp;${hour}<span class="timer-label">&nbsp;hours</span>${min}<span class="timer-label">&nbsp;mins</span>&nbsp;${sec}<span class="timer-label">&nbsp;secs</span>`;
        } else {
            timer = `${day}<span class="timer-label">&nbsp;days</span><br><span style="opacity:0">==</span>${hour}<span class="timer-label">&nbsp;hours</span><br>${min}<span class="timer-label">&nbsp;mins</span><br><span style="opacity:0">==</span>${sec}<span class="timer-label">&nbsp;secs</span>`;
        }

        main_window.innerHTML = `
        <div class="timer-container">
            <div class="timer-title">
		<span class="timer-title-greeting" style="color:var(--main-accent-dark); font-size:"><b>Welcome, ${localStorage.getItem("name")}! [${localStorage.getItem("category")}]</b></span><br><br>
                ${ended ? 'contest ended this time ago' : (sign == '-' ? 'contest starts in' : 'contest ongoing for')}<br><br>
            </div>
            <b><div class="timer-content" style="color:rgba(${ended ? '85, 85, 255' : (sign == '-' ? '215, 85, 125' : '85, 215, 125')}, ${Math.sin(now / 1000 * Math.PI * 2 + Math.PI / 8) * 0.10 + 0.90})">
                ${timer}
            </div></b>
		<div class="timer-guidelines" style="font-size:3.2vh">
			<br>
			Some general must-knows for the competition:<br>
			<ul>
				<li>Answers must either be in numerical format or scientific notation (AeB).</li>
				<li>Do not include units when inputting answers.</li>
				<li>Message us at the discord server for any other concerns.</li>
			</ul>
		</div>
        </div>`;
    }, 1000 / 60);

    main_window.style.marginLeft = 0;
    main_window.style.width = '100vw';
})();
