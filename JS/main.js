// Post JavaScript
async function loadPosts(lang) {
    const response = await fetch(`/data/posts-${lang}.json`);  // Fetch posts from the respective JSON file based on the language
    const posts = await response.json();

    const container = document.getElementById('post-container');
    container.innerHTML = "";  // Clear the container

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <img src="${post.image}" alt="Post Image">
        `;
        container.appendChild(postElement);
    });
}

// Load posts when the page loads in the default language (en)
window.onload = () => loadPosts('en');  // Set default language to 'en'

// Function for Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Some text translations
const translations = {
    en: {
        "blog-title": "Beyond the Algorithm",
        "post-title-1": "TITLE HEADING",
        "post-date-1": "Title description, 2025",
        "post-content-1": "Some text...",
        "about-me": "About Me",
        "about-text": "Spanish tech enthusiast living in the UK, passionate about AI and web development.",
        "footer-text": "Footer"
    },

    es: {
        "blog-title": "Más allá del Algoritmo",
        "post-title-1": "TITULO PRINCIPAL",
        "post-date-1": "Descripción del título, 2025",
        "post-content-1": "Algun texto...",
        "about-me": "Sobre Mi",
        "about-text": "Entusiasta de la tecnología en el Reino Unido, apasionado por la IA y el desarrollo web.",
        "footer-text": "Pie de página"
    }
};

// Function to change language on the page
function changeLanguage(lang) {
    // Change the text content for elements with a corresponding translation
    document.querySelectorAll("[id]").forEach(el => {
        if (translations[lang][el.id]) {
            el.innerText = translations[lang][el.id];
        }
    });

    // Load the posts in the selected language (either 'en' or 'es')
    loadPosts(lang); // This function will fetch posts from the correct JSON file
}
