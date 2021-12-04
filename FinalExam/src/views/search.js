import { searchByName } from "../api/data.js";
import { html } from '../lib.js';
import { getUserData } from "../util.js";

let searchInput;
let userData;

const searchTemplate = (onSearch, results) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="search-result">
    ${searchInput
    ? html`
    <div>
        ${(results.length > 0)
        ? results.map(resultTemplate)
        : html`<p class="no-result">No result.</p>`
        }
    </div>`
        : ''
    }
</section>`

const resultTemplate = (result) => html`
    <div class="card-box">
            <img src="${result.imgUrl}">
            <div>
            <div class ="text-center">
            <p class ="name">Name: ${result.name}</p>
            <p class ="artist">Artist: ${result.artist}</p>
            <p class ="genre">Genre: ${result.genre}</p>
            <p class ="price">Price: $${result.price}</p>
            <p class ="date">Release Date: ${result.releaseDate}</p>
            </div>
            ${userData
            ? html`
            <div class ="btn-group">
                <a href='/details/${result._id}' id="details">Details</a>
            </div>`
            : ''}
            </div>
        </div>`


export async function searchPage(ctx) {
    userData = getUserData();

    async function onSearch() {
        searchInput = document.querySelector('#search-input').value.trim();
        if (searchInput == '') {
            return alert('Please enter a search word.')
        }
        const results = await searchByName(searchInput);
        ctx.render(searchTemplate(onSearch, results))
    }

    ctx.render(searchTemplate(onSearch, []))
}

