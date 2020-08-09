'use strict';

let button = document.querySelector('#showMore');
button.addEventListener('click', function () {
    let show = document.querySelector('#toggle');
    show.classList.toggle("show");
});