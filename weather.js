import { API_KEY } from '/env.js'

window.addEventListener('load', () => {
    // lower the volume of music
    document.getElementById("myAudio").volume = 0.2; 

    let long, lat;
    let tempDesc = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let locArea = document.querySelector('.location-area');
    let locCountry = document.querySelector('.location-country');
    let icon = document.getElementById('weather-icon')
    let tempSection = document.querySelector('.degree-section')
    let tempSpan = document.querySelector('.degree-section span')
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            useApi(lat, long); 
            interactMap(lat, long);  // create the map
        }); 
    }   

    // use the weather API and update HTML elements
    function useApi(lat, long) {
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

            // `fetch` to make an HTTP GET request to the API endpoint
            // `then` called on the returned promise, resolves with the response from the API
            fetch(api)
                .then(response => {return response.json();}) //response parsed as JSON
                .then(data => {
                    console.log(data)
                    const 
                        temperature = data.main.temp,
                        description = data.weather[0]["description"];

                    // set DOM elements based on API
                    tempDegree.textContent = temperature;
                    tempDesc.textContent =  description;
                    locArea.textContent = data.name;
                    locCountry.textContent = data.sys.country;

                    // set the weather icon
                    const iconID = data.weather[0]["icon"]
                    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconID}@2x.png"/>`   

                    // listen to the click event on the temperature element
                    tempSection.addEventListener('click', () => {
                        convertTemp(temperature);
                    });
                    // change background
                    setBackground(description);
                }); 
    }

    // implement the Leaflet interactive map 
    function interactMap(latitude, longitude) {
        // initialize map, set view to user's current geographical coordinates and zoom level
        var map = L.map('map').setView([latitude, longitude], 13);

        // add a OpenStreetMap tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var marker = L.marker([latitude, longitude]).addTo(map);   // add marker to the map
        marker.bindPopup("How's the weather here?").openPopup();   // shows a popup when the marker is clicked

        // deal with click events on the map
        function onMapClick(event) {
            marker.setLatLng(event.latlng); // change position of marker

            let popup = L.popup();      // create a popup whenever user clicks on a new location
            popup
                .setLatLng(event.latlng)
                .setContent("Location changed" )
                .openOn(map);
            
            useApi(event.latlng.lat, event.latlng.lng);  // fetch from the API whenever the map is clicked
        }
        map.on('click', onMapClick);
    }

    // change temperature to Celsius/Fahrenheit 
    function convertTemp(temp) {
        if (tempSpan.textContent === "°C") {
            tempSpan.textContent = "F";
            let fahrenheit = (temp * 9/5) + 32;
            tempDegree.textContent = fahrenheit.toFixed(2);
        }
        else {
            tempSpan.textContent = "°C";
            tempDegree.textContent = temp;
        }
    } 
});

// set background of the webpage
function setBackground(weather) {
    document.body.style.backgroundSize = "cover"; //cover the whole page 

    if (weather.includes("clouds")) {
        document.body.style.backgroundImage = `url("https://media.istockphoto.com/photos/blue-sky-and-white-clouds- picture-id1178574687?b=1&k=20&m=1178574687&s=612x612&w=0&h=q25_Nl3XXcb9DJfrXCLMSatu_v-JckhHh0fURRDiI5o=")`;     
    }
    else if (weather.includes("thunder")) {
        document.body.style.backgroundImage = `url("https://www.scotsman.com/webimg/b25lY21zOjI0YWViZTc3LWJiZDQtNGM4Ny05NzIwLTYxNmZkODMyZDM0YToxNTAyMzNmMi1lZmJjLTRhNjEtOTY3NS0wNTdmMzNlY2VjZGY=.jpg?width=1200&enable=upscale")`;     
    }
    else if (weather.includes("clear")) {
        document.body.style.backgroundImage = `url("https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7728.jpg")`;     
    }
    else if (weather.includes("rain") || weather.includes("drizzle")) {
        document.body.style.backgroundImage = `url("https://c0.wallpaperflare.com/preview/765/195/605/grey-clouds.jpg")`;
    }
}






