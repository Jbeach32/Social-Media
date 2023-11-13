const express = require('express');
const Thought = require('../models/thought'); 
const User = require('../models/user');
const router = express.Router();

// Custom error-handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Get all thoughts
router.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single thought by ID
router.get('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new thought
router.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Update the associated user's thoughts array using username
    await User.findOneAndUpdate(
      { username: thought.username }, // Use an object for the filter
      { $push: { thoughts: thought._id } }
    );

    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err); // 400 Bad Request for client errors
  }
});


// Update a thought by ID
router.put('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err); // 400 Bad Request for client errors
  }
});

// Delete a thought by ID
router.delete('/api/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
