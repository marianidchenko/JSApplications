import { page, render} from './lib.js';
import { logout } from './api/data.js'
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { getUserData } from './util.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/search', searchPage)

page.start();
updateUserNav();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('#loginBtn').style.display = 'none';
        document.querySelector('#registerBtn').style.display = 'none';
        document.querySelector('#createBtn').style.display = 'inline';
        document.querySelector('#logoutBtn').style.display = 'inline';
    } else {
        document.querySelector('#loginBtn').style.display = 'inline';
        document.querySelector('#registerBtn').style.display = 'inline';
        document.querySelector('#createBtn').style.display = 'none';
        document.querySelector('#logoutBtn').style.display = 'none';
    }
}