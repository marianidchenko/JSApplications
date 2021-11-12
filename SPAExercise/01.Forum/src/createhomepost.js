export function createPostCard(data) {
    let newDiv = document.createElement('div');
    newDiv.id = data._id;
    newDiv.classList.add('topic-name-wrapper')
    newDiv.innerHTML = 
    `<div class="topic-name">
            <a href="#" class="normal">
                <h2>${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: ${data.time}</p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
            </div>
        </div>`
    return newDiv;
}