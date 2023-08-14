const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware'); 
const db = require('../db');


//searches for users
router.get('/users/search/:query', async (req, res) =>  {
    const {query} = req.params;

    try {
        // Check if the movie is watched by the user
        const searchQuery = '%' + query + '%'; // Add wildcards for partial matching
        const sql = 'SELECT id, username from users WHERE username LIKE ?';
        const users = await db.query(sql, [searchQuery]);
        const results = users[0]
    
        return res.status(200).json({ results });
      } catch (error) {
        console.error('Error searching for users:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
});

//gets a username based on a userId
router.get('/users/:userId/username', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = 'SELECT username FROM users WHERE id = ?';
    const result = await db.query(query, [userId]);

    if (result[0].length > 0) {
      const username = result[0][0].username;
      return res.status(200).json({ username });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting username by user ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


//add a user following relationship
router.post('/users/follow/:userId', authenticateToken, async (req, res) => {
  const followerId = req.user.userId; // Get the authenticated user's ID
  const followingId = req.params.userId;

  try {
    // Check if the user is already following the target user
    const queryCheck = 'SELECT * FROM followers WHERE follower_id = ? AND following_id = ?';
    const valuesCheck = [followerId, followingId];
    const existingRelationship = await db.query(queryCheck, valuesCheck);

    if (existingRelationship[0].length > 0) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    // Insert the new relationship into the user_followers table
    const queryInsert = 'INSERT INTO followers (follower_id, following_id) VALUES (?, ?)';
    const valuesInsert = [followerId, followingId];
    await db.query(queryInsert, valuesInsert);

    return res.status(201).json({ message: 'Successfully followed the user' });
  } catch (error) {
    console.error('Error following user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//remove a user following relationship
router.delete('/users/unfollow/:userId', authenticateToken, async (req, res) => {
  const followerId = req.user.userId; // Get the authenticated user's ID
  const followingId = req.params.userId;

  try {
    // Check if the user is following the target user
    const queryCheck = 'SELECT * FROM followers WHERE follower_id = ? AND following_id = ?';
    const valuesCheck = [followerId, followingId];
    const existingRelationship = await db.query(queryCheck, valuesCheck);

    if (existingRelationship[0].length === 0) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    // Delete the relationship from the user_followers table
    const queryDelete = 'DELETE FROM followers WHERE follower_id = ? AND following_id = ?';
    const valuesDelete = [followerId, followingId];
    await db.query(queryDelete, valuesDelete);

    return res.status(200).json({ message: 'Successfully unfollowed the user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Check if the authenticated user is following another user
router.get('/users/isFollowing/:userId', authenticateToken, async (req, res) => {
  const followerId = req.user.userId; // Get the authenticated user's ID
  const followingId = req.params.userId;

  try {
    // Check if the user is following the target user
    const queryCheck = 'SELECT * FROM followers WHERE follower_id = ? AND following_id = ?';
    const valuesCheck = [followerId, followingId];
    const existingRelationship = await db.query(queryCheck, valuesCheck);
    console.log(existingRelationship);

    const isFollowing = existingRelationship[0].length > 0;
    console.log(isFollowing);

    return res.status(200).json({ isFollowing });
  } catch (error) {
    console.error('Error checking if user is following:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/users/:userId/follow-counts', async (req, res) => {
  const userId = req.params.userId;

  try {
    const followingCountQuery = 'SELECT COUNT(*) AS followingCount FROM followers WHERE follower_id = ?';
    const followerCountQuery = 'SELECT COUNT(*) AS followerCount FROM followers WHERE following_id = ?';

    const followingCountResult = await db.query(followingCountQuery, [userId]);
    const followerCountResult = await db.query(followerCountQuery, [userId]);

    const followingCount = followingCountResult[0][0].followingCount;
    const followerCount = followerCountResult[0][0].followerCount;

    const counts = [followingCount, followerCount];
    
    return res.status(200).json({ counts });
  } catch (error) {
    console.error('Error fetching follow counts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//get a user's followers
router.get('/users/followers/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = 'SELECT users.id, users.username FROM followers INNER JOIN users ON followers.follower_id = users.id WHERE followers.following_id = ?';
    const results = await db.query(query, [userId]);
    console.log(results);
    const followers = results[0];
    
    res.status(200).json({ followers });
  } catch (error) {
    console.error('Error fetching followers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get a user's following
router.get('/users/following/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = 'SELECT users.id, users.username FROM followers INNER JOIN users ON followers.following_id = users.id WHERE followers.follower_id = ?';
    const results = await db.query(query, [userId]);
    const following = results[0];
    
    res.status(200).json({ following });
  } catch (error) {
    console.error('Error fetching following:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get a user's lists
router.get('/users/lists/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = 'SELECT id, list_name FROM user_movie_lists WHERE user_id = ?';
    const results = await db.query(query, [userId]);
    const lists = results[0];
    res.status(200).json({ lists });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get a user list by its ID
router.get('/users/lists/:userId/:listId', async (req, res) => {
  console.log("gettings user list by id");
  const userId = req.params.userId;
  const listId = req.params.listId;

  try {
    const query = 'SELECT id, list_name FROM user_movie_lists WHERE user_id = ? AND id = ?';
    const results = await db.query(query, [userId, listId]);
    console.log(results);
    const list = results[0][0];
    
    if (!list) {
      res.status(404).json({ message: 'List not found' });
    } else {
      // Query user_movie_list_items table to get movie_ids in the list
      const listItemsQuery = 'SELECT movie_id FROM user_movie_list_items WHERE movie_list_id = ?';
      const listItemsResults = await db.query(listItemsQuery, [listId]);
      const movieIds = listItemsResults[0].map(item => item.movie_id);

      // Fetch movie details for each movie_id
      const movies = await Promise.all(movieIds.map(movieId => fetchMovieDetails(movieId)));

      // Return the list and movie details
      res.status(200).json({ list, movies });
    }
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function fetchMovieDetails(movieId) {
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
    const movie = await response.json();
    return movie; // Return the movie details
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error; // Re-throw the error
  }
}


// Create a new list
router.post('/users/lists', async (req, res) => {
  const { name, user_id } = req.body;

  try {
    const query = 'INSERT INTO user_movie_lists (list_name, user_id) VALUES (?, ?)';
    const result = await db.query(query, [name, user_id]);
    const listId = result[0].insertId; // Get the ID of the newly inserted list

    res.status(201).json({ listId }); // Return the list ID
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add movies to a list
router.post('/users/list-items', async (req, res) => {
  const listItems = req.body;

  try {
    const query = 'INSERT INTO user_movie_list_items (movie_list_id, movie_id) VALUES (?, ?)';
    
    // Insert each list item into the database
    for (const listItem of listItems) {
      await db.query(query, [listItem.movie_list_id, listItem.movie_id]);
    }

    res.status(201).json({ message: 'Movies added to list' });
  } catch (error) {
    console.error('Error adding movies to list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;