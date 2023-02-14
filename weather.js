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

                    // // set DOM elements based on API
                    tempDegree.textContent = temperature;
                    tempDesc.textContent = data.weather[0]["description"]; //weatherDescription[weathercode];
                    locArea.textContent = data.name;
                    locCountry.textContent = data.sys.country;

                    //set the icon
                    const iconID = data.weather[0]["icon"]
                    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconID}@2x.png"/>`   
                    
                    // change temperature to Celsius/Fahrenheit 
                    tempSection.addEventListener('click', () => {
                        convertTemp(temperature);
                    });
                });
        }); 
    }   
    else {
        h1.textContent = "This is not working :D"
    }

    function convertTemp (temp) {
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



