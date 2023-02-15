# Weather App
A web app that shows the weather based on user's current location or a specific location pinpointed on the map. Built using vanilla JavaScript with the help of ChatGPT. 

### Steps
1. In order to use this app, you will have to obtain your own API key by registrating on [OpenWeatherMap](https://openweathermap.org/).
2. The API key will be available for use within a few hours after registration. 
3. Delete the import { API_KEY } statement in the weather.js file.
4. Replace the ${API_KEY} inside the API reference link in the useApi() function of weather.js file with your own API key. For example:
    - `const api = https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1c456f1234b547c9999a294452546d10&units=metric;`
5. The webpage will look like this ⬇ ⬇ ⬇ <br/><br/>
![image](./assets/page_example.jpg)
- - -
- **NOTE**: Please refresh the page if the weather cannot be retrieved from a certain location and try selecting that location again :)

### Credits
This project was built by utilizing the following resources:

- Tutorial video by developedbyed ([Build A Weather App With Vanilla Javascript Tutorial](https://www.youtube.com/watch?v=wPElVpR1rwA)).
- Weather API and icons from OpenWeatherMap.
- Interactive map from the Leaflet library.
- Music by [SoundsForYou](https://pixabay.com/users/soundsforyou-4861230/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=114484) from [Pixabay](https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=114484).
- Tile layer by [OpenStreetMap](https://www.openstreetmap.org/copyright).


