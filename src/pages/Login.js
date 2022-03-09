import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, getUserInfo } from '../redux/actions/action';

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

  render() {
    const { history, addUserInfo, getTokenDispatch } = this.props;
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
          onClick={ () => {
            addUserInfo({ ...this.state });
            getTokenDispatch();
            history.push('/game');
          } }
        >
          Play
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
  getTokenDispatch: (token) => dispatch(fetchToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
