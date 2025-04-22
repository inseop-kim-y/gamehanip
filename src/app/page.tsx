"use client";
import { useState } from "react";
import Image from "next/image";

const characterImages = [
  "/rabbit.png",
  "/turtle.png",
  "/lion.png",
  "/tiger.png",
];

export default function GameHanipApp() {
  const [page, setPage] = useState(1);
  const [numPlayers, setNumPlayers] = useState(1);
  const [numQuestions, setNumQuestions] = useState(5);
  const [playerNames, setPlayerNames] = useState(Array(4).fill(""));
  const [scores, setScores] = useState(Array(4).fill(0));
  const [answers, setAnswers] = useState(Array.from({ length: 20 }, () => Array(4).fill(false)));

  const characters = ['토끼', '거북이', '사자', '호랑이'];

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
    <div style={{
      padding: '1rem',
      fontFamily: 'Pretendard',
      background: '#ffffff',
      fontSize: '1rem',
      lineHeight: '1.8rem',
      maxWidth: '100%',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* 1페이지 */}
      {page === 1 && (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <Image src="/banner.gif" alt="게임한입 배너" width={360} height={80} style={{ marginBottom: '2rem', width: '100%', height: 'auto' }} />
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>게임 참여자 수를 선택해주세요.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[1, 2, 3, 4].map(n => (
              <label key={n}>
                <input type="radio" name="players" onChange={() => setNumPlayers(n)} /> {n}명
              </label>
            ))}
          </div>
          <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>문항 수를 입력해주세요.</p>
          <input
            type="number"
            value={numQuestions}
            onChange={e => setNumQuestions(Number(e.target.value))}
            style={{ padding: '0.5rem', textAlign: 'center', border: '1px solid #ccc', width: '100%' }}
          />
          <br />
          <button
            style={{ marginTop: '2rem', padding: '0.6rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', width: '100%' }}
            onClick={() => setPage(2)}
          >다음</button>
          <button
  style={{
    marginTop: '1rem',
    padding: '0.6rem 1.5rem',
    background: '#f0f0f0',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '0.95rem',
    width: '100%'
  }}
  onClick={() => window.location.href = "/desktop"}
>
  PC 버전
</button>

        </div>
      )}

      {/* 2페이지 */}
      {page === 2 && (
        <div>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>참여자 이름을 입력해주세요.</p>
          {[...Array(numPlayers)].map((_, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <Image src={characterImages[i]} alt={characters[i]} width={60} height={60} />
              <br />
              <input
                value={playerNames[i]}
                onChange={e => handleNameChange(i, e.target.value)}
                style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', border: '2px solid orange', borderRadius: '6px' }}
              />
            </div>
          ))}
          <br />
          <button style={{ marginRight: '1rem', padding: '0.5rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '6px' }} onClick={() => setPage(1)}>이전</button>
          <button style={{ padding: '0.5rem 1.5rem', background: '#000', color: '#fff', border: 'none', borderRadius: '6px' }} onClick={() => setPage(3)}>다음</button>
        </div>
      )}

      {/* 3페이지 */}
      {page === 3 && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <table style={{ borderCollapse: 'collapse', margin: '0 auto', width: '100%', maxWidth: '480px' }}>
            <thead>
              <tr>
                <th style={{ paddingBottom: '1rem', fontSize: '1.1rem' }}>총 {numQuestions}문항</th>
                {[...Array(numPlayers)].map((_, i) => (
                  <th key={i} style={{ paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Image src={characterImages[i]} alt={characters[i]} width={40} height={40} />
                      <div>{characters[i]}</div>
                      <div style={{ fontSize: '0.85rem' }}>점수: {scores[i]}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(numQuestions)].map((_, qIdx) => (
                <tr key={qIdx}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>문항 {qIdx + 1}</td>
                  {[...Array(numPlayers)].map((_, pIdx) => (
                    <td key={pIdx} style={{ padding: '0.5rem' }}>
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

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => setPage(2)} style={smallButtonStyle}>이전</button>
            <button onClick={() => setPage(4)} style={smallButtonStyle}>결과 보기</button>
          </div>
        </div>
      )}

      {/* 4페이지 */}
      {page === 4 && (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🎉 게임 우승자는 🥳</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <Image src={characterImages[winnerIndex]} alt={characters[winnerIndex]} width={80} height={80} />
            <h3 style={{ fontSize: '1.5rem', margin: '1rem 0 0.5rem' }}>{characters[winnerIndex]}</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>총 점수: {scores[winnerIndex]}점</p>
          </div>

          <hr style={{ margin: '2rem 0' }} />

          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>전체 순위</h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            fontSize: '1rem',
            lineHeight: '2.2rem',
            maxWidth: '300px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            {sortedScores.map(({ index, score }, rank) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ minWidth: '3rem' }}>{rank + 1}등 -</span>
                <Image src={characterImages[index]} alt={characters[index]} width={24} height={24} />
                <span>{characters[index]} ({score}점)</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={smallButtonStyle} onClick={() => setPage(3)}>이전</button>
              <button
                style={smallButtonStyle}
                onClick={() => {
                  setPage(1);
                  setNumPlayers(1);
                  setNumQuestions(5);
                  setPlayerNames(Array(4).fill(""));
                  setScores(Array(4).fill(0));
                  setAnswers(Array.from({ length: 20 }, () => Array(4).fill(false)));
                }}
              >한번 더 하기</button>
            </div>
            <a href="https://www.youtube.com/@short_game_bite/playlists" target="_blank" style={{ width: '100%', maxWidth: '260px' }}>
              <button style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: '#000',
                color: '#fff',
                border: '2px solid #000',
                borderRadius: '8px',
                fontSize: '1rem'
              }}>
                더 많은 게임 보기
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

const smallButtonStyle = {
  padding: '0.6rem 1.5rem',
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  height: '44px',
  minWidth: '100px'
};
