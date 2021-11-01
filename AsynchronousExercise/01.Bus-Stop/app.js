function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    let stopName = document.getElementById('stopName');
    let busesField = document.getElementById('buses');

    fetch(url)
        .then(response => {
            if (response.ok == false) {
                throw new Error(`${response.status} ${response.statusText}`);
            } 
            return response.json();
        })
        .then(handleResponse)
        .catch(error => {stopName.textContent = 'Error'});
        busesField.innerHTML = ''

    function handleResponse(data) {
        stopName.textContent = data.name;
        for (const key in data.buses) {
            let newLi = document.createElement('li');
            newLi.textContent = `Bus ${key} arrives in ${data.buses[key]} minutes`
            busesField.appendChild(newLi);
        }
    }
}