const temp = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");


function getLocation(){

    navigator.geolocation.getCurrentPosition(
        (position)=>{

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getWeather(lat, lon);
            getCity(lat, lon);

        },
        ()=>{
            city.innerHTML = "Location denied";
        }
    );

}



async function getWeather(lat, lon){

    let url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;


    let response = await fetch(url);

    let data = await response.json();


    temp.innerHTML =
    data.current.temperature_2m + "°C";

    humidity.innerHTML =
    data.current.relative_humidity_2m + "%";

    wind.innerHTML =
    data.current.wind_speed_10m + " km/h";

}


async function getCity(lat, lon){

    try{

        const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );


        const data = await response.json();


        const address = data.address;


        city.innerHTML =
        address.city ||
        address.town ||
        address.village ||
        address.county ||
        "Unknown location";


    }
    catch(error){

        console.log(error);
        city.innerHTML = "City unavailable";

    }

}

getLocation();