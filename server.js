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


//get routes section
//get route for HTML
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//get route for JS
app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public assets/js/index.js'));
});

//get route for api
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retreive notes' });
    }
      //parse json and output
    const savedNotes = JSON.parse(data);
    res.json(savedNotes);
    });
});


//CRUD section
//api post to add new notes
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note' });
    }
    //data parse and add to newNote to add to json
    const noteFile = JSON.parse(data);
    const newNoteId = Date.now().toString();
    const newNote = {
        id: newNoteId,
        title: req.body.title,
        text: req.body.text,
    };
    //push newNote
    noteFile.push(newNote);

      //write new note to file
    fs.writeFile(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify(noteFile),
        'utf8',
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save note' });
          }
          res.json(newNote);
        });
    });
});

//api delete 
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed deleting note' });
      }
        //parse note json file
        const noteFile = JSON.parse(data);
        //const for filtering by ID
        const noteId = req.params.id;
        //filter note json by noteID
        const filteredNotes = noteFile.filter((note) => note.id !== noteId);
  
        fs.writeFile(
            path.join(__dirname, 'db/db.json'),
            JSON.stringify(filteredNotes),
            'utf8',
            (err) => {
                if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete note' });
          }
          res.json({ message: 'Note deleted' });
        });
    });
});

//listen for incoming connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);