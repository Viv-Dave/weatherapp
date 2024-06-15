function showData() {
    class cityData {
        constructor(locationName,region ,temperatureC, weatherCondition, feelslike, windspeed, humidity, uv) {
            this.locationName = locationName;
            this.temperatureC = temperatureC;
            this.weatherCondition = weatherCondition;
            this.region =region;
            this.feelslike = feelslike;
            this.windspeed = windspeed;
            this.humidity = humidity;
            this.uv = uv;
        }
    }
    const display = document.getElementById('display');
    display.innerHTML = '';
    const input = document.querySelector('input');
    if (input.value === '') {
        display.textContent = 'Please Enter a valid City Name!'
        display.style.fontWeight= 'bold';
    }
    event.preventDefault();
    const location = input.value; // Get the value from the input field
    //const apiKey = process.env.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=a05e9cd4930144a7a9171837241506&q=${location}&aqi=no`;
    fetch(url, {mode: 'cors'})
        .then(function(response) {
        return response.json(); // Return the parsed JSON
        })
        .then(function(data) {
            
            const City = new cityData(
                data.location.name,
                data.location.region,
                data.current.temp_c,
                data.current.condition.text,
                data.current.feelslike_c,
                data.current.wind_kph,
                data.current.humidity,
                data.current.uv
            );
            console.log(City);
            console.log(data);
            createCard(City);
        })
        .catch(function(error) {
        console.error('Error:', error); // Handle any errors
        });
    function createCard(anyCity) {
        const maincard = document.createElement('div');
        // Show data such as Cityname, Region, temperature, weathercondition,feelslike temp, windspeed, humidity
        const card = document.createElement('div');
        card.classList.add('card');

        //Append City, Condition, Temperature, feelslike in a single blue gradient card
        const blueCard = document.createElement('div');
        blueCard.classList.add('blueCard');
        //CityName with region
        const area = document.createElement('p');
        area.innerHTML = `City: <br>${anyCity.locationName}, <br>${anyCity.region}`;
        blueCard.appendChild(area);

        // Temperature 
        const temp = document.createElement('p');
        temp.innerHTML = `Temperature: ${anyCity.temperatureC}°C`;
        blueCard.appendChild(temp);

        // WeatherCondition
        const condition = document.createElement('p');
        condition.innerHTML = `Weather: <br> ${anyCity.weatherCondition}`;
        blueCard.appendChild(condition); //Add icon

        maincard.appendChild(blueCard);

        //feelslike (Place near Temp)
        const feelslike = document.createElement('p');
        feelslike.innerHTML =`Feels like: ${anyCity.feelslike}°C`;
        blueCard.appendChild(feelslike);

        //windspeed 
        const windspeed = document.createElement('p');
        windspeed.innerHTML = `Wind Speed <br> ${anyCity.windspeed} km/h`;
        card.appendChild(windspeed);

        // Humidity 
        const humidity = document.createElement('p');
        humidity.innerHTML =`Humidity <br> ${anyCity.humidity}%`;
        card.appendChild(humidity);
        
        //UV
        const uv = document.createElement('p');
        uv.innerHTML= `UV<br>${anyCity.uv}`;
        card.appendChild(uv);

        maincard.append(card);

        display.appendChild(maincard);
    }
}

export default showData;