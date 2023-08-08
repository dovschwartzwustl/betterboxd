const express = require('express');
const router = express.Router();
const db = require('../db');


// Insert a new record into the UserWatchedMovies table
router.post('/watched', async (req, res) => {
  const { userId, movieId, rating } = req.body;

  // Validate input data
  if (!userId || !movieId) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const query = 'INSERT INTO user_watched_movies (user_id, movie_id, rating) VALUES (?, ?, ?)';
    const values = [userId, movieId, rating || null]; // Use NULL if rating is not provided
    await db.query(query, values);

    return res.status(201).json({ message: 'Watched movie entry created successfully' });
  } catch (error) {
    console.error('Error creating watched movie entry:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/watched/update-rating', async (req, res) => {
  const { userId, movieId, rating } = req.body;

  // Validate input data
  if (!userId || !movieId || rating === undefined || rating === null) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Update the rating of a watched movie
    const query = 'UPDATE user_watched_movies SET rating = ? WHERE user_id = ? AND movie_id = ?';
    const values = [rating, userId, movieId];
    const result = await db.query(query, values);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Movie rating updated successfully' });
    } else {
      return res.status(404).json({ message: 'Watched movie entry not found' });
    }
  } catch (error) {
    console.error('Error updating movie rating:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to check if a movie is watched by a user
router.get('/movies/watched/:movieId/:userId', async (req, res) => {
  const { movieId, userId } = req.params;

  try {
    // Check if the movie is watched by the user
    const query = 'SELECT * FROM user_watched_movies WHERE user_id = ? AND movie_id = ?';
    const values = [userId, movieId];
    const result = await db.query(query, values);
    console.log(result);
    const isWatched = result[0].length > 0;
    console.log(isWatched);
    return res.status(200).json({ isWatched });
  } catch (error) {
    console.error('Error checking if movie is watched:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to mark a movie as unwatched
router.delete('/movies/watched/:movieId/:userId', async (req, res) => {
  const { movieId, userId } = req.params;

  try {
    // Delete the watched entry for the movie by the user
    const query = 'DELETE FROM user_watched_movies WHERE user_id = ? AND movie_id = ?';
    const values = [userId, movieId];
    const result = await db.query(query, values);

    // Check if any rows were deleted
    const rowsDeleted = result.affectedRows;
    console.log("rows deleted: "+ rowsDeleted);
    const isUnwatched = rowsDeleted > 0;

    return res.status(200).json({ isUnwatched });
  } catch (error) {
    console.error('Error marking movie as unwatched:', error);
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
