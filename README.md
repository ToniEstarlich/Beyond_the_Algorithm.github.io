# Blog Project: Beyond the Algorithm

This is a simple full-stack blog application that allows users to toggle between light and dark modes and switch between English and Spanish languages dynamically. It loads blog posts from a backend API and displays them on a responsive web page.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Algorithm Breakdown](#algorithm-breakdown)
4. [How to Run the Project](#how-to-run-the-project)
5. [Future Enhancements](#future-enhancements)

---

## Project Structure

- **index.html**: The main HTML file that structures the layout of the webpage.
- **style/style.css**: The stylesheet for the frontend, handling both light and dark mode themes.
- **JS/main.js**: Contains the JavaScript logic for dynamic functionalities, such as changing languages and toggling dark mode.
- **components/posts.js**: Responsible for loading posts from a backend or a static file and displaying them.
- **data/posts.json**: The static JSON file containing blog posts (this is for when the backend is not used).

---

## Features

- **Dark Mode Toggle**: Users can switch between light and dark mode for better readability.
- **Language Switch**: The application supports English and Spanish. Users can dynamically change the language of the page.
- **Fetch Blog Posts**: The application fetches posts from an API or static JSON file and dynamically displays them.
- **Responsive Layout**: The design is mobile-friendly and adjusts to different screen sizes.

---

## Algorithm Breakdown

### 1. **Dark Mode Toggle**
   - The `toggleDarkMode()` function adds or removes the `dark-mode` class from the `body` element. This changes the theme of the entire page.
   - The `dark-mode` class in `style.css` defines background and text colors for dark mode.

### 2. **Language Switching**
   - The `translations` object in `JS/main.js` holds key-value pairs for each language (English and Spanish).
   - The `changeLanguage()` function checks all elements with an `id` attribute. If a translation exists for that `id`, it updates the element's text content (`innerText`) with the appropriate translation.
   - It also calls the `loadPosts(lang)` function to load the correct set of posts for the selected language.

### 3. **Loading Posts**
   - The `loadPosts()` function fetches the blog posts either from a backend (API) or a static file (`data/posts.json`).
   - It uses `fetch()` to retrieve the data, and once the data is available, it dynamically creates post elements (`divs` with titles, dates, images, and content).
   - This function appends the post elements into the `#posts-container` div in the HTML.

### 4. **Fetch Logic**
   - If you're using a backend API (e.g., Express.js), the `fetch()` function in `loadPosts()` would call your API to get blog posts.
   - If you're working with static data (`data/posts.json`), you'll replace the backend API URL with the relative path to the static file.
   
---

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/beyond-the-algorithm.git
   ```

2. **Navigate to the project directory**:
    ```bash
    cd beyond-the-algorithm

    ```

3. **Run a local server (for backend) or open the `index.html` directly (for static version)**:
   - 
   ```bash
   npm install
   npm start

   ```

   - 

4. **Access the app**: Open the application in your browser at `http://localhost:3000` (for backend) or directly by opening `index.html` (for static version).

---

###  Future Enhancements
   - **Backend Deployment**: Deploy the backend on a platform like Heroku or Netlify for    production use.
   - **Post Editor**: Allow users to create and publish their own blog posts through a form.
   - **User Authentication**:Implement user login and authentication using JWT or OAuth to allow for personalized content.
   - **Comments Section**: Add a comments section for each blog post.

---

---

## How the Code Works

### 1. **server.js** (Backend)
   - The `server.js` file is the backend part of the application, built using Node.js and Express.js.
   - It serves the blog posts from a static JSON file (`data/posts-en.json` in this case) to the frontend using a REST API.
   - The server listens on a specific port (usually `3000` or `5000`), and when the frontend sends a request to `/api/posts`, it responds with the blog posts in JSON format.

   **Key Code:**
   ```js
   const express = require('express');
   const app = express();
   const PORT = 3000;
   
   // Serve static JSON file with blog posts
   app.get('/api/posts', (req, res) => {
     res.sendFile(__dirname + '/data/posts-en.json');
   });

   app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  ```
### 2. **data/posts-en.json** (Static Data)

The `data/posts-en.json` file contains the blog posts in JSON format. This file can easily be extended with more blog posts. Each blog post is represented as an object with properties like `title`, `content`, `image_url`, etc.

**Example JSON structure:**
```json
[
  {
    "title": "Blog Post Title 1",
    "content": "This is the content of the first post.",
    "image_url": "/images/post1.jpg"
  },
  {
    "title": "Blog Post Title 2",
    "content": "This is the content of the second post.",
    "image_url": "/images/post2.jpg"
  }
]
```
### 3. **components/posts.js** (Frontend Component)

The `posts.js` component handles the fetching and display of blog posts from the backend (or static JSON file if no server is used). It uses the `fetch()` function to request the posts from the backend and dynamically creates HTML elements for each post.

**Key Code:**

```js
async function loadPosts() {
  const response = await fetch('/api/posts');  // Fetch posts from the backend API
  const posts = await response.json();

  const container = document.getElementById('posts-container');
  container.innerHTML = "";  // Clear the container before adding new posts

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <img src="${post.image_url}" alt="Post Image">
    `;
    container.appendChild(postElement);
  });
}

window.onload = loadPosts; // Load posts when the page loads
```
### 4. **JS/main.js** (Main JavaScript Logic)

This file contains JavaScript code for controlling dark mode toggling and dynamic language switching. It also handles updating the page content (such as blog post titles and descriptions) when the language is switched. It uses a `translations` object to store the language-specific text and updates the HTML content based on the selected language.

**Key Code:**

```js
const translations = {
  en: {
    "blog-title": "Beyond the Algorithm",
    "post-title-1": "TITLE HEADING",
    "post-content-1": "Some text..."
  },
  es: {
    "blog-title": "Más allá del Algoritmo",
    "post-title-1": "TÍTULO PRINCIPAL",
    "post-content-1": "Algún texto..."
  }
};

function changeLanguage(lang) {
  document.querySelectorAll("[id]").forEach(el => {
    if (translations[lang][el.id]) {
      el.innerText = translations[lang][el.id];
    }
  });
  loadPosts(lang); // Load posts in the selected language
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

```
### 5. **index.html** (Main HTML Structure)

The `index.html` file is the entry point of the web app. It defines the structure and layout of the webpage. It includes placeholders for the blog content, such as a container for posts (`id="posts-container"`) and buttons for language and dark mode toggling. The file links to `style.css` for styling and `JS/main.js` for JavaScript logic.

**Key Code:**

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beyond the Algorithm</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1 id="blog-title">Beyond the Algorithm</h1>
    <button onclick="changeLanguage('en')">English</button>
    <button onclick="changeLanguage('es')">Español</button>
    <button onclick="toggleDarkMode()">Toggle Dark Mode</button>
  </header>

  <div id="posts-container"></div>

  <footer>
    <p id="footer-text">Footer</p>
  </footer>

  <script src="JS/main.js"></script>
  <script src="components/posts.js"></script>
</body>
</html>

```

### Features

- **Dark Mode Toggle**: Users can switch between light and dark mode for better readability.
- **Language Switch**: The application supports English and Spanish. Users can dynamically change the language of the page.
- **Fetch Blog Posts**: The application fetches posts from an API or static JSON file and dynamically displays them.
- **Responsive Layout**: The design is mobile-friendly and adjusts to different screen sizes.
