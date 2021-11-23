import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const section = document.getElementById('towns');
const result = document.getElementById('result');
const textField = document.querySelector('#searchText');
let text;


const template = (town) => html`
      <li class=${town.toLocaleLowerCase().includes(text) ? 'active' : 'none' }>${town}</li>
   `

load();

function load() {
   render(html`<ul>${towns.map(template)}</ul>`, section);

   document.querySelector('button').addEventListener('click', () => {
      text = textField.value.trim().toLocaleLowerCase();
      textField.innerHTML = ''

      let numFound = towns.filter(t => t.toLocaleLowerCase().includes(text)).length;
      result.textContent = `${numFound} matches found`
      load();
   })
}
