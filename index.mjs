'use strict';

let button = document.querySelector('#showMore');
button.addEventListener('click', function () {
    let moreDetails = document.querySelector('card3');
    if (moreDetails.style.display === 'none') {
        moreDetails.removeProperty('display');
    }
});