const day = document.getElementById("day");
const date = document.getElementById("date");


// DATE

function updateDate(){

    const now = new Date();

    day.textContent = now.toLocaleDateString("en-US",{
        weekday:"long"
    });


    date.textContent = now.toLocaleDateString("en-US",{
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}


updateDate();


// CLOCK

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

const formatBtn = document.getElementById("formatBtn");

let is24Hour = true; // default 24 hour format



function updateClock(){

    const now = new Date();

    let hours = now.getHours();


    // Convert to 12 hour format
    if(!is24Hour){

        hours = hours % 12;
        hours = hours || 12;

    }


    hour.textContent = String(hours).padStart(2,"0");

    minute.textContent = String(now.getMinutes())
        .padStart(2,"0");

    second.textContent = String(now.getSeconds())
        .padStart(2,"0");


    // Flip animation
    [hour, minute, second].forEach(box=>{

        box.classList.remove("flip");

        void box.offsetWidth;

        box.classList.add("flip");

    });

}



// CHANGE FORMAT BUTTON

formatBtn.addEventListener("click",()=>{

    is24Hour = !is24Hour;

    updateClock();

});



updateClock();

setInterval(updateClock,1000);