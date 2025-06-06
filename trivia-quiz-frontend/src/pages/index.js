import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategories, setQuiz, setPhase,
  setCurrentCategory, setCurrentDifficulty, setAmount
} from '../features/quizSlice';
import { useRouter } from 'next/router';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, currentCategory, currentDifficulty, amount } = useSelector(state => state.quiz);

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories')
      .then(res => dispatch(setCategories(res.data)));
  }, [dispatch]);

  const startQuiz = async () => {
    const res = await axios.get('http://localhost:3001/api/quiz', {
      params: {
        category: currentCategory,
        difficulty: currentDifficulty,
        amount,
      }
    });
    dispatch(setQuiz(res.data));
    dispatch(setPhase('quiz'));
    router.push('/quiz');
  };

  return (
    <div style={{ maxWidth: 680, margin: '100px auto', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 600, letterSpacing: 2, marginBottom: 36 }}>QUIZ MAKER</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: 0,
        height: 48,
        background: '#fff'
      }}>
        <select
          style={{
            flex: 2,
            height: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            paddingLeft: 14,
            background: 'transparent'
          }}
          value={currentCategory}
          onChange={e => dispatch(setCurrentCategory(e.target.value))}
        >
          <option value="">Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.categoryId}>{cat.name}</option>
          ))}
        </select>
        <select
          style={{
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            background: 'transparent'
          }}
          value={currentDifficulty}
          onChange={e => dispatch(setCurrentDifficulty(e.target.value))}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="number"
          min={1}
          max={10}
          value={amount}
          style={{
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            background: 'transparent',
            textAlign: 'center'
          }}
          onChange={e => dispatch(setAmount(Number(e.target.value)))}
        />
        <button
          style={{
            flex: 1,
            height: '100%',
            border: '1px solid #aaa',
            borderRadius: '0 6px 6px 0',
            background: '#fff',
            fontWeight: 500,
            fontSize: 16,
            cursor: 'pointer'
          }}
          disabled={!currentCategory}
          onClick={startQuiz}
        >
          Create
        </button>
      </div>
    </div>
  );
}
