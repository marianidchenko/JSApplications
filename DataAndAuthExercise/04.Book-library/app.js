const updateForm = document.getElementById('update-form');
const createForm = document.getElementById('create-form');
const table = document.querySelector('tbody');
updateForm.style.display = 'none';

async function fetchAll() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books')
    const data = await response.json();
    return data;
}
async function loadAll() {
    const data = await fetchAll();
    for (const id in data) {
        createRow(data[id].author, data[id].title, id)
    }
}

function createRow(author, title, id) {
    let newTr = document.createElement('tr');
    newTr.id = id;
    newTr.innerHTML = `<td>${title}</td><td>${author}</td><td><button>Edit</button><button>Delete</button></td>`
    table.appendChild(newTr);
    let [editBtn, deleteBtn] = newTr.getElementsByTagName('button');
    editBtn.addEventListener('click', editBook)
    deleteBtn.addEventListener('click', deleteBook)
}

async function createBook(event) {
    event.preventDefault();
    const newFromData = new FormData(event.target);
    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(newFromData))
    })
    event.target.reset();
    table.innerHTML = ''
    loadAll();
}

async function deleteBook(event) {
    let rowId = event.target.parentElement.parentElement.id;
    await fetch(`http://localhost:3030/jsonstore/collections/books/${rowId}`, { method: 'DELETE' })
    table.removeChild(document.getElementById(rowId));
}

function editBook(event) {
    let rowId = event.target.parentElement.parentElement.id;
    updateForm.style.display = 'block';
    createForm.style.display = 'none';
    updateForm.addEventListener('submit', updateEntry)

    async function updateEntry(event) {
        const newFromData = new FormData(event.target);
        let newAuthor = newFromData.get('author');

        let newTitle = newFromData.get('title');
        await fetch(`http://localhost:3030/jsonstore/collections/books/${rowId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(newFromData))
        })
    }
}

window.addEventListener('load', (event) => {
    event.preventDefault();
    loadAll();
    createForm.addEventListener('submit', createBook);
})