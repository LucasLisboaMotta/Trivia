import md5 from 'crypto-js/md5';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (state) => ({ type: GET_TOKEN, payload: state });

export const getUserInfo = (state) => {
  const convertHash = md5(state.gravatarEmail).toString();
  const url = (hash) => `https://www.gravatar.com/avatar/${hash}`;
  state.gravatarEmail = url(convertHash);
  return { type: GET_USER_INFO, payload: state };
};

export const fetchToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();

  dispatch(getToken(data.token));
};
