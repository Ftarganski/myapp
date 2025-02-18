import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import Confetti from './components/Confetti';
import PlayerForm from './components/PlayerForm';
import RankingTable from './components/RankingTable';
import { loadRankings, saveRankings } from './utils/localStorage';

function App() {
  const [players, setPlayers] = useState([]);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [rankings, setRankings] = useState(loadRankings());
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    saveRankings(rankings);
  }, [rankings]);

  const handlePlayerSubmit = (player1, player2) => {
    setPlayers([{ name: player1, points: 0 }, { name: player2, points: 0 }]);
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(true);
  };

  const handleClick = (i) => {
    if (!gameStarted || squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
    calculateWinner(nextSquares);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        updateRankings(squares[a]);
        return;
      }
    }
    if (!squares.includes(null)) {
      updateRankings(null);
    }
  };

  const updateRankings = (winner) => {
    const updatedRankings = [...rankings];
    if (winner) {
      const winningPlayer = players.find((p) => p.name === (winner === 'X' ? players[0].name : players[1].name));
      const losingPlayer = players.find((p) => p.name === (winner === 'X' ? players[1].name : players[0].name));
      if (winningPlayer) {
        const existingWinningPlayer = updatedRankings.find((p) => p.name === winningPlayer.name);
        if (existingWinningPlayer) {
          existingWinningPlayer.points += 1.3;
        } else {
          updatedRankings.push({ name: winningPlayer.name, points: 1.3 });
        }
      }
      if (losingPlayer) {
        const existingLosingPlayer = updatedRankings.find((p) => p.name === losingPlayer.name);
        if (!existingLosingPlayer) {
          updatedRankings.push({ name: losingPlayer.name, points: 0 });
        }
      }
    } else {
      players.forEach((player) => {
        const existingPlayer = updatedRankings.find((p) => p.name === player.name);
        if (existingPlayer) {
          existingPlayer.points += 0.9;
        } else {
          updatedRankings.push({ name: player.name, points: 0.9 });
        }
      });
    }

    setRankings(updatedRankings);
    setGameStarted(false);
    setPlayers([]);
  };

  const handleReset = () => {
    setPlayers([]);
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(false);
  };

  const handleResetRanking = () => {
    setRankings([]);
    saveRankings([]);
  };

  return (
    <div className="App">
      {winner && <Confetti />}
      <PlayerForm onSubmit={handlePlayerSubmit} />
      {gameStarted && (
        <div className="current-player">
          Jogador Atual: {isXNext ? players[0].name : players[1].name}
        </div>
      )}
      <Board squares={squares} onClick={handleClick} />
      <RankingTable rankings={rankings} />
      <button onClick={handleReset}>Reiniciar Jogo</button>
      <button onClick={handleResetRanking}>Resetar Ranking</button>
    </div>
  );
}

export default App;
