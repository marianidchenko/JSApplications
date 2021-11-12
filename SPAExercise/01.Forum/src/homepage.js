// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { createPostCard } from './createhomepost.js';
import { setId } from './post.js';
import { showPost } from './post.js';

// - detach section from DOM
const section = document.querySelector('.container');

const buttonsSection = document.querySelector('.new-topic-buttons');
const createBtn = buttonsSection.children[1];
const cancelBtn = buttonsSection.children[0];
const form = section.getElementsByTagName('form')[0];
const postContainer = document.querySelector('.topic-container');


createBtn.addEventListener('click', createPost);
cancelBtn.addEventListener('click', () => form.reset());
postContainer.addEventListener('click', (event) => {
    if (event.target.tagName == 'H2') {
        let id = event.target.parentNode.parentNode.parentNode.id;
        setId(id);
        showPost();
    }

})
section.remove();

// display logic

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        if (response.ok !== true) {
            let error = await response.json();
            throw new Error(error)
        }
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}

async function createPost(event) {
    let formData = new FormData(form);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
    data['time'] = new Date().toLocaleString();
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok !== true) {
            let error = await response.json();
            throw new Error(error)
        }
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}

async function loadPosts() {
    postContainer.replaceChildren();
    const data = await fetchData();
    for (const post of Object.values(data)) {
        postContainer.appendChild(createPostCard(post))
    }
}

export function showHome() {
    loadPosts();
    showView(section);
}