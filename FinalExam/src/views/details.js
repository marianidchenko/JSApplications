import { deleteById, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>
            ${isOwner
            ? html`
            <div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
            : ''
            }

        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const album = await getAlbumById(ctx.params.id);
    const isOwner = userData && album._ownerId == userData.id;

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?')
        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
    }

    ctx.render(detailsTemplate(album, isOwner, onDelete));
}