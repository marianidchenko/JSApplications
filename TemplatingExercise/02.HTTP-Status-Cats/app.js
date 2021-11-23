import { html, render } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { cats } from './catSeeder.js'

const section = document.getElementById('allCats');

const template = (cat, onDetails) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${() => onDetails(cat)}>${cat.details ? 'Hide status code' : 'Show status code'}</button>
        <div class="status" style=${styleMap({display: cat.details ? 'block' : 'none'})} id="${cat.id}">
            <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
            <p class="card-text">${cat.statusMessage}</p>
        </div>
    </div>
</li>
`

load();

function load() {
    renderCats();

    function onDetails(cat) {
        cat.details = !cat.details;
        renderCats()
    }

    function renderCats() {
        render(html`<ul>${cats.map(c => template(c, onDetails))}</ul>`, section)
    }
}