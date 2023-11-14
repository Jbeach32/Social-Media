const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  username: { type: String, required: true },
  reactions: [
    {
      //id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }], // Disable automatic generation of _id for subdocuments
      username: { type: String, required: true },
      reactionText: { type: String, required: true },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;



