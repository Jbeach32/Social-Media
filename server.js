const express = require('express');
const { connect, connection } = require('mongoose');
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://joshbeach2007:password123!@cluster0.udbgiya.mongodb.net/';

// Connect to the database
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for connection status
connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close MongoDB connection when the Node.js process is terminated
process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

const test = require("./routes/user-routes")
const test2 = require("./routes/thought-routes")
const test3 = require("./routes/friend-routes")
const test4 = require("./routes/reaction-routes")
app.use("/test", test)
app.use("/test2", test2)
app.use("/test3", test3)
app.use("/test4", test4)

// Export the app
module.exports = app;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
