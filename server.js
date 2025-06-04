// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Question model
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const Question = mongoose.model('Question', questionSchema);

// Routes
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

app.post('/api/questions', async (req, res) => {
  try {
    const newQ = new Question(req.body);
    await newQ.save();
    res.status(201).json(newQ);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add question' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('MCQs Backend is running!');
});


// kzone710 emersonunimul