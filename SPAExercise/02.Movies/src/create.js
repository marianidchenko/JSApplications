// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { showDetails } from './details.js';


// - detach section from DOM
const section = document.getElementById('add-movie');
section.remove();

// display logic
const userData = JSON.parse(sessionStorage.getItem('userData'))
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const image = formData.get('imageUrl');
    form.reset();

    if (title == '' || description == '' || image == '') {
        return alert('All fields are required.');
    };

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': userData.token},
        body: JSON.stringify({"title": title, "description": description, "img": image})
    })

    if (response.ok) {
        const movie = await response.json();
        showDetails(movie._id);
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

export function showCreate() {
    showView(section);
}