export const loadRankings = () => {
  const rankings = localStorage.getItem('rankings');
  return rankings ? JSON.parse(rankings) : [];
};

export const saveRankings = (rankings) => {
  localStorage.setItem('rankings', JSON.stringify(rankings));
};