function attachEvents() {
    const posts = document.getElementById('posts');
    const loadPostsButton = document.getElementById('btnLoadPosts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments')
    const btnViewPost = document.getElementById('btnViewPost');

    btnViewPost.addEventListener('click', view)
    loadPostsButton.addEventListener('click', () => {
        fetch("http://localhost:3030/jsonstore/blog/posts")
            .then((response) => {
                if (response.ok === false) {
                    throw new Error('Invalid response')
                }
                return response.json()
            })
            .then(listPosts)
            .catch((error) => {console.log(error)})
    })

    function listPosts(data) {
        for (const id in data) {
            let title = data[id].title;
            let newOption = document.createElement('option');
            newOption.value = id;
            newOption.textContent = title;
            posts.appendChild(newOption)
        }
    }
    
    async function findComments() {
        let id = posts.value;
        let reponse = await fetch(`http://localhost:3030/jsonstore/blog/comments`)
        let comments = await reponse.json();
        return Object.values(comments).filter(c => c.postId === id)
    }

    async function findPost() {
        const res = await fetch(`http://localhost:3030/jsonstore/blog/posts/${posts.value}`);
        return await res.json();
    }

    async function view() {
        postTitle.textContent = 'Loading...';
        postBody.textContent = '';
        postComments.replaceChildren();

        let commentList = await findComments()
        let postDetails = await findPost();
        postTitle.textContent = postDetails.title;
        postBody.textContent = postDetails.body;
        for (const comment of commentList) {
            let newli = document.createElement('li');
            newli.textContent = comment.text;
            postComments.appendChild(newli);
        }
    }
}

attachEvents();