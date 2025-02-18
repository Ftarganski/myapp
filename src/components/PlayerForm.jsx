import PropTypes from 'prop-types';
import { useState } from 'react';

function PlayerForm({ onSubmit }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(player1, player2);
    setPlayer1('');
    setPlayer2('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Jogador 1"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome do Jogador 2"
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
        required
      />
      <button type="submit">Iniciar Jogo</button>
    </form>
  );
}
PlayerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PlayerForm;


