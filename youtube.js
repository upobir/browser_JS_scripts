function showTrueTime() {
    const url = window.location.href.split('?')[0];
    if (!url.endsWith('/watch')) {
        console.log("not a watch page");
        return;
    }

    const video = document.querySelector('video');
    const rate = video.playbackRate;

    const timediv = document.querySelector('.ytp-time-display')

    if (timediv === null)
        return;

    const timespan = timediv.children[1];

    const currentTime = video.currentTime;
    const totalTime = video.duration;

    const remainingTime = totalTime - currentTime;
    const effectiveRemainingTime = remainingTime / rate;

    while (timespan.children.length < 4) {
        const newSpan = document.createElement('span');
        timespan.appendChild(newSpan);

        newSpan.style.cursor = 'pointer';

        newSpan.addEventListener('click', function () {
            const inputRate = parseFloat(prompt("Enter new rate:"));
            if (!isNaN(inputRate) && inputRate > 0 && inputRate <= 4) {
                video.playbackRate = inputRate;
            }
        });
    }

    const remainingSpan = timespan.children[3];
    remainingSpan.textContent = ' [' + getTimeString(effectiveRemainingTime) + '] - (' + rate + 'x)';
    remainingSpan.style.color = 'red';
}

function getTimeString(timevalue) {
    if (isNaN(timevalue))
        return ' ';
    let result = '';
    result += Math.floor(timevalue / 3600);
    result += ':';
    result += (Math.floor(timevalue / 60) % 60).toString().padStart(2, '0');
    result += ':';
    result += (Math.floor(timevalue) % 60).toString().padStart(2, '0');

    return result;
}


setInterval(showTrueTime, 500);
