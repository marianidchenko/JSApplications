function solution() {
    const main = document.getElementById('main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(response => {
            if (response.ok === false) {
                throw new Error('invalid response')
            }
            return response.json()
        })
        .then(getFullData)
        .catch((error) => {
            console.log(error)
        }) 

    function getFullData(data) {
        for (const each of data) {
           fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${each._id}`)
            .then(response => {
                if (response.ok === false) {
                    throw new Error('invalid response')
                }
                return response.json()
            })
            .then(createArticle)
            .catch((error) => {
                console.log(error)
            }) 
        }
    }

    function createArticle(data) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('accordion')
        newDiv.innerHTML = 
        `<div class="head">
        <span>${data.title}</span>
        <button class="button" id="${data._id}">More</button>
        </div>
        <div class="extra">
        <p>${data.content}</p>
        </div>`

        let button = newDiv.querySelector('button');
        button.addEventListener('click', showOrHide)
        main.appendChild(newDiv)

        function showOrHide(event) {
            if (button.textContent == 'More') {
                newDiv.getElementsByClassName('extra')[0].style.display = 'block';
                button.textContent = 'Less'
            } else {
                newDiv.getElementsByClassName('extra')[0].style.display = 'none';
                button.textContent = 'More'
            }
        }
    }
}

window.addEventListener('load', () => {
    solution();
});