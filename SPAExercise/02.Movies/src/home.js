// initialization
// - find relevant seciont
import { showView } from './dom.js';

// - detach section from DOM
const section = document.getElementById('home-page');
section.remove();

// display logic

export function showHome() {
    showView(section);
}