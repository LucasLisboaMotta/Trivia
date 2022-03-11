import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends Component {
  render() {
    const { assertions, score } = this.props;
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
        <p />
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
};

export default connect(mapStateToProps)(FeedBack);
