import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  quiz: [],
  answers: {},    // { [questionId]: "A" }
  scoreDetails: null,
  phase: 'select', // select | quiz | result
  currentCategory: '',
  currentDifficulty: 'easy',
  amount: 5,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    reset: (state) => {
      state.quiz = [];
      state.answers = {};
      state.scoreDetails = null;
      state.phase = 'select';
    },
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
    setScoreDetails: (state, action) => {
      state.scoreDetails = action.payload;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCurrentDifficulty: (state, action) => {
      state.currentDifficulty = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const {
  setCategories, setQuiz, answerQuestion, reset,
  setPhase, setScoreDetails,
  setCurrentCategory, setCurrentDifficulty, setAmount
} = quizSlice.actions;

export default quizSlice.reducer;
