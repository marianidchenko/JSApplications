// initialization
// - find relevant seciont
import { showView } from './dom.js';
import { showHome } from './home.js';

// - detach section from DOM
const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin)
section.remove();

// display logic

export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    
    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (response.ok !== true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email, 
            id: data._id,
            token: data.accessToken
        }))
        
        form.reset();
        
        showHome();

    } catch (err) {
        alert(err.message);
    }
}