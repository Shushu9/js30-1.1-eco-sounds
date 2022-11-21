'use strict'

console.log("Самооценка pt1:\n1. Вёрстка +10; \n2. При кликах по интерактивным элементам меняется изображение +10\n3. При кликах по интерактивным элементам меняется звук +10\n4. Активный в данный момент интерактивный элемент выделяется стилем +10\n5. Кнопка Play/Pause +20\n6. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения 0\n Итог: 60 баллов.");


window.addEventListener('DOMContentLoaded', () => {


    const playBtn = document.querySelector('.play'),
        birdsBtns = document.querySelectorAll('.menu__item'),
        background = document.querySelector('main'),
        logo = document.querySelector('.header__logo');

    let currentMelody = 'forest',
        isPlay = false;


    const audio = new Audio();

    function playAudio(birdName) {

        audio.src = `audio/${birdName}.mp3`;
        audio.currentTime = 0;
        audio.loop = true;
        audio.play();

        isPlay = true;
        playBtn.style.backgroundImage = "url(../svg/pause.svg)";

    }


    playBtn.addEventListener('click', () => {
        if (!isPlay) {
            playAudio(currentMelody)
        } else {
            playBtn.style.backgroundImage = "url(../svg/play.svg)";
            isPlay = false;
            audio.pause();
        }
    })


    birdsBtns.forEach(item => {
        item.addEventListener('click', (e) => {
            const birdName = e.target.getAttribute('data-item');
            currentMelody = birdName;
            playAudio(currentMelody);

            birdsBtns.forEach(item => item.classList.remove('active'));
            item.classList.add('active');
            background.style.backgroundImage = `url(../img/${currentMelody}.jpg)`
            logo.classList.remove('active');
        })
    })


    logo.addEventListener('click', (i) => {
        logo.classList.add('active');
        currentMelody = 'forest';
        playAudio(currentMelody);
        birdsBtns.forEach(item => item.classList.remove('active'));
        background.style.backgroundImage = `url(../img/${currentMelody}.jpg)`
    })

});


