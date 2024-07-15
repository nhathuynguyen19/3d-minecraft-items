function absorb() {
    let heart = document.querySelector('.heart');
    let absorb = document.createElement('div');
    absorb.classList.add('axis');
    heart.appendChild(absorb);

    setTimeout(function () {
        heart.removeChild(absorb);
    }, 2000);

    let left = Math.floor(Math.random() * 260);
    absorb.style.left = left + 'px';

    let top = Math.floor(Math.random() * 260);
    absorb.style.top = top + 'px';

    let z = Math.floor(Math.random() * 280) - 140;
    absorb.style.transform = 'translateZ(' + z + 'px)' + ' rotateX(90deg)';

    var htmlSnippets = [
        `
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust "></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust "></div>
                <div class="pixeldust"></div>
                <div class="pixeldust "></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
        `
        ,
        `
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
        `
        ,
        `
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
        `
        ,
        `
            <div class="horizon">
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
            <div class="horizon">
                <div class="pixeldust"></div>
                <div class="pixeldust color1"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
                <div class="pixeldust"></div>
            </div>
        `
        ,
        `
        <div class="pixeldust color1"></div>
        `
    ]

    function getRandomHtml() {
        var randomIndex = Math.floor(Math.random() * htmlSnippets.length);
        return htmlSnippets[randomIndex];
    }
    absorb.innerHTML = getRandomHtml();
}
setInterval(function () {
    absorb()
}, 50);