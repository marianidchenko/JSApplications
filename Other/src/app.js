import { page, render} from './lib.js';
import { logout } from './api/data.js'
import { homePage } from './views/home.js';


const root = document.querySelector('main')

page(decorateContext);
page('/', homePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}

function onLogout() {
    logout();
}

function updateUserNav() {
    const userData = getUserData();
    if (userData) {

    } else {

    }
}