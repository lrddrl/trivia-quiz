const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('./models/Question');
const Category = require('./models/Category');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trivia_quiz';

async function main() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const raw = fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf-8');
  const data = JSON.parse(raw).results;


  const cats = [...new Set(data.map(q => q.category))];
  for (const [idx, name] of cats.entries()) {
    await Category.updateOne(
      { name },
      { $set: { name, categoryId: idx + 1 } },
      { upsert: true }
    );
  }


  await Question.deleteMany({});
  for (const q of data) {
    const cat = await Category.findOne({ name: q.category });
    await Question.create({
      categoryId: cat.categoryId,
      category: q.category,
      type: q.type,
      difficulty: q.difficulty,
      question: q.question,
      correct_answer: q.correct_answer,
      incorrect_answers: q.incorrect_answers,
    });
  }

  console.log('Imported all questions!');
  await mongoose.disconnect();
}

main();
