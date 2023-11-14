const express = require('express');
const router = express.Router();
const Thought = require('../models/thought');

// Custom error-handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Add Reaction
router.post('/api/thoughts/:thoughtId/add-reaction', async (req, res) => {
    try {
      const { username, reactionText } = req.body;
      const thoughtId = req.params.thoughtId;
  
      // Find the thought by its ID
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Add the reaction to the reactions array
      thought.reactions.push({ username, reactionText });
  
      // Save the updated thought
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.delete('/api/thoughts/:thoughtId/delete-reaction/:reactionId', async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;
  
      // Find the thought by its ID
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      // Find the index of the reaction in the reactions array
      const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == reactionId);
  
      if (reactionIndex === -1) {
        return res.status(404).json({ message: 'Reaction not found' });
      }
  
      // Remove the reaction from the reactions array
      thought.reactions.splice(reactionIndex, 1);
  
      // Save the updated thought
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
