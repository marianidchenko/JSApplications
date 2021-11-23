import { html, render } from '../node_modules/lit-html/lit-html.js';

const root = document.getElementById('root');
const form = document.querySelector('.content')
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    let towns = form.querySelector('#towns').value.split(',').map(t => t.trim());
    
    form.reset();
    render(listTemplate(towns), root)
}

const listTemplate = (towns) => html`
<ul>
    ${towns.map((t) => html`<li>${t}</li>`)}
</ul>
`