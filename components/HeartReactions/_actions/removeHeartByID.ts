import { Hearts } from '../_state/heartItems';

export const removeHeartByID = (idToRemove) => {
  return (prev: Hearts) =>
    prev.filter(({ id }) => {
      return id !== idToRemove;
    });
};

export default removeHeartByID;
