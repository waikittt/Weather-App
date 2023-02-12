window.addEventListener('load', () => {
    let long, lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locArea = document.querySelector('.location-area');
    let locCountry = document.querySelector('.location-country');
    let icon = document.getElementById('weather-icon')
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&timezone=Asia%2FSingapore`;
            const apiKey = "1c337f3844b547c4863a294452962d58"
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`

            // `fetch` to make an HTTP GET request to the API endpoint
            // `then` called on the returned promise, resolves with the response from the API
            fetch(api)
                .then(response => {return response.json();}) //response parsed as JSON
                .then(data => {
                    console.log(data)

                    //const {temperature, weathercode} = data.main;  // extract temp from current_weather
                    // // set DOM elements based on API
                    tempDegree.textContent = data.main.temp;
                    tempDesc.textContent = data.weather[0]["description"]; //weatherDescription[weathercode];
                    locArea.textContent = data.name;
                    locCountry.textContent = data.sys.country;

                    const iconID = data.weather[0]["icon"]
                    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconID}@2x.png"/>`                    
                });
        }); 
    }   
    else {
        h1.textContent = "This is not working :D"
    }

    // function setIcon(icon, iconID) {
    //     const skycons = new skycons({color: "white"});
    //     const currentIcon = icon.replace(/ /g, "_").toUpperCase();
    // }
});

// Weather interpretation codes 
// const weatherDescription = {
//     "0" : "Clear Sky",
//     "1" : "Mainly Clear",
//     "2" : "Partly Cloudy",
//     "3" : "Overcast",
//     "45" : "Fog",
//     "48" : "Depositing Rime Fog",
//     "51" : "Light Drizzle",
//     "53" : "Moderate Drizzle",
//     "55" : "Dense Intensity Drizzle",
//     "56" : "Light Freezing Drizzle", 
//     "57" : "Dense Intensity Freezing Drizzle",
//     "61" : "Slight Rain",
//     "63" : "Moderate Rate",
//     "65" : "Heavy Intensity Rain",
//     "66" : "Light Freezing Rain",
//     "67" : "Heavy Intensity Freezing Rain",
//     "71" : "Slight Snow Fall",
//     "73" : "Moderate Snow Fall",
//     "75" : "Heavy Intensity Snow Fall",
//     "77" : "Snow Grains",
//     "80" : "Slight Rain Showers",
//     "81" : "Moderate Rain Showers",
//     "82" : "Violent Rain Showers",
//     "85" : "Slight Snow Showers",
//     "86" : "Heavy Snow Showers", 
//     "95" : "Thunderstorm"
// }