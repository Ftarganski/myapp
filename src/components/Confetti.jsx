
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

function Confetti() {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return null;
}

export default Confetti;