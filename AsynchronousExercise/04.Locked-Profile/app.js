function lockedProfile() {
    let main = document.getElementById('main');
    main.replaceChildren();

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(response => {
            if (response.ok == false) {
                throw new Error('Invalid server response.')
            }
            return response.json()
        })
        .then(handleResponse)
        .catch((error) => {
            console.log(error)
        })

    function handleResponse(data) {
        Object.keys(data).forEach((key, i) => {
            let profile = createProfile(data[key], i)
            main.appendChild(profile)
        })
    }

    function createProfile(data, i) {
        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.innerHTML =
            `<img src="./iconProfile2.png" class="userIcon" />
			<label>Lock</label>
			<input type="radio" name="user${i + 1}Locked" value="lock" checked>
			<label>Unlock</label>
			<input type="radio" name="user${i + 1}Locked" value="unlock"><br>
			<hr>
			<label>Username</label>
			<input type="text" name="user${i + 1}Username" value="${data.username}" disabled readonly />`

        let hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        hiddenDiv.innerHTML =
            `<hr>
            <label>Email:</label>
            <input type="email" name="user${i+1}Email" value="${data.email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user${i+1}Age" value="${data.age}" disabled readonly />`

        profileDiv.appendChild(hiddenDiv);

        let btn = document.createElement('button');
        btn.textContent = 'Show more'
        btn.addEventListener('click', showOrHide)
        profileDiv.appendChild(btn);


        function showOrHide(event) {
            let profile = event.target.parentElement;
            let unlock = profile.querySelector('input[value="unlock"]');
            if (unlock.checked) {
                if (btn.textContent == 'Show more') {
                    btn.textContent = 'Hide it'
                    hiddenDiv.style.display = 'block'
                } else {
                    btn.textContent = 'Show more'
                    hiddenDiv.style.display = 'none'
                }
            }
            
        }

        return(profileDiv);
    }
}