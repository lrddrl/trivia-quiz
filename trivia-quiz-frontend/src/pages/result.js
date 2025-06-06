import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/quizSlice';
import { useRouter } from 'next/router';

export default function Result() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { scoreDetails } = useSelector(state => state.quiz);

  if (!scoreDetails) {
    if (typeof window !== 'undefined') router.replace('/');
    return null;
  }

  const { score, details } = scoreDetails;
  let barColor = '#e53e3e';
  if (score >= 4) barColor = '#38a169';
  else if (score >= 2) barColor = '#ecc94b';

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      {details.map((d, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          <div style={{ marginBottom: 12, fontWeight: 500 }}>{d.question}</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {d.options.map(opt => {
              let style = {
                border: '2px solid #38a169',
                background: '#fff',
                color: '#267140',
                borderRadius: 12,
                padding: '8px 22px',
                fontSize: 18,
                fontWeight: 500,
                cursor: 'default',
              };
              if (opt === d.correctAnswer) {
                style.background = '#38a169';
                style.color = '#fff';
                style.border = '2px solid #38a169';
              } else if (opt === d.yourAnswer && !d.isCorrect) {
                style.background = '#e53e3e';
                style.color = '#fff';
                style.border = '2px solid #e53e3e';
              }
              return (
                <span key={opt} style={style}>{opt}</span>
              );
            })}
          </div>
        </div>
      ))}
      {/* 分数条 */}
      <div style={{ height: 12, width: 200, background: '#eee', borderRadius: 6, margin: '0 auto 30px auto' }}>
        <div style={{
          width: `${(score / details.length) * 100}%`,
          height: '100%',
          background: barColor,
          borderRadius: 6
        }}></div>
      </div>
      <div style={{ color: barColor, textAlign: 'center', fontWeight: 600, marginBottom: 20 }}>
        You scored {score} out of {details.length}
      </div>
      <button
        style={{
          width: '100%',
          background: '#333',
          color: '#fff',
          padding: '14px 0',
          fontSize: 18,
          fontWeight: 600,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
        onClick={() => { dispatch(reset()); router.push('/'); }}
      >
        Create a new quiz
      </button>
    </div>
  );
}