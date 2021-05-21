import { ACTION_TYPES } from './action';

interface IHeart {
  id: number;
}

interface IState {
  hearts: IHeart[];
}

const initialState: IState = {
  hearts: [],
};

export default function heartsReducer(state: IState = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_HEART:
      return {
        hearts: [...state.hearts, action.payload],
      };

    case ACTION_TYPES.REMOVE_HEART:
      let heartId = action.payload;
      const newHearts = state.hearts.filter((heart) => heart.id !== heartId);

      return {
        hearts: newHearts,
      };

    default:
      return state;
  }
}
