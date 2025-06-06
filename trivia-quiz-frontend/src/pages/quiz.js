import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, setScoreDetails, setPhase } from '../features/quizSlice';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Quiz() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { quiz, answers } = useSelector(state => state.quiz);

  if (!quiz.length) {
    if (typeof window !== 'undefined') router.replace('/');
    return null;
  }

  const handleAnswer = (questionId, answer) => {
    dispatch(answerQuestion({ questionId, answer }));
  };

  const allAnswered = quiz.every(q => answers[q._id]);

  const handleSubmit = async () => {
    const userAnswers = quiz.map(q => ({
      questionId: q._id,
      answer: answers[q._id]
    }));
    const res = await axios.post('http://localhost:3001/api/quiz/score', { answers: userAnswers });
    dispatch(setScoreDetails(res.data));
    dispatch(setPhase('result'));
    router.push('/result');
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      {quiz.map((q, i) => (
        <div key={q._id} style={{ marginBottom: 30 }}>
          <div style={{ marginBottom: 12, fontWeight: 500 }}>{q.question}</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {q.answers.map(ans => {
              const isSelected = answers[q._id] === ans;
              return (
                <button
                  key={ans}
                  onClick={() => handleAnswer(q._id, ans)}
                  style={{
                    border: '2px solid #38a169',
                    background: isSelected ? '#38a169' : '#fff',
                    color: isSelected ? '#fff' : '#267140',
                    borderRadius: 12,
                    padding: '8px 22px',
                    fontSize: 18,
                    cursor: 'pointer',
                    fontWeight: 500,
                    outline: isSelected ? '2px solid #38a169' : 'none',
                    boxShadow: 'none',
                    transition: 'all .1s',
                  }}
                >
                  {ans}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <button
        style={{
          width: '100%',
          marginTop: 32,
          background: '#38a169',
          color: '#fff',
          padding: '14px 0',
          fontSize: 18,
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          cursor: allAnswered ? 'pointer' : 'not-allowed',
          opacity: allAnswered ? 1 : 0.6,
        }}
        disabled={!allAnswered}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}