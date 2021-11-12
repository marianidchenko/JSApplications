import { showHome } from "./home.js";
import { showDetails } from "./details.js"
import { showCreate } from "./create.js"
// create placeholder modules for every view
// configure navigation
//implement modules
// - create async functions and requests
// - implement DOM logic

document.querySelector('nav').addEventListener('click', (event) => {
    event.preventDefault();
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

window.showHome = showHome;
window.showDetails = showDetails;
window.showCreate = showCreate;