//dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// start express instance
const app = express();
// set port to 3001
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

//get route for HTML
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/notes.html'))
});

//get route for JS
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public assets/js/index.js'));
});

//listen for incoming connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);