import { GET_USER_INFO } from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  isLogged: false,
};

function player(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_USER_INFO:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  default:
    return state;
  }
}

export default player;
