import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail, assertions } = this.props;
    const MINIMUM_ASSERTIONS = 3;
    return (
      <header>
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
        <img src={ gravatarEmail } alt={ name } data-testid="header-profile-picture" />
        <span data-testid="feedback-text">
          { assertions < MINIMUM_ASSERTIONS
            ? 'Could be better...'
            : 'Could be better...'}
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
  assertions: player.assertions,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
