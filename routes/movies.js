// routes/movies.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace with your MovieDB API key
const apiKey = 'cceb49b4c90be4a528b2b13472fe99fb';

// GET all movies from MovieDB API
router.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    }));
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
