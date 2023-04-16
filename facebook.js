function removeShit() {
    removeSuggesteds();
    removeAds();
}

function removeSuggesteds() {
    const spans = Array.from(document.querySelectorAll('span')).filter(span => {
        const content = span.textContent.trim()
        return content === 'Suggested for you'
            || content === 'Reels and short videos'
            || content === 'Suggested groups';
    });

    // change the background color of the 5th ancestor tag of each matching <span> element to red
    spans.forEach(span => {
        let ancestor = span;
        for (let i = 0; i < 15; i++) {
            ancestor = ancestor.parentElement;
        }
        //ancestor.style.backgroundColor = 'red';
        ancestor.remove();
    });
}

function removeAds() {
    const texts = Array.from(document.querySelectorAll('text')).filter(t => {
        return t.textContent.trim() == 'Sponsored';
    }).map(t => {
        return '#' + t.id;
    });

    const uses = Array.from(document.querySelectorAll('use'));

    uses.forEach(u => {
        if (texts.includes(u.getAttribute('xlink:href'))) {
            let ancestor = u;
            for (let i = 0; i < 20; i++) {
                ancestor = ancestor.parentElement;
            }
            // ancestor.style.backgroundColor= 'red';
            // ancestor.remove();
            ancestor.style.display = 'none';
        }
    });
}

setInterval(removeSuggesteds, 333);
setInterval(removeAds, 500);
