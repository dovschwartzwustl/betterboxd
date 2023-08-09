const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../db');

router.get('/users/:query', async (req, res) =>  {
    const queryParam = req.params;

    try {
        // Check if the movie is watched by the user
        const searchQuery = '%' + query + '%'; // Add wildcards for partial matching
        const sql = 'SELECT id, username from users WHERE username LIKE ?';
        const users = await db.query(sql, [searchQuery]);
    
        return res.status(200).json({ users });
      } catch (error) {
        console.error('Error searching for users:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
});

module.exports = router;