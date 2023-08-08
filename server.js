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



// Import and use the user registration route
const registerRoute = require('./routes/register');
app.use('/api', registerRoute);

// Import and use the user login route
const loginRoute = require('./routes/login');
app.use('/api', loginRoute);

// Import and use the movie route
const {router: movieRoute} = require('./routes/movies');
app.use('/api', movieRoute);

const watchedMoviesRoute = require('./routes/watchedMovies');
app.use('/api', watchedMoviesRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


