'use strict';

// Adding CSV for sleep data
// Used some catching to see if csv file is not present
let error = document.querySelector("#error");
let csv = 'sleep_advice.csv';
let d3;
let sleepAnalysis = d3.csv(csv)
    .then((response) => {
      error.classList.add("d-none")
      state.sleepAnalysis = response;
    })
    .catch(() => {
      error.innerHTML = "";
      error.classList.add("alert-danger");
      error.textContent = "Sleep Advice Not Loaded";
    });
// Data stored in the website
let state = {
    noInformation: "You have not put any information yet into the site! Please use the form to add new information",
    formLog: [],
    sleepAnalysis : sleepAnalysis
}

// Creates the popup at the very top once the details button is pressed
let showMore = document.querySelector('#showMore');
showMore.addEventListener('click', function () {
    let show = document.querySelector('#toggle');
    renderDetails();
    show.classList.toggle("show");
});

// Rendering the Details for div element
// gives advice based on time slept at
function renderDetails() {
    let details = document.querySelector("#moredetails");
    details.innerHTML = "";
    let summary = document.createElement("p");
    let advice = document.createElement("p");
    if (state.formLog.length == 0) {
        summary.textContent = state.noInformation;
    } else {
        let log = state.formLog[state.formLog.length - 1];
        summary.textContent = "On " + log.date + ", You slept at " + log.sleep + " and woke up at " + log.wakeup + ". You had " + (log.med ? "" : "no") + " medications and " + (log.caff ? "" : "no") + " caffeine last night.";
        advice.textContent = state.sleepAnalysis[log.sleepTime>12?12:log.sleepTime].Advice;
    }
    details.appendChild(summary);
    details.appendChild(advice);
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

    // adding sleep time
    var sleepTime = +sleep.value.substring(0, 2);
    var sleepMins = +sleep.value.substring(2);

    // if minutes section is 30 or above, round up the hour
    if (sleepMins >= 30) {
        sleepTime++;
    }
    var wakeTime = +wakeup.value.substring(0, 2);
    var wakeMins = +wakeup.value.substring(2);
    if (wakeMins >= 30) {
        wakeTime++;
    }

    // get the amount of hours slept
    var hourDiff = Math.abs(sleepTime - wakeTime);
    console.log(hourDiff)

    // Adding values to render
    state.formLog.push({ date: date.value, sleep: sleep.value, wakeup: wakeup.value, caf: yesCaf.checked, med: yesMed.checked, think: think.value, show: false, sleepTime: hourDiff });

    // Sorts 

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
    for (let form of formLog) {
        // Created a mainCard for each form
        let mainCard = document.createElement("div");
        mainCard.classList.add("log-row");

        // Title
        let title = document.createElement("h4");
        title.textContent = "On " + form.date + ", you slept from " + form.sleep + " to " + form.wakeup + ".";
        mainCard.appendChild(title);

        // Adding Description
        let desc = document.createElement("p");
        mainCard.addEventListener("click", function () {
            form.show = !form.show;
            renderLogs(formLog);
        });
        // If we want to show the form
        if (form.show) {
            let sleepQual = state.sleepAnalysis[form.sleepTime>12?12:form.sleepTime];
            desc.textContent = "You did " + (form.caf ? "" : "not") + " drink caffeine and did " + (form.caf ? "" : "not") + " take medicine. " + (form.think.length == 0 ? "" : ("You thought you fell asleep in " + form.think + ".")) +  "Your sleep rating is " + sleepQual.Rating + ". " + sleepQual.Advice;
            desc.classList.add("lightDesc");
        }

        // Adding them to the Form Logs
        mainCard.appendChild(desc);
        logs.appendChild(mainCard);
    }
}