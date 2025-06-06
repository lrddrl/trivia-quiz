Trivia Quiz App
A fullstack trivia quiz web application built with Node.js, Express, MongoDB.

Features
Select category, difficulty, and number of questions

Answer questions and get instant scoring

Result page with colored score bar

Unit tests for backend and frontend

Prerequisites
Node.js (v16 or above)

MongoDB (local or MongoDB Atlas)

1. Local Development
1.1. Clone the repository

1.2. Setup MongoDB
You can run MongoDB locally (default: mongodb://localhost:27017/trivia_quiz)

1.3. Backend Setup
cd trivia-quiz-backend
npm install

1.3.1. Import Seed Data

Only Entertainment: Film category is available for testing.
Place your OpenTDB film questions JSON as src/questions.json.

Then run:
npm run import

(This will run node src/importQuestions.js to import questions into MongoDB.)

1.3.2. Start Backend

npm run dev

1.4. Frontend Setup

cd ../trivia-quiz-frontend

npm install
npm run dev

Visit: http://localhost:3000

1.5. Run Tests
Backend tests:

cd trivia-quiz-backend
npm test

Frontend tests:
cd ../trivia-quiz-frontend

npm test

Frontend: http://localhost:3000
Backend: http://localhost:3001

MongoDB: localhost:27017 (container: mongo:27017)

3. Important Notes
Only the Entertainment: Film category is seeded and available. Please use this category for all tests and demo.

All other categories are empty.

Include this note in your submission if needed.

4. Common Commands
Backend:

npm install      # Install dependencies
npm run dev      # Start backend server (dev mode)
npm run import   # Import questions from JSON
npm test         # Run backend tests

Frontend:

npm install      # Install dependencies
npm run dev      # Start frontend server
npm test         # Run frontend tests


5. Folder Structure

TRIVIA-QUIZ/
│
├── trivia-quiz-backend/
│     ├── Dockerfile
│     ├── src/
│     │     ├── importQuestions.js
│     │     └── questions.json
│     └── ...
│
├── trivia-quiz-frontend/
│     ├── Dockerfile
│     └── ...
│
├── docker-compose.yml
└── README.md
