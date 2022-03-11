import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../helper/localStorageHelper';

class Ranking extends Component {
  render() {
    const getRanked = getLocalStorage()
      .sort((a, b) => b.score - a.score);
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <ol>
            {getRanked.map(({ name, score, gravatarEmail }, index) => (
              <li key={ index }>
                <img src={ gravatarEmail } alt={ name } />
                <p data-testid={ `player-name-${index}` }>{ name }</p>
                <p data-testid={ `player-score-${index}` }>{ score }</p>
              </li>
            ))}
          </ol>
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
          } }
        >
          Go Home!
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
