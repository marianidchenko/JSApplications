import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

// create placeholder modules for every view
// configure navigation
//implement modules
// - create async functions and requests
// - implement DOM logic
document.getElementById('views').style.display = 'none';
const nav = document.querySelector('nav');

const views = {
    'home-link': showHome,
    'login-link': showLogin,
    'register-link': showRegister,
}

nav.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view === 'function') {
        event.preventDefault();
        view();
    }
})

//order of views:
// - catalog view
// - login/register
// - create
// - Details
// - likes 
// - edit 
// - delete

showHome();

document.getElementById('logout-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const {token} = JSON.parse(sessionStorage.getItem('userData'));
    await fetch('http://localhost:3030/users/logout', {
        headers: {'X-Authorization': token},
    })
    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
})

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none')
        document.getElementById('welcome-user').textContent = `Welcome, ${userData.email}`
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block')
    }
}