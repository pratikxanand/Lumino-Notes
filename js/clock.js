
const day=document.getElementById("day");

const date=document.getElementById("date");

function updateDate(){

    const now=new Date();

    day.textContent=now.toLocaleDateString("en-US",{

        weekday:"long"

    });

    date.textContent=now.toLocaleDateString("en-US",{

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}
// time

updateDate();

const hour=document.getElementById("hour");
const minute=document.getElementById("minute");
const second=document.getElementById("second");

function updateClock(){

    const now=new Date();

    hour.textContent=String(now.getHours()).padStart(2,"0");
    minute.textContent=String(now.getMinutes()).padStart(2,"0");
    second.textContent=String(now.getSeconds()).padStart(2,"0");

    [hour,minute,second].forEach(box=>{

        box.classList.remove("flip");

        void box.offsetWidth;

        box.classList.add("flip");

    });

}

updateClock();

setInterval(updateClock,1000);