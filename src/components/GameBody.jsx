import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswer } from '../redux/actions/action';
import randomQuestion from '../helper/randomQuestion';

class GameBody extends Component {
  state = {
    answer: 0,
  }

  onClickAnswer = (answerClick) => {
    const { history, dispatch } = this.props;
    if (answerClick === 'correct-answer') dispatch(correctAnswer());
    const LAST_QUESTION = 4;
    const { answer } = this.state;
    if (answer === LAST_QUESTION) history.push('/feedback');
    else this.setState({ answer: answer + 1 });
  }
  // type, correct, wrong

  render() {
    const { answer } = this.state;
    const { questions } = this.props;
    const { category, question, type, correct_answer: corrAnswer,
      incorrect_answers: incorrectAnswers } = questions[answer];
    const randomAnswer = randomQuestion(type, corrAnswer, incorrectAnswers);
    return (
      <div>
        <h1
          data-testid="question-category"
          dangerouslySetInnerHTML={ { __html: category } }
        />
        <h2
          data-testid="question-text"
        >
          {question}
        </h2>
        <div data-testid="answer-options">
          {randomAnswer.map(([currentQuestion, testId]) => (
            <button
              key={ currentQuestion }
              type="button"
              onClick={ () => this.onClickAnswer(testId) }
              data-testid={ testId }
              dangerouslySetInnerHTML={ { __html: currentQuestion } }
            >
              {}
            </button>))}
        </div>
      </div>
    );
  }
}

GameBody.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(GameBody);
