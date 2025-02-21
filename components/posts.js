// Function to load posts based on the selected language
function loadPosts(language) {
    const fileName = language === 'es' ? '/data/posts-es.json' : '/data/posts-en.json';  // Set the path to the correct JSON file

    fetch(fileName)
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = ''; // Clear the container

            posts.forEach((post, index) => {
                const postCard = document.createElement('div');
                postCard.classList.add('card');

                postCard.innerHTML = `
                    <h2 id="post-title-${index + 1}">${post.title}</h2>
                    <h5 id="post-date-${index + 1}">${post.date}</h5>
                    <div class="img" style="height: 200px; background: #aaa;">${post.image}</div>
                    <p id="post-content-${index + 1}">${post.content}</p>
                `;

                postContainer.appendChild(postCard);
            });
        })
        .catch(error => console.error('Error loading posts:', error));
}

// Call this function when the page loads or language is changed
window.onload = () => loadPosts('en'); // Load English posts initially
