const express = require('express');
const Category = require('../models/Category');
const Question = require('../models/Question');

const router = express.Router();


router.get('/categories', async (req, res) => {
  const cats = await Category.find();
  res.json(cats);
});


router.get('/quiz', async (req, res) => {
  const { category, difficulty, amount = 5 } = req.query;
  const filter = {};
  if (category) filter.categoryId = Number(category);
  if (difficulty) filter.difficulty = difficulty;

 
  const questions = await Question.aggregate([
    { $match: filter },
    { $sample: { size: Number(amount) } }
  ]);


  const result = questions.map(q => ({
    _id: q._id,
    category: q.category,
    type: q.type,
    difficulty: q.difficulty,
    question: q.question,
    answers: shuffle([q.correct_answer, ...q.incorrect_answers]),
  }));

  res.json(result);
});


router.post('/quiz/score', async (req, res) => {
  const { answers } = req.body; // [{ questionId, answer }]
  let score = 0;
  let details = [];

  for (const item of answers) {
    const q = await Question.findById(item.questionId);
    if (!q) continue;
    const isCorrect = q.correct_answer === item.answer;
    if (isCorrect) score += 1;
    details.push({
      question: q.question,
      yourAnswer: item.answer,
      correctAnswer: q.correct_answer,
      isCorrect,
      options: shuffle([q.correct_answer, ...q.incorrect_answers]),
    });
  }

  res.json({ score, details });
});

function shuffle(arr) {
  return arr.map(i => [Math.random(), i]).sort().map(i => i[1]);
}

module.exports = router;
