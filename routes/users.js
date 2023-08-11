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
    console.log(counts);
    
    return res.status(200).json({ counts });
  } catch (error) {
    console.error('Error fetching follow counts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

module.exports = router;