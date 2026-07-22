// ================= ELEMENTS =================

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");


const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");


const quickButtons = document.querySelectorAll("[data-time]");


const customHour = document.getElementById("customHour");
const customMinute = document.getElementById("customMinute");
const addCustom = document.getElementById("addCustom");
const customList = document.getElementById("customList");


const usageDisplay = document.getElementById("usage");

const goal = document.getElementById("goal");
const completeGoal = document.getElementById("completeGoal");

const streakDisplay = document.getElementById("streak");




// ================= TIMER =================
const homeStreak = document.getElementById("homeStreak");


if(homeStreak){

    let streak = localStorage.getItem("streak") || 0;

    homeStreak.textContent = `${streak} Days`;

}

let timer;
let running = false;


let totalSeconds =
Number(localStorage.getItem("timer")) || 1500;



function showTime(){


    let h = Math.floor(totalSeconds / 3600);

    let m = Math.floor(
        (totalSeconds % 3600) / 60
    );

    let s = totalSeconds % 60;



    hour.textContent =
    String(h).padStart(2,"0");


    minute.textContent =
    String(m).padStart(2,"0");


    second.textContent =
    String(s).padStart(2,"0");


}




function startTimer(){


    if(running) return;


    running=true;


    timer=setInterval(()=>{


        if(totalSeconds > 0){


            totalSeconds--;


            addUsage();


            localStorage.setItem(
                "timer",
                totalSeconds
            );


            showTime();


        }

        else{


            stopTimer();

        }


    },1000);

}




function pauseTimer(){

    stopTimer();

}



function stopTimer(){

    clearInterval(timer);

    running=false;

}




function resetTimer(){


    stopTimer();


    totalSeconds=1500;


    localStorage.setItem(
        "timer",
        totalSeconds
    );


    showTime();

}




startBtn.onclick=startTimer;

pauseBtn.onclick=pauseTimer;

resetBtn.onclick=resetTimer;





// ================= QUICK TIMER =================


quickButtons.forEach(btn=>{


    btn.onclick=()=>{


        stopTimer();


        totalSeconds =
        Number(btn.dataset.time);


        showTime();


    }


});





// ================= CUSTOM TIMER =================



let customTimers =
JSON.parse(
localStorage.getItem("customTimers")
) || [];




function renderCustom(){


    customList.innerHTML="";


    customTimers.forEach((item)=>{


        let div=document.createElement("div");


        div.innerHTML=
        `${item.name}`;


        div.onclick=()=>{


            totalSeconds=item.time;


            showTime();


        };


        customList.appendChild(div);


    });

}




addCustom.onclick=()=>{


    let h =
    Number(customHour.value) || 0;


    let m =
    Number(customMinute.value) || 0;



    let seconds =
    (h*3600)+(m*60);



    if(seconds===0) return;



    customTimers.push({

        name:`${h}h ${m}m`,

        time:seconds

    });



    localStorage.setItem(
        "customTimers",
        JSON.stringify(customTimers)
    );


    renderCustom();


};





// ================= DAILY USAGE =================


function today(){

    return new Date()
    .toLocaleDateString();

}




let usageData =
JSON.parse(
localStorage.getItem("usage")
) || {

date:today(),

seconds:0

};




if(usageData.date !== today()){


    usageData={

        date:today(),

        seconds:0

    };


    localStorage.setItem(
        "usage",
        JSON.stringify(usageData)
    );

}





function addUsage(){


    usageData.seconds++;


    localStorage.setItem(
        "usage",
        JSON.stringify(usageData)
    );


    showUsage();


}




function showUsage(){


    let h =
    Math.floor(
        usageData.seconds / 3600
    );


    let m =
    Math.floor(
        (usageData.seconds % 3600)/60
    );


    usageDisplay.textContent=
    `${h}h ${m}m`;

}





// ================= GOAL + STREAK =================



let streak =
Number(
localStorage.getItem("streak")
) || 0;



streakDisplay.textContent=streak;



completeGoal.onclick=()=>{


    let completed =
    localStorage.getItem(
        "goalCompleted"
    );



    if(completed===today()) return;



    streak++;

    


    localStorage.setItem(
        "streak",
        streak
    );


    localStorage.setItem(
        "goalCompleted",
        today()
    );


    streakDisplay.textContent=streak;



    alert("🎉 Goal Completed! Streak +1");


};






// LOAD DATA

showTime();

renderCustom();

showUsage();