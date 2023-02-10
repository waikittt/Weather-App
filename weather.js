window.addEventListener('load', () => {
    let long, lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locTz = document.querySelector('.location-timezone');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&timezone=Asia%2FSingapore`;
            
            // `fetch` to make an HTTP GET request to the API endpoint
            // `then` called on the returned promise, resolves with the response from the API
            fetch(api)
                .then(response => {return response.json();}) //response parsed as JSON
                .then(data => {
                    console.log(data)
                    const {temperature, weathercode} = data.current_weather;  // extract temp from current_weather
                    // set DOM elements based on API
                    tempDegree.textContent = temperature;
                    tempDesc.textContent = weatherDescription[weathercode];
                    locTz.textContent = data.timezone;


                });
        });
    }   
    else {
        h1.textContent = "This is not working :D"
    }

    
});

// Weather interpretation codes 
const weatherDescription = {
    "0" : "Clear Sky",
    "1" : "Mainly Clear",
    "2" : "Partly Cloudy",
    "3" : "Overcast",
    "45" : "Fog",
    "48" : "Depositing Rime Fog",
    "51" : "Light Drizzle",
    "53" : "Moderate Drizzle",
    "55" : "Dense Intensity Drizzle",
    "56" : "Light Freezing Drizzle", 
    "57" : "Dense Intensity Freezing Drizzle",
    "61" : "Slight Rain",
    "63" : "Moderate Rate",
    "65" : "Heavy Intensity Rain",
    "66" : "Light Freezing Rain",
    "67" : "Heavy Intensity Freezing Rain",
    "71" : "Slight Snow Fall",
    "73" : "Moderate Snow Fall",
    "75" : "Heavy Intensity Snow Fall",
    "77" : "Snow Grains",
    "80" : "Slight Rain Showers",
    "81" : "Moderate Rain Showers",
    "82" : "Violent Rain Showers",
    "85" : "Slight Snow Showers",
    "86" : "Heavy Snow Showers", 
    "95" : "Thunderstorm"
}