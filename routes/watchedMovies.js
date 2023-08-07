const express = require('express');
const router = express.Router();
const db = require('../db');



router.post('/watched', async (req, res) => {
  const { userId, movieId, rating } = req.body;

  // Validate input data
  if (!userId || !movieId) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Insert a new record into the UserWatchedMovies table
    const query = 'INSERT INTO user_watched_movies (user_id, movie_id, rating) VALUES (?, ?, ?)';
    const values = [userId, movieId, rating || null]; // Use NULL if rating is not provided
    await db.query(query, values);

    return res.status(201).json({ message: 'Watched movie entry created successfully' });
  } catch (error) {
    console.error('Error creating watched movie entry:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to check if a movie is watched by a user
router.get('/movies/:movieId/watched/:userId', async (req, res) => {
  const { movieId, userId } = req.params;

  try {
    // Check if the movie is watched by the user
    const query = 'SELECT * FROM user_watched_movies WHERE user_id = ? AND movie_id = ?';
    const values = [userId, movieId];
    const result = await db.query(query, values);

    const isWatched = result.length > 0;
    return res.status(200).json({ isWatched });
  } catch (error) {
    console.error('Error checking if movie is watched:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get movies watched by a user
router.get('/movies/watched/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Get the movies watched by the user
    const query = 'SELECT * FROM user_watched_movies WHERE user_id = ?';
    const values = [userId];
    const moviesWatched = await db.query(query, values);

    return res.status(200).json({ moviesWatched });
  } catch (error) {
    console.error('Error getting movies watched by user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
