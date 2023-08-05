// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./db');
const fetch = require('node-fetch');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/api/movies', (req, res) => {

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ViNDliNGM5MGJlNGE1MjhiMmIxMzQ3MmZlOTlmYiIsInN1YiI6IjY0YzkyYzliOGRlMGFlMDBlNDg3NTc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nIvo9JVIRGv1328ddTF9dDut63qm4BUaVQTUqlwL2T4'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

/*
const moviesRoute = require('./routes/movies');

// Use the movies route
app.use('/api', moviesRoute);
*/
