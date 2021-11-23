import { html, render } from '../node_modules/lit-html/lit-html.js';

const selectionMenu = document.getElementById('menu');
const url = 'http://localhost:3030/jsonstore/advanced/dropdown'
const template = (data) => html`<option value="${data._id}">${data.text}</option>`
const form = document.querySelector('form')

form.addEventListener('submit', addOption)

async function fetchData() {
    return await (await fetch(url)).json();
}

async function load() {
    const data = await fetchData();
    render(Object.values(data).map(d => template(d)), selectionMenu);
}

async function addOption(event) {
    event.preventDefault();
    const text = document.getElementById('itemText').value;
    form.reset();

    const response = await fetch(url, { 
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({text})
     });

     if (response.ok === true) {
        alert('Added!');
        load();
     }
}


load();