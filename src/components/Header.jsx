import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
        <img src={ gravatarEmail } alt={ name } data-testid="header-profile-picture" />
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  name: player.name,
  score: player.score,
  gravatarEmail: player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
