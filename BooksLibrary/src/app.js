import { page, render} from './lib.js';
import { logout } from './api/data.js'
import { homePage } from './views/home.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { getUserData } from './util.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


const root = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext);
page('/', homePage);
page('/details/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage)
page('/edit/:id', editPage)
page('/profile', profilePage)

updateUserNav()
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}


function updateUserNav() {
    const userData = getUserData();
    if (userData) {
        document.querySelector("#user").style.display = 'inline-block';
        document.querySelector("#guest").style.display = 'none';
        document.querySelector("#user span").textContent = `Welcome, ${userData.email}`

    } else {
        document.querySelector("#guest").style.display = 'inline-block'
        document.querySelector("#user").style.display = 'none'
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}