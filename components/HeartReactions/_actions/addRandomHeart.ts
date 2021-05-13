import { nanoid } from 'nanoid/non-secure';
import { Hearts } from '../_state/heartItems';

export const addRandomHeart = () => {
  return (prev: Hearts) => {
    // Only allow three "random" hearts
    if (prev.length > 9) return prev;
    const heart = {
      id: nanoid(25),
    };
    return [...prev, heart];
  };
};

export default addRandomHeart;
