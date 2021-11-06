function attachEvents() {
    let location = document.getElementById('location');
    let submit = document.getElementById('submit');
    let forecast = document.getElementById('forecast');
    let current = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    let validLocations = []

    submit.addEventListener('click', getWeather)

    fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then((response) => {
            if (response.ok == false) {
                throw new Error('Invalid server response.')
            }
            return response.json()
        })
        .then(data => { validLocations = data })
        .catch((error) => {
            forecast.textContent = 'Error'
            forecast.style.display = 'block'
        })

    async function getWeather(event) {
        current.replaceChildren();
        upcoming.replaceChildren();
        forecast.style.display = 'block'

        try {
            let locationData = validLocations.find(e => e.name == location.value);
            if (location.value == '' || locationData == undefined) {
                throw new Error('Location Invalid')
            }

            const todayResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationData.code}`)
            const todayForecast = await todayResponse.json();

            const upcomingResponse = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationData.code}`)
            const upcomingForecast = await upcomingResponse.json();

            let conditions = {
                'Sunny': '☀',
                'Partly sunny': '⛅',
                'Overcast': '☁',
                'Rain': '☂',
                degrees: '°',
            };

            let todayDiv = document.createElement('div');
            todayDiv.classList.add('forecasts');
            todayDiv.innerHTML =
                `<span class='condition symbol'>${conditions[todayForecast.forecast.condition]}</span>
                <span class='condition'>
                <span class='forecast-data'>${locationData.name}</span>
                <span class='forecast-data'>${todayForecast.forecast.low}${conditions.degrees}/${todayForecast.forecast.high}${conditions.degrees}</span>
                <span class='forecast-data'>${todayForecast.forecast.condition}</span>
                </span>`
            current.appendChild(todayDiv)


            let upcomingDiv = document.createElement('div');
            upcomingDiv.classList.add('forecast-info');
            for (const each of upcomingForecast.forecast) {
                upcomingDiv.innerHTML +=
                    `<span class='upcoming'>
                    <span class='symbol'>${conditions[each.condition]}</span>
                    <span class='forecast-data'>${each.low}${conditions.degrees}/${each.high}${conditions.degrees}</span>
                    <span class='forecast-data'>${each.condition}</span>
                    </span>`
            }
            upcoming.appendChild(upcomingDiv);


        } catch (error) {
            forecast.textContent = 'Error'
        }


    }
}

attachEvents();