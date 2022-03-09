import md5 from 'crypto-js/md5';

export const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = (state) => {
  const convertHash = md5(state.gravatarEmail).toString();
  const url = (hash) => `https://www.gravatar.com/avatar/${hash}`;
  state.gravatarEmail = url(convertHash);
  return { type: GET_USER_INFO, payload: state };
};
