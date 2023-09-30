//dependencies
const express = require('express');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

// start express instance
const app = express();

// set port to 3001
const PORT = 3001;

//listen for incoming connections
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);