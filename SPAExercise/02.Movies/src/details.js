// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { e } from './dom.js';
import { showHome } from './home.js';
import { getMovies } from './home.js';
import { clearCache } from './home.js';
import { showEdit } from './edit.js';


// - detach section from DOM
const section = document.getElementById('movie-example');
section.remove();
let currentId = ''

// display logic

export async function showDetails(id) {
    currentId = id
    showView(section);
    await getMovie(id);
}

export async function getMovie(id) {
    section.replaceChildren(e('p', {}, 'Loading...'))


    const requests = [
        fetch('http://localhost:3030/data/movies/' + id),
        fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`),
    ];

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        requests.push(fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`))
    }
    const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests)
    const [movieData, likes, hasLiked] = await Promise.all([
        movieRes.json(),
        likesRes.json(),
        hasLikedRes && hasLikedRes.json()
    ])
    section.replaceChildren(createDiv(movieData, likes, hasLiked));
}

function createDiv(movie, likes, hasLiked) {
    const controls = e('div', { className: 'col-md-4 text-center' },
        e('h3', { className: 'my-3' }, 'Movie Description'),
        e('p', {}, movie.description),
        e('span', { className: 'enrolled-span' }, `Liked ${likes}`)
    );
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        if (userData.id === movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', href: '#', onClick: deleteMovie }, 'Delete'));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: '#', onClick: showEdit }, 'Edit'));
        } else {
            if (hasLiked.length > 0) {
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onUnlike }, 'Unlike'));
            } else {
                controls.appendChild(e('a', { className: 'btn btn-primary', href: '#', onClick: onLike }, 'Like'));
            }
        }
    }

    const element = e('div', { className: 'container' },
        e('div', { className: 'row bg-light text-dark' },
            e('h1', {}, `Movie title: ${movie.title}`),
            e('div', { className: 'col-md-8' },
                e('img', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' })
            ),
            controls
        )
    )
    return element;

    async function onLike(event) {
        const response = await fetch(`http://localhost:3030/data/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token,
            },
            body: JSON.stringify({ movieId: movie._id })
        })
        showDetails(movie._id);
    }

    async function onUnlike(event) {
        const response = await fetch(`http://localhost:3030/data/likes/${hasLiked[0]._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token,
            },
        })
        showDetails(movie._id);
    }

    async function deleteMovie(event) {
        event.preventDefault();
        const response = await fetch(`http://localhost:3030/data/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token,
            },
        })
        getMovies();
        showHome();
        clearCache();
    }
}

export function getId() {
    return currentId;
}

