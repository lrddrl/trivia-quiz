const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('../routes/api');

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/trivia_quiz');
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('GET /api/categories', () => {
  it('should return categories array', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/quiz', () => {
  it('should return questions with shuffled answers', async () => {
    const res = await request(app).get('/api/quiz?amount=2');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('answers');
    expect(res.body[0]).not.toHaveProperty('correct_answer');
  });
});
