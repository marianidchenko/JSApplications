import { html } from '../library.js';
import { until } from '../library.js';
import * as api from '../api/data.js';

const catalogTemplate = (dataPromise, userPage) => html`
<div class="row space-top">
    <div class="col-md-12">
        ${userPage ? html`<h1>My furniture</h1>
        <p>This is a list of your publications.</p>` :
        html`<h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>`}
    </div>
</div>
<div class="row space-top">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</div>`


const itemTemplate = (item) =>
    html`
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src="${item.img}" />
                    <p>${item.description}</p>
                    <footer>
                        <p>Price: <span>${item.price} $</span></p>
                    </footer>
                    <div>
                        <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
        </div>`

export function catalogPage(ctx) {
    const userPage = ctx.pathname == '/my-furniture';
    ctx.render(catalogTemplate(loadItems(userPage), userPage));
}

async function loadItems(userPage) {
    let items = [];
    if (userPage) {
        items = await api.getMyItems(JSON.parse(sessionStorage.getItem('userData')).id);
    } else {
        items = await api.getAll();
    }
    return items.map(itemTemplate);
}