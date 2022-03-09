import { GET_TOKEN } from '../actions/action';

const INITIAL_STATE = {};

function token(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case GET_TOKEN:
    localStorage.setItem('token', payload);
    return payload;

  default:
    return state;
  }
}

export default token;
