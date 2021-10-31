function loadRepos() {
	const username = document.getElementById('username');
	const url = `https://api.github.com/users/${username.value}/repos`;
	const repos = document.getElementById('repos');

	fetch(url)
		.then(response => {
			if (response.ok === false) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			return response.json();
		})
		.then(handleResponse)
		.catch(error => { repos.innerHTML = error });

	function handleResponse(data) {
		repos.innerHTML = ''
		for (const repo of data) {
			let newLi = document.createElement('li');
			newLi.innerHTML = `<a href='${repo.html_url}'>${repo.full_name}</a>`
			repos.appendChild(newLi);
		}
	}
}