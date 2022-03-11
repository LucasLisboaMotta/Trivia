import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { correctAnswer } from '../redux/actions/action';
import randomQuestion from '../helper/randomQuestion';

class GameBody extends Component {
  state = {
    answer: 0,
    disableQuestButton: false,
    timer: 30,
    intervalo: '',
    questionsRandom: [],
  }

  componentDidMount = () => {
    const { questions } = this.props;
    const questionsRandom = questions.map(({ type,
      correct_answer: corrAnswer,
      incorrect_answers: incorrectAnswers,
    }) => randomQuestion(type, corrAnswer, incorrectAnswers));
    this.setState({ questionsRandom });
    this.countDown();
  }

  onClickAnswer = (answerClick) => {
    const { intervalo } = this.state;
    clearInterval(intervalo);
    const { dispatch } = this.props;
    if (answerClick === 'correct-answer') dispatch(correctAnswer());
    this.setState({ disableQuestButton: true });

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
      this.countDown();
      this.setState({ answer: answer + 1, disableQuestButton: false, timer: 30 });
    }
  }

  countDown = () => {
    const INTERVAL_TIME = 1000;
    const intervalo = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          this.onClickAnswer();
          return { timer: 0 };
        }
        return { timer: prevState.timer - 1 };
      });
    }, INTERVAL_TIME);
    this.setState({ intervalo });
  }

  nextButton = () => (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ this.onClickNext }
    >
      Next
    </button>
  )

  render() {
    const { answer, disableQuestButton, timer, questionsRandom } = this.state;
    const { questions } = this.props;
    const { category, question } = questions[answer];
    const randomAnswer = questionsRandom[answer];
    return (
      <div>
        <div>
          <span>{ `${timer} seconds` }</span>
        </div>
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
          {questionsRandom.length !== 0
        && randomAnswer.map(([currentQuestion, testId]) => (
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
        {disableQuestButton && this.nextButton() }
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
