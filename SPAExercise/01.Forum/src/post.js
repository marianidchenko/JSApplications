import { showView } from './dom.js';
import { showHome } from './homepage.js';

let section = document.createElement('div');
let postId;

export function setId(id) {
    postId = id;
}

function createNav() {
    let element = document.createElement('header');
    element.innerHTML =
        `<div class="mini-navbar-wrap">
            <div class="logo-wrap">
                <p class="logo"><span class="logo">SoftUni Forum</span></p>
            </div>
            <div class="mini-navbar">
            </div>
        </div>
        <nav>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
            </ul>
        </nav>`
    element.getElementsByTagName('a')[0].addEventListener('click', () => {showHome()});
    section.appendChild(element);
}

async function createPostView() {
    section.replaceChildren();
    createNav();
    const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);
    const result = await response.json();

    const commentResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
    const commentData = await commentResponse.json();


    const postDiv = document.createElement('div');
    postDiv.classList.add('comment');
    postDiv.innerHTML =
        `<div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${result.username}</span> posted on ${result.time}</p>
        <p class="post-content">${result.postText}</p>
    </div>`
    section.appendChild(postDiv);
    const replyDiv = createReplyDiv();
    section.appendChild(replyDiv);
    loadComments(commentData, postDiv);



}

function createReplyDiv() {
    const replyDiv = document.createElement('div');
    replyDiv.classList.add('answer-comment')
    replyDiv.innerHTML =
        `<p><span>currentUser</span> comment:</p>
                <div class="answer">
                    <form>
                        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                        <div>
                            <label for="username">Username <span class="red">*</span></label>
                            <input type="text" name="username" id="username">
                         </div>
                        <button>Post</button>
                    </form>
                </div>`


    replyDiv.querySelector('form').addEventListener('submit', createReply)
    return replyDiv;
}

async function createReply(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let username = formData.get('username');
    let comment = formData.get('postText');
    if (username == '' || comment == '') {
        alert('Username and content must be provided.')
        return
    }
    let time = new Date().toLocaleString();
    let id = postId;
    event.target.reset();

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": username, "comment": comment, "time": time, "id": id })
    })

    await createPostView();
}

function createCommentDiv(text, username, time) {
    let commentDiv = document.createElement('div');
    commentDiv.innerHTML =
        `<div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${username}</strong> commented on ${time}</p>
                <div class="post-content">
                    <p>${text}</p>
                </div>
            </div>
        </div>`

    return commentDiv;
}

function loadComments(data, parent) {
    for (const comment of Object.values(data)) {
        if (comment.id == postId) {
            let commentDiv = createCommentDiv(comment.comment, comment.username, comment.time)
            parent.appendChild(commentDiv);
        }
    }
}

export async function showPost() {
    await createPostView();
    showView(section);
}