"use client";
import { useState } from "react";
import Image from "next/image";

const characterImages = [
  "/rabbit.png",
  "/turtle.png",
  "/lion.png",
  "/tiger.png",
  "/otter.png",
  "/squirrel.png",
];

export default function DesktopGamePage() {
  const [page, setPage] = useState(1);
  const [numPlayers, setNumPlayers] = useState(6);
  const [numQuestions, setNumQuestions] = useState(5);
  const [playerNames, setPlayerNames] = useState(Array(6).fill(""));
  const [scores, setScores] = useState(Array(6).fill(0));
  const [answers, setAnswers] = useState(Array.from({ length: 20 }, () => Array(6).fill(false)));

  const characters = ['토끼', '거북이', '사자', '호랑이', '수달', '다람쥐'];

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleCheck = (qIdx, pIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx][pIdx] = !newAnswers[qIdx][pIdx];
    setAnswers(newAnswers);

    const newScores = [...scores];
    newScores[pIdx] = newAnswers.reduce((sum, ans) => sum + (ans[pIdx] ? 1 : 0), 0);
    setScores(newScores);
  };

  const sortedScores = [...scores].map((score, index) => ({ index, score }))
    .sort((a, b) => b.score - a.score);

  const winnerIndex = sortedScores[0].index;

  return (
    <div style={{ padding: '3rem', fontFamily: 'Pretendard', fontSize: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {page === 1 && (
        <div style={{ textAlign: 'center' }}>
        {page === 1 && (
        <Image src="/banner.gif" alt="게임한입 배너" width={800} height={100} style={{ marginBottom: '3rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
      )}

          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>게임 참여자 수</p>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <label key={n} style={{ margin: '0 0.75rem' }}>
                <input type="radio" name="players" onChange={() => setNumPlayers(n)} checked={numPlayers === n} /> {n}명
              </label>
            ))}
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>문항 수</p>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              style={{
                padding: '0.5rem',
                fontSize: '2rem',
                width: '480px',
                textAlign: 'center',
                border: '2px solid #888',
                borderRadius: '6px'
              }}
            />
          </div>

          <button
            onClick={() => setPage(2)}
            style={{ ...buttonStyle, width: '300px' }}
          >
            다음
          </button>
        </div>
      )}

      {page === 2 && (
        <div>
          <p><strong>참여자 이름을 입력해주세요.</strong></p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[...Array(numPlayers)].map((_, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1rem' }}>
                <Image src={characterImages[i]} alt={characters[i]} width={100} height={100} />
                <input
                  value={playerNames[i]}
                  onChange={e => handleNameChange(i, e.target.value)}
                  placeholder="이름"
                  style={{ marginTop: '1rem', padding: '0.75rem', border: '2px solid #aaa', width: '80%', fontSize: '1.3rem' }}
                />
              </div>
            ))}
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setPage(1)} style={{ ...buttonStyle, width: '200px', marginRight: '1rem' }}>이전</button>
            <button onClick={() => setPage(3)} style={{ ...buttonStyle, width: '200px' }}>다음</button>
          </div>
        </div>
      )}

      {page === 3 && (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr>
                <th></th>
                {[...Array(numPlayers)].map((_, i) => (
                  <th key={i} style={{ textAlign: 'center' }}>
                    <div>
                      <Image src={characterImages[i]} alt={characters[i]} width={60} height={60} />
                      <div>{characters[i]}</div>
                      <div>점수: {scores[i]}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(numQuestions)].map((_, qIdx) => (
                <tr key={qIdx}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>문항 {qIdx + 1}</td>
                  {[...Array(numPlayers)].map((_, pIdx) => (
                    <td key={pIdx} style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={answers[qIdx][pIdx]}
                        onChange={() => handleCheck(qIdx, pIdx)}
                        style={{ width: '24px', height: '24px' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center'}}>
            <button onClick={() => setPage(2)} style={{ ...buttonStyle, width: '200px', marginRight:'1rem' }}>이전</button>
            <button onClick={() => setPage(4)} style={{ ...buttonStyle, width: '200px' }}>결과 보기</button>
          </div>
        </div>
      )}

      {page === 4 && (
        <div>
          <h2 style={{ fontSize: '2.5rem' }}>🎉 게임 우승자는 🥳</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', margin: '2rem 0' }}>
            <Image src={characterImages[winnerIndex]} alt={characters[winnerIndex]} width={120} height={120} />
            <div>
              <h3 style={{ fontSize: '2rem' }}>{characters[winnerIndex]}</h3>
              <p style={{ fontSize: '1.5rem' }}>총 점수: {scores[winnerIndex]}점</p>
            </div>
          </div>
          <hr style={{ margin: '2rem 0', borderTop: '2px solid #ddd' }} />
          <h3>전체 순위</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.5rem', lineHeight: '2.5rem' }}>
            {sortedScores.map(({ index, score }, rank) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: rank === 0 ? '#e91e63' : rank === 1 ? '#3f51b5' : '#333' }}>
                <span>{rank + 1}등 -</span>
                <Image src={characterImages[index]} alt={characters[index]} width={28} height={28} />
                <span>{characters[index]} ({score}점)</span>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => setPage(3)} style={{ ...buttonStyle, width: '200px' }}>이전</button>
              <button
                style={{ ...buttonStyle, width: '200px' }}
                onClick={() => {
                  setPage(1);
                  setNumPlayers(6);
                  setNumQuestions(5);
                  setPlayerNames(Array(6).fill(""));
                  setScores(Array(6).fill(0));
                  setAnswers(Array.from({ length: 20 }, () => Array(6).fill(false)));
                }}
              >한번 더 하기</button>
            </div>
            <a href="https://www.youtube.com/@short_game_bite/playlists" target="_blank" rel="noopener noreferrer">
              <button style={{ ...buttonStyle, width: '420px' }}>더 많은 게임 보기</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1.2rem',
  cursor: 'pointer'
};