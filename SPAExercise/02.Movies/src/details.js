// initialization
// - find relevant seciont
import { showView } from './dom.js';

// - detach section from DOM
const section = document.getElementById('movie-example');
section.remove();

// display logic

export function showDetails() {
    showView(section);
}