const resultField = (document.getElementById('results')).children[1];
const submitBtn = document.getElementById('submit');
    
async function fetchData() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = Object.values(await response.json());
    return data;
}

async function listStudents() {
    resultField.innerHTML = ''
    let data = await fetchData();
    data.forEach(student => {
        const newTr = document.createElement('tr');
        
        Object.entries(student).forEach(([k, v]) => {
            const newTd = document.createElement('td');
            if (k !== '_id'){
                newTd.innerHTML = v;
                newTr.appendChild(newTd);
            }
        })
        resultField.appendChild(newTr);
    })
}    

async function addStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify(Object.fromEntries(formData))
    })
    listStudents();
}


window.addEventListener('load', (event) => {
    event.preventDefault();
    listStudents()
    document.addEventListener('submit', addStudent)
})