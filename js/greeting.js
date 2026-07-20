
const greeting=document.getElementById("greeting");

function updateGreeting(){

    const hour=new Date().getHours();

    if(hour>=5 && hour<12){

        greeting.textContent="🌅 Good Morning";

    }

    else if(hour>=12 && hour<17){

        greeting.textContent="☀️ Good Afternoon";

    }

    else if(hour>=17 && hour<21){

        greeting.textContent="🌆 Good Evening";

    }

    else{

        greeting.textContent="🌙 Good Night";

    }

}

updateGreeting();

