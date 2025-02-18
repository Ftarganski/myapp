import PropTypes from 'prop-types';

function RankingTable({ rankings }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Jogador</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        {rankings.map((player, index) => (
          <tr key={index}>
            <td>{player.name}</td>
            <td>{player.points.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

RankingTable.propTypes = {
  rankings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RankingTable;
