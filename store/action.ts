export const ACTION_TYPES = {
  ADD_HEART: 'ADD_HEART',
  REMOVE_HEART: 'REMOVE_HEART',
};

const addHeartAction = (heart) => {
  return {
    type: ACTION_TYPES.ADD_HEART,
    payload: heart,
  };
};

const removeHeartAction = (heartId) => {
  return {
    type: ACTION_TYPES.REMOVE_HEART,
    payload: heartId,
  };
};

export function addHeart() {
  return async (dispatch) => {
    const heart = { id: Math.round(Math.random() * 1000) };

    dispatch(addHeartAction(heart));
    setTimeout(() => {
      dispatch(removeHeartAction(heart.id));
    }, 2000);
  };
}
