import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInfo, getToken } from '../redux/actions/action';

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  }

  onInputChange = ({ target: { id, value } }) => this.setState({ [id]: value });

  isDisabled = (gravatarEmail, name) => {
    if (gravatarEmail === '' || name === '') {
      return true;
    } return false;
  }

  onClickButton = async () => {
    const { history, addUserInfo, getTokenDispatch } = this.props;
    const fToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await fToken.json();
    getTokenDispatch(token);
    addUserInfo({ ...this.state });
    history.push('/game');
  }

  render() {
    const { history } = this.props;
    const { gravatarEmail, name } = this.state;
    return (
      <div>
        <label htmlFor="gravatarEmail">
          <input
            id="gravatarEmail"
            data-testid="input-gravatar-email"
            type="email"
            value={ gravatarEmail }
            onChange={ this.onInputChange }
            required
          />
        </label>
        <label htmlFor="name">
          <input
            id="name"
            data-testid="input-player-name"
            type="text"
            value={ name }
            onChange={ this.onInputChange }
            required
          />
        </label>
        <button
          id="userSubmit"
          data-testid="btn-play"
          type="button"
          disabled={ this.isDisabled(gravatarEmail, name) }
          onClick={ this.onClickButton }
        >
          Play
        </button>
        <button
          id="userSettings"
          data-testid="btn-settings"
          type="button"
          onClick={ () => {
            history.push('/settings');
          } }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  addUserInfo: PropTypes.func.isRequired,
  getTokenDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUserInfo: (value) => dispatch(getUserInfo(value)),
  getTokenDispatch: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
