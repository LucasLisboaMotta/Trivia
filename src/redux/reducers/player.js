import { GET_TOKEN, GET_USER_INFO } from '../actions/action';

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
      ...payload,
    };
  case GET_TOKEN:
    localStorage.setItem('token', payload);
    return state;
  default:
    return state;
  }
}

export default player;
