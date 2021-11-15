// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { showHome } from './home.js';
import { updateNav } from './app.js';

// - detach section from DOM
const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();

// display logic

async function onRegister(event) {
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');

    try {
        event.preventDefault();
        if (password == '' || email == '' || repeatPassword == '') {
            throw new Error('All fields required!')
        }
        if (password !== repeatPassword) {
            throw new Error('Passwords don\'t match!');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.status == 409) {
            throw new Error('Already registered, please log in.')
        }

        const data = await response.json();
        event.target.reset();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));    
        updateNav();
        showHome();

    } catch (err) {
        alert(err.message);
    }
}

export function showRegister() {
    showView(section);
}