window.addEventListener('load', () => {
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

            //const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current_weather=true&timezone=Asia%2FSingapore`;
            const apiKey = "1c337f3844b547c4863a294452962d58"
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`

            // `fetch` to make an HTTP GET request to the API endpoint
            // `then` called on the returned promise, resolves with the response from the API
            fetch(api)
                .then(response => {return response.json();}) //response parsed as JSON
                .then(data => {
                    console.log(data)
                    const temperature = data.main.temp;
                    const description = data.weather[0]["description"];

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
        }); 
    }   
    else {
        h1.textContent = "This is not working :D"
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
});



