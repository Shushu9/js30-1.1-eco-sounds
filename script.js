'use strict'

console.log("Самооценка pt1:\n1. Вёрстка +10; \n2. При кликах по интерактивным элементам меняется изображение +10\n3. При кликах по интерактивным элементам меняется звук +10\n4. Активный в данный момент интерактивный элемент выделяется стилем +10\n5. Кнопка Play/Pause +20\n6. Внизу табы переключающие жанр = дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\n Итог: 70 баллов.");


window.addEventListener('DOMContentLoaded', () => {


    const playBtn = document.querySelector('.play'),
        birdsBtns = document.querySelectorAll('.menu__item'),
        background = document.querySelector('main'),
        logo = document.querySelectorAll('.header__logo'),
        tabs = document.querySelectorAll('.footer__tab'),
        songsParent = document.querySelectorAll('.menu');

    let currentMelody = 'forest',
        isPlay = false;


    const audio = new Audio();

    function playAudio(birdName) {

        audio.src = `audio/${birdName}.mp3`;
        audio.currentTime = 0;
        audio.loop = true;
        audio.play();

        isPlay = true;
        playBtn.style.backgroundImage = "url(svg/pause.svg)";

    }


    playBtn.addEventListener('click', () => {
        if (!isPlay) {
            playAudio(currentMelody)
        } else {
            playBtn.style.backgroundImage = "url(svg/play.svg)";
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
            background.style.backgroundImage = `url(img/${currentMelody}.jpg)`
            logo.forEach(item => item.classList.remove('active'));
        })
    })


    logo.forEach(item => {
        item.addEventListener('click', (i) => {
            item.classList.add('active');
            currentMelody = (logo[0].classList.contains('show')) ? 'forest' : 'cycle';
            playAudio(currentMelody);
            birdsBtns.forEach(item => item.classList.remove('active'));
            background.style.backgroundImage = `url(img/${currentMelody}.jpg)`
        })
    })


    tabs.forEach(tab => {
        tab.addEventListener('click', (el) => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            playBtn.style.backgroundImage = "url(svg/play.svg)";
            isPlay = false;
            audio.pause();

            if (tab.classList.contains('footer__tab-skull')) {
                currentMelody = 'cycle';
                background.style.backgroundImage = `url(img/${currentMelody}.jpg)`
                songsParent.forEach(item => item.classList.remove('show'));
                songsParent[1].classList.add('show');
                logo[0].classList.remove('show');
                logo[1].classList.add('show');
                logo[0].classList.remove('active');
                logo[1].classList.add('active');
            } else {
                currentMelody = 'forest';
                background.style.backgroundImage = `url(img/${currentMelody}.jpg)`
                songsParent.forEach(item => item.classList.remove('show'));
                songsParent[0].classList.add('show');
                logo[1].classList.remove('show');
                logo[0].classList.add('show');
                logo[1].classList.remove('active');
                logo[0].classList.add('active');
            }
        })
    })

});


