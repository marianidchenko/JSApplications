async function loadHomePage() {
    const main = document.querySelector('main');
    const newTopicCard = document.querySelector('.new-topic-border');

    try{
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    if (response.ok !== true) {
        error = await response.json();
        throw new Error(error)
    }
    const data = await response.json();
    } catch(error){
        alert(error.message);
    }
    console.log(data);
    
}