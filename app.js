const express = require('express');
const path = require("path");

const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));


// Your route handlers go here
app.get("/", (req, res) => {
    // Serve your HTML file that includes references to JavaScript files
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start the server
const port = 5000; // Or any port you prefer
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
