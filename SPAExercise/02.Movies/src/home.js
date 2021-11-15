// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { e } from './dom.js';
import { showDetails } from './details.js';
import { updateNav } from './app.js'
import { showCreate } from './create.js';

// - detach section from DOM
const section = document.getElementById('home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');

let moviesCache;
let lastLoaded;
let cacheLife = 10000;


export function clearCache() {
    moviesCache = '';
}

section.querySelector('#create-link').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
});

catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
})
section.remove();

export function showAdd() {
    const addBtn = document.getElementById('add-movie-button');
    if (sessionStorage.getItem('userData')) {
        addBtn.style.display = 'block';
    } else {
        addBtn.style.display = 'none';
    }
}


// display logic

export function showHome() {
    updateNav();
    getMovies();
    showView(section);
    showAdd();
}


export async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading Movies...'))
    if (!moviesCache || (Date.now() - lastLoaded) > cacheLife) {
        const response = await fetch('http://localhost:3030/data/movies');
        const data = await response.json();
        moviesCache = data;
        lastLoaded = Date.now();
    }
    
    catalog.replaceChildren(...moviesCache.map(createMovieCard));
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML =
    `<img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id=${movie._id} href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`

    return element;
}

