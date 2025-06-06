const mongoose = require('mongoose');
const axios = require('axios');
const Category = require('./models/Category');
const Question = require('./models/Question');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trivia_quiz';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Category.deleteMany({});
  await Question.deleteMany({});

  
  const catRes = await axios.get('https://opentdb.com/api_category.php');
  const categories = catRes.data.trivia_categories;

  
  await Category.insertMany(categories.map(c => ({ name: c.name, categoryId: c.id })));
  console.log('Categories seeded');


  for (const cat of categories.slice(0, 2)) {
    for (const difficulty of ['easy', 'medium', 'hard']) {
      const res = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${cat.id}&difficulty=${difficulty}&type=multiple`
      );
      const list = res.data.results.map(q => ({
        categoryId: cat.id,
        category: q.category,
        type: q.type,
        difficulty: q.difficulty,
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));
      await Question.insertMany(list);
      console.log(`Questions for ${cat.name} - ${difficulty} seeded`);
    }
  }
  await mongoose.disconnect();
  console.log('Seed completed');
}

seed();
