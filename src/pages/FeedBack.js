import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const MINIMUM_ASSERTIONS = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">
          { assertions < MINIMUM_ASSERTIONS
            ? 'Could be better...'
            : 'Well Done!'}
        </h1>
        <p>
          You got
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' '}
          questions right
        </p>
        <p>
          Making
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          points
        </p>

        <div>

          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play again
          </button>

          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(FeedBack);
