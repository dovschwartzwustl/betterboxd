const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

async function fetchPopularMovies(req, res) {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ViNDliNGM5MGJlNGE1MjhiMmIxMzQ3MmZlOTlmYiIsInN1YiI6IjY0YzkyYzliOGRlMGFlMDBlNDg3NTc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nIvo9JVIRGv1328ddTF9dDut63qm4BUaVQTUqlwL2T4'
    }
  };

  try {
    const response = await fetch(url, options);
    const movies = await response.json();
    console.log(movies);
    return res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function fetchMovieDetails(req, res) {
  const movieId = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ViNDliNGM5MGJlNGE1MjhiMmIxMzQ3MmZlOTlmYiIsInN1YiI6IjY0YzkyYzliOGRlMGFlMDBlNDg3NTc3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nIvo9JVIRGv1328ddTF9dDut63qm4BUaVQTUqlwL2T4'
    }
  };

  try {
    const response = await fetch(url, options);
    const movies = await response.json();
    console.log(movies);
    return res.json(movies);
  } catch (error) {
    console.error('Error fetching movie:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

router.get('/movies', fetchPopularMovies);
router.get('/:id', fetchMovieDetails);

module.exports = router;
