'use strict';

// Data stored in the website
let state = {
    noInformation : "You have not put any information yet into the site! Please use the form to add new information",
    formLog : []
}

// Creates the popup at the very top once the details button is pressed
let showMore = document.querySelector('#showMore');
showMore.addEventListener('click', function () {
    let show = document.querySelector('#toggle');
    renderDetails();
    show.classList.toggle("show");
});

// Rendering the Details for div element
function renderDetails() {
    let details = document.querySelector("#moredetails");
    let summary = document.createElement("p");
    if (state.formLog.length == 0) {
        summary.textContent = state.noInformation;
    } else {
        let log = state.formLog[state.formLog.length - 1];
        summary.textContent = "You slept at " + log.sleep + " and woke up at " + log.wakeup + ". You had " + (log.med?"":"no") + " medications and " + (log.caff?"":"no") + " caffeiene last night.";
    }
    details.appendChild(summary);    
}

// Form Submission
var form = document.querySelector("form");

// Taking in information from form
let sleep = document.querySelector("#SleepTime");
let wakeup = document.querySelector("#Wake-upTime");
let yesMed = document.querySelector("#YesMed");
let noMed = document.querySelector("#NoMed");
let yesCaf = document.querySelector("#YesCaf");
let noCaf = document.querySelector("#NoCaf");
let think = document.querySelector("#Approx");

form.addEventListener("submit", function(evt) {
    // Stopping from reloading page
    evt.preventDefault();

    // Adding values to render
    state.formLog.push({sleep: sleep.value, wakeup: wakeup.value, caf: yesCaf.checked, med: yesMed.checked, think: think.value, show: false});
    
    // Clears values
    sleep.value = "";
    wakeup.value = "";
    yesCaf.checked = false;
    noCaf.checked = true;
    yesMed.checked = false;
    noMed.checked = true;
    think.value = "";

    // Renders the Logs
    renderLogs();
});

// Printing out the logs for the program
function renderLogs() {
    let logs = document.querySelector("#logs");

    // Clears the current log
    let child = logs.lastElementChild;
    while(child) {
        child.remove();
        child = logs.lastElementChild;
    }

    // Prints out the logs
    let i = 1;
    for(let form of state.formLog) {
        // Created a mainCard for each form
        let mainCard = document.createElement("div");
        mainCard.classList.add("log-row");
        
        // Title
        let title = document.createElement("h4");
        title.textContent = "Day " + i + ": You slept from " + form.sleep + " to " + form.wakeup + ".";
        mainCard.appendChild(title);

        // Adding Description
        let desc = document.createElement("p");
        mainCard.addEventListener("click", function() {
            form.show = !form.show;
            console.log(state.formLog);
            renderLogs();
        });

        // If we want to show the form
        if(form.show) {
            desc.textContent = "You did " + (form.caf?"":"not") + " drink caffeine and did " + (form.caf?"":"not") + " take medicine. " + (form.think.length==0?"":("You thought you slept " + form.think + "."));
            desc.classList.add("lightDesc");
        }

        // Adding them to the Form Logs
        mainCard.appendChild(desc);
        logs.appendChild(mainCard);
        i++;
    }
}