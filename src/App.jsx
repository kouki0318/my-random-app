import React, { useState } from 'react';

function App() {
  const initialNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
  const [remainingNumbers, setRemainingNumbers] = useState(initialNumbers);
  const [selected, setSelected] = useState([]);
  const [usedNumbers, setUsedNumbers] = useState([]); // ← 追加

  const drawNumbers = () => {
    if (remainingNumbers.length < 4) {
      alert("残りの数字が少なすぎます！");
      return;
    }

    const newSelection = [];
    const tempRemaining = [...remainingNumbers];

    for (let i = 0; i < 4; i++) {
      const randIndex = Math.floor(Math.random() * tempRemaining.length);
      const chosen = tempRemaining.splice(randIndex, 1)[0];
      newSelection.push(chosen);
    }

    setSelected(newSelection);
    setRemainingNumbers(tempRemaining);
    setUsedNumbers(prev => [...prev, ...newSelection].sort((a, b) => a - b)); // 追加・ソート
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🎯 ランダム数字セレクター</h1>
      <button onClick={drawNumbers} disabled={remainingNumbers.length < 4}>
        ランダムに4つ選ぶ
      </button>

      {selected.length > 0 && (
        <div style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
          <strong>今回の数字：</strong> {selected.join(', ')}
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '1rem', color: '#333' }}>
        <strong>すでに出た数字：</strong>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '0.5rem'
        }}>
          {usedNumbers.map(num => (
            <span key={num} style={{
              background: '#e0e0e0',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '1rem'
            }}>
              {num}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', color: 'gray' }}>
        残りの数字：{remainingNumbers.length}個
      </div>

      {remainingNumbers.length < 4 && (
        <p style={{ color: 'red', marginTop: '0.5rem' }}>
          ⚠️ もう十分な数字が残っていません！
        </p>
      )}
    </div>
  );
}

export default App;
