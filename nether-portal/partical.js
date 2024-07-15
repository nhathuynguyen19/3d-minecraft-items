function absorb() {
    let heart = document.querySelector('.heart');
    let eabsorb2d = document.createElement('div');
    eabsorb2d.classList.add('axis');
    heart.appendChild(eabsorb2d);

    setTimeout(function () {
        heart.removeChild(eabsorb2d);
    }, 2000);
    
    let left = Math.floor(Math.random() * 280);
    eabsorb2d.style.left = left + 'px';
    let top = Math.floor(Math.random() * 280);
    eabsorb2d.style.top = top + 'px';
    let z = Math.floor(Math.random() * 280) - 140;
    eabsorb2d.style.transform = 'translateZ(' + z + 'px)' + ' rotateX(90deg)';


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
    eabsorb2d.innerHTML = getRandomHtml();
}

setInterval(function () {
    absorb()
}, 50);