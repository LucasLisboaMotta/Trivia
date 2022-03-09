import { GET_USER_INFO } from '../actions/action';

const INITIAL_STATE = {
  name: 'Player',
  assertions: 0,
  score: 0,
  gravatarEmail: 'https://www.gravatar.com/avatar/5fe9e51e59db5ce1541c1902a9ee0ec3',
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
