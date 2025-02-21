const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files (your HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve JSON file correctly
app.get('/data/posts.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'posts.json'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
