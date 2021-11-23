import { html, render } from '../node_modules/lit-html/lit-html.js';

const container = document.querySelector('.container tbody');
const template = (data) => html`
<tr id="${data._id}" class="${searchedIds.includes(data._id) ? 'select' : ''}">
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>`
let searchedIds = [];
let studentData = [];


async function loadDetails() {
   const data = await (await fetch('http://localhost:3030/jsonstore/advanced/table')).json();
   studentData = Object.values(data);
   render(studentData.map((d) => template(d)), container);

}

document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
   const text = document.querySelector('#searchField').value.trim();
   document.querySelector('#searchField').value = '';
   searchedIds = [];
   for (const student of studentData) {
      if (Object.values(student).some(v => text && v.toLocaleLowerCase().includes(text.toLocaleLowerCase()))) {
         searchedIds.push(student._id);
      }
   }
   loadDetails();
}


loadDetails();
