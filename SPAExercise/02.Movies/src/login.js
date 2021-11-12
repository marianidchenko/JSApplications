// initialization
// - find relevant seciont
import { showView } from './dom.js';

// - detach section from DOM
const section = document.getElementById('form-login');
section.remove();

// display logic

export function showLogin() {
    showView(section);
}