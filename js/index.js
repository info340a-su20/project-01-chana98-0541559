'use strict';

let state = {
    noInformation : "You have not put any information yet into the site! Please use the form to add new information",
    formLog : []
}

let showMore = document.querySelector('#showMore');
showMore.addEventListener('click', function () {
    let show = document.querySelector('#toggle');
    renderDetails();
    show.classList.toggle("show");
});

function renderDetails() {
    let details = document.querySelector("#moredetails");
    let summary = document.createElement("p");
    if (state.formLog.length == 0) {
        summary.textContent = state.noInformation;
    } else {
        let log = state.formLog[state.formLog.length - 1];
        summary.textContent = "You slept at " + log.sleep + " and woke up at " + log.wakeup + ". You had " + (log.med?"":"no") + " medications and " + (log.caff?"":"no") + " caffeiene last night. It took " + log.feel + " to fall asleep";
    }
    details.appendChild(summary);    
}

var form = document.querySelector("form");
let sleep = document.querySelector("#SleepTime");
console.log(sleep.value);
let wakeup = document.querySelector("#Wake-upTime");

let yesMed = document.querySelector("#YesMed");
let noMed = document.querySelector("#NoMed");

let yesCaf = document.querySelector("#YesCaf");
let noCaf = document.querySelector("#NoCaf");

let think = document.querySelector("#Approx");
form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    state.formLog.push({sleep: sleep.value, wakeup: wakeup.value, caf: yesCaf.checked, med: yesMed.checked});
});
