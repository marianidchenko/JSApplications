function attachEvents() {
    document.getElementById('submit').addEventListener('click', send);
    document.getElementById('refresh').addEventListener('click', refresh);

    async function send() {
        const [name, message] = document.querySelectorAll('input');
        await fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                author: name.value,
                content: message.value
            })
        });

        [name.value, message.value] = ['', ''];
    }

    async function refresh() {
        const textarea = document.getElementById('messages');

        const response = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await response.json();
        textarea.value = Object.values(data)
            .map(m => `${m.author}: ${m.content}`)
            .join('\n');
    }
}

attachEvents();