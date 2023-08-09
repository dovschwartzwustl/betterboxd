const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/users/search/:query', async (req, res) =>  {
    const {query} = req.params;
    console.log("searching for "+ query);

    try {
        // Check if the movie is watched by the user
        const searchQuery = '%' + query + '%'; // Add wildcards for partial matching
        const sql = 'SELECT id, username from users WHERE username LIKE ?';
        const users = await db.query(sql, [searchQuery]);
        const results = users[0]
        console.log(results)
    
        return res.status(200).json({ results });
      } catch (error) {
        console.error('Error searching for users:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
});

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

module.exports = router;