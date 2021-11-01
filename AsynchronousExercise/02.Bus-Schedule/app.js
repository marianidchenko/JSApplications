function solve() {
    let url;
    let infoSection = document.getElementById('info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let nextId = 'depot'

    async function depart() {
        departBtn.disabled = true;
        if (infoSection.textContent == 'Not Connected') {
            url = 'http://localhost:3030/jsonstore/bus/schedule/depot'
        } else {
            url = `http://localhost:3030/jsonstore/bus/schedule/aaa`
        }

        try {
            const res = await fetch(url);
            stop = await res.json();

            infoSection.textContent = `Next stop ${stop.name}`
            arriveBtn.disabled = false;
        
        } catch(err) {
            infoSection.textContent = 'Error';
            arriveBtn.disabled = true;
            departBtn.disabled = true;
            
        }
    }

    async function arrive() {
        arriveBtn.disabled = true;
        departBtn.disabled = false;

        infoSection.textContent = `Arriving at ${stop.name}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();