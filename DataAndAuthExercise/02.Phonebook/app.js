function attachEvents() {
    const phonebook = document.getElementById('phonebook');
    document.getElementById('btnLoad').addEventListener('click', load);
    document.getElementById('btnCreate').addEventListener( 'click', create);

    async function fetchData() {
        const response = await fetch('http://localhost:3030/jsonstore/phonebook');
        const data = await response.json();

        return Object.values(data)
    }

    async function load() {
            const data = await fetchData();
            phonebook.innerHTML = '';
            data.forEach(x => phonebook.appendChild(newElement(x)))
    }

    function newElement(details) {
        let newLi = document.createElement('li');
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', deleteCurrent)

        newLi.textContent = `${details.person}: ${details.phone}`
        newLi.appendChild(deleteBtn);
        newLi.id = details._id

        return newLi;
    }

    async function deleteCurrent(event) {
        let id = event.target.parentNode.id;
        await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, { method: 'DELETE'})
        event.target.parentNode.outerHTML = '';
    }

    async function create() {
        let [personField, numberField] = document.querySelectorAll('input');
        const [person, number] = [personField.value, numberField.value];
        [personField.value, numberField.value] = ['', ''];

        await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                "person": person,
                "phone": number,
            })
        });

        load()
    }
}

attachEvents();