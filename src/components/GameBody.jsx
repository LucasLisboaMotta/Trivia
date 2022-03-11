import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswer } from '../redux/actions/action';
import randomQuestion from '../helper/randomQuestion';

class GameBody extends Component {
  state = {
    answer: 0,
    disableQuestButton: false,
    disableNextButton: true,
  }

  onClickAnswer = (answerClick) => {
    const { dispatch } = this.props;
    if (answerClick === 'correct-answer') dispatch(correctAnswer());
    this.setState({ disableNextButton: false, disableQuestButton: true });
    const correct = document.querySelector('.correct');
    const incorrect = document.querySelectorAll('.wrong');
    correct.className = 'correct-click';
    incorrect.forEach((element) => {
      element.className = 'wrong-click';
    });
  }

  onClickNext = () => {
    const { history } = this.props;
    const LAST_QUESTION = 4;
    const { answer } = this.state;
    if (answer === LAST_QUESTION) history.push('/feedback');
    else {
      this.setState({ answer: answer + 1,
        disableQuestButton: false,
        disableNextButton: true });
    }
  }

  render() {
    const { answer, disableNextButton, disableQuestButton } = this.state;
    const { questions } = this.props;
    const { category, question, type, correct_answer: corrAnswer,
      incorrect_answers: incorrectAnswers } = questions[answer];
    const randomAnswer = randomQuestion(type, corrAnswer, incorrectAnswers);
    return (
      <div>
        <h1
          data-testid="question-category"
        >
          {category}
        </h1>
        <h2
          data-testid="question-text"
        >
          {question}
        </h2>
        <div data-testid="answer-options">
          {randomAnswer.map(([currentQuestion, testId]) => (
            <button
              className={ testId.split('-')[0] }
              key={ currentQuestion }
              type="button"
              onClick={ () => this.onClickAnswer(testId) }
              data-testid={ testId }
              disabled={ disableQuestButton }
            >
              {currentQuestion}
            </button>))}
        </div>
        <button
          type="button"
          disabled={ disableNextButton }
          onClick={ this.onClickNext }
        >
          Next
        </button>
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
