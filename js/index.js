'use strict';

// Data stored in the website
let state = {
    noInformation: "You have not put any information yet into the site! Please use the form to add new information",
    formLog: []
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
    details.innerHTML = "";
    let summary = document.createElement("p");
    if (state.formLog.length == 0) {
        summary.textContent = state.noInformation;
    } else {
        let log = state.formLog[state.formLog.length - 1];
        summary.textContent = "On " + log.date + ", You slept at " + log.sleep + " and woke up at " + log.wakeup + ". You had " + (log.med ? "" : "no") + " medications and " + (log.caff ? "" : "no") + " caffeine last night.";
    }
    details.appendChild(summary);
}

// Initializes app message to fill out form
let messageUpdate = document.querySelector('#sleepQuality');
if (state.formLog.length == 0) {
    messageUpdate.textContent = "Please fill out the form below!"
}


// Date check 
var newDay = document.querySelector("#timeofday");
var todayDay = new Date();
var timeOfDay = todayDay.getHours();
if (timeOfDay >= 5 && timeOfDay <= 12) {
    newDay.textContent = "Good morning!"
} else if (timeOfDay >= 12 && timeOfDay <= 18) {
    newDay.textContent = "Good afternoon!"
} else {
    newDay.textContent = "Good evening!"
}


// Form Submission
var form = document.querySelector("form");

// Search for Date Submission
var search = document.querySelector("#Search")

// Taking in information from form
let inputDate = document.querySelector("#SearchDate");
let searchButton = document.querySelector("#SearchButton")
let clearQueryButton = document.querySelector("#ClearQueryButton");
let clearLogButton = document.querySelector("#ClearLogButton");
let date = document.querySelector("#SleepDate");
let sleep = document.querySelector("#SleepTime");
let wakeup = document.querySelector("#Wake-upTime");
let yesMed = document.querySelector("#YesMed");
let noMed = document.querySelector("#NoMed");
let yesCaf = document.querySelector("#YesCaf");
let noCaf = document.querySelector("#NoCaf");
let think = document.querySelector("#Approx");

form.addEventListener("submit", function (evt) {
    // Stopping from reloading page
    evt.preventDefault();

    // Adding values to render
    state.formLog.push({ date: date.value, sleep: sleep.value, wakeup: wakeup.value, caf: yesCaf.checked, med: yesMed.checked, think: think.value, show: false });
    // Clears values
    sleep.value = "";
    wakeup.value = "";
    yesCaf.checked = false;
    noCaf.checked = true;
    yesMed.checked = false;
    noMed.checked = true;
    think.value = "";

    // Renders the Logs
    renderLogs(state.formLog);
});

// Updates middle card to change message
form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let sleepQuality = document.querySelector("#sleepQuality");
    let log = state.formLog[state.formLog.length - 1];
    var sleepTime = +log.sleep.substring(0, 2);
    var wakeTime = +log.wakeup.substring(0, 2);
    var hourDiff = Math.abs(sleepTime - wakeTime);
    if (hourDiff > 11) {
        sleepQuality.textContent = "You recorded " + hourDiff + " hour(s) of sleep in your last entry. You are oversleeping! Try to increase your sleep quality and decrease your sleep quantity."
        sleepQuality.style.color = "red";
    } else if (hourDiff <= 11 && hourDiff > 8) {
        sleepQuality.textContent = "In your last entry, you said you got " + hourDiff + " hour(s) of sleep! You're getting a lot of sleep! Just be mindful and try not to sleep too much."
        sleepQuality.style.color = "orange";
    } else if (hourDiff <= 8 && hourDiff >= 6) {
        sleepQuality.textContent = "You got " + hourDiff + " hour(s) of sleep! You're getting the right amount of sleep! Try to not exercise too close to bedtime to keep this up."
        sleepQuality.style.color = "green";
    } else if (hourDiff < 6) {
        sleepQuality.textContent = "You got " + hourDiff + " hour(s) of sleep! You need more sleep! Try sleeping in a dark, cool room and limiting your exposure to light near bedtime."
        sleepQuality.style.color = "red";
    } else if (hourDiff == 0) {
        sleepQuality.textContent = "You got " + hourDiff + " hours of sleep? You need to sleep!"
        sleepQuality.style.color = "red";
    }
});

//  Search for a specific date
searchButton.addEventListener("click", function () {
    let searchFormLog = state.formLog.filter((sleepEvent) => sleepEvent.date === inputDate.value);
    console.log(searchFormLog);
    if (searchFormLog.length > 0) {
        renderLogs(searchFormLog);
    } else {
        let logs = document.querySelector("#logs");
        logs.textContent = "";
        let p = document.createElement("p");
        p.textContent = "No search results found. Try another date."
        logs.appendChild(p);
    }
});

// Clear a specific date and go back to original display
clearQueryButton.addEventListener("click", function () {
    let searchFormLog = state.formLog;
    inputDate.value = "";
    if (searchFormLog.length > 0) {
        renderLogs(searchFormLog);
    } else {
        let logs = document.querySelector("#logs");
        logs.textContent = "";
        let p = document.createElement("p");
        p.textContent = "Currently your sleep log is empty. Please submit a form to add your sleep schedule!"
        logs.appendChild(p);
    }
});

// Clear log
clearLogButton.addEventListener("click", function () {
    state.formLog = [];
    let searchFormLog = state.formLog;
    renderLogs(searchFormLog);
    let logs = document.querySelector("#logs");
    logs.textContent = "";
    let p = document.createElement("p");
    p.textContent = "Currently your sleep log is empty. Please submit a form to add your sleep schedule!"
    logs.appendChild(p);
});

// Printing out the logs for the program
function renderLogs(formLog) {
    let logs = document.querySelector("#logs");

    // Clears the current log
    let child = logs.lastElementChild;
    while (child) {
        child.remove();
        child = logs.lastElementChild;
    }

    // Prints out the logs
    let i = 1;
    for (let form of formLog) {
        // Created a mainCard for each form
        let mainCard = document.createElement("div");
        mainCard.classList.add("log-row");

        // Title
        let title = document.createElement("h4");
        title.textContent = "Day " + i + ": On " + form.date + ", you slept from " + form.sleep + " to " + form.wakeup + ".";
        mainCard.appendChild(title);

        // Adding Description
        let desc = document.createElement("p");
        mainCard.addEventListener("click", function () {
            form.show = !form.show;
            renderLogs(formLog);
        });

        // If we want to show the form
        if (form.show) {
            desc.textContent = "You did " + (form.caf ? "" : "not") + " drink caffeine and did " + (form.caf ? "" : "not") + " take medicine. " + (form.think.length == 0 ? "" : ("You thought you fell asleep in " + form.think + "."));
            desc.classList.add("lightDesc");
        }

        // Adding them to the Form Logs
        mainCard.appendChild(desc);
        logs.appendChild(mainCard);
        i++;
    }
}