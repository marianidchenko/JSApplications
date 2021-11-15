// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { getId } from './details.js';
import { showDetails } from './details.js';
import { clearCache } from './home.js';

// - detach section from DOM
const section = document.getElementById('edit-movie');
const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
section.remove();

// display logic

export async function showEdit() {
    showView(section);
}

async function onSubmit(data) {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    const id = getId();
    try {
        const response = await fetch('http://localhost:3030/data/movies/' + id, { 
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({ "title": data.title, "description": data.description, "img": data.imageUrl })
        });

        if (response.ok) {
            showDetails(id);
        } else {
            throw new Error(await response.json());
        }
    } catch (err) {
        console.error(err.message);
    }
    clearCache();
}