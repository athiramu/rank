const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');

// GET all players
router.get('/', (req, res) => {
    Player.find().lean()
        .then(data => {
            res.json(data); // Send the player data as JSON
        })
        .catch(err => {
            console.log("Error during fetching:", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

// GET player add/edit form (this can be removed if you don't need it)
router.get('/addOrEdit', (req, res) => {
    res.json({ message: "This endpoint is for adding or editing a player." }); // Optional
});

// POST to add or edit a player
router.post('/addorEdit', (req, res) => {
    const player = {
        name: req.body.name,
        score: req.body.score,
        playerid: req.body.playerid,
    };

    const { _id } = req.body;

    if (_id === '') {
        // Create new player
        new Player({ ...player }).save()
            .then(data => {
                res.status(201).json(data); // Send the created player data as JSON
            })
            .catch(err => {
                console.log('Error during insertion:', err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    } else {
        // Update existing player
        Player.findByIdAndUpdate(_id, player, { new: true }) // `{ new: true }` returns the updated document
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: "Player not found" });
                }
                res.json(data); // Send the updated player data as JSON
            })
            .catch(err => {
                console.log('Error during updation:', err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
});

// GET player by playerid for editing
router.get('/edit/:id', (req, res) => {
    Player.findOne({ playerid: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Player not found" });
            }
            res.json(data); // Send the player data as JSON
        })
        .catch(err => {
            console.log('Error while retrieving:', err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});




router.get('/search', (req, res) => {
    const { name, score } = req.query;

    // Build query object based on provided parameters
    let query = {};
    if (name) {
        query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
    if (score) {
        query.score = Number(score); // Convert score to a number for matching
    }

    Player.find(query).lean()
        .then(data => {
            res.json(data); // Send filtered player data as JSON
        })
        .catch(err => {
            console.log("Error during searching:", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
});

module.exports = router;
