async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`
    let commits = document.getElementById('commits');
    const response = await fetch(url) 
    try {
        if (response.ok === false) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        handleResponse(data)
    } catch (err) {
        commits.innerHTML = err
    }

    function handleResponse(data) {
        console.log(data);
        commits.innerHTML = ''
        for (const each of data) {
            let newLi = document.createElement('li');
            newLi.innerHTML = `${each.commit.author.name}: ${each.commit.message}`
            commits.appendChild(newLi);
        }
    }
}