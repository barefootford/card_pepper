var CardSuggestionView = React.createClass({
  getInitialState: function() {
    return({
      question: '',
      answer: '',
      purpose: '',
      questionErrors: [],
      answerErrors: [],
      alertMessage: '' // Only use setAlert()
    })
  },

  setAlert: function(alertString) {
    var that = this;
    this.setState({alertMessage: alertString});

    // remove the alert after its displayed for 7 seconds
    window.setTimeout(function() {
      that.setState({alertMessage: ''});
    }, 7000)
  },

  handleRemoveAlertClick: function() {
    this.setState({alertMessage: '' })
  },

  saveCardSuggestionToServer: function() {
    var url = '/decks/' + this.props.deckID + '/card_suggestions';

    $.ajax(url, {
      method: 'POST',
      data: {
        card_suggestion: {
          question: this.state.question,
          answer: this.state.answer
        }
      },
      dataType: 'json',
      error: function(response) {
        var response = response.responseJSON;
        var _questionErrors = _.concat([], response.errors.question);
        var questionErrors = _.compact(_questionErrors);

        var _answerErrors = _.concat([], response.errors.answer);
        var answerErrors = _.compact(response.errors.answer);

        this.setState({
          questionErrors: questionErrors,
          answerErrors: answerErrors
        });
      }.bind(this),
      success: function(response) {
        this.setState({
          questionErrors: [],
          answerErrors: [],
          question: '',
          answer: ''
        });
        this.setAlert(response.status)
      }.bind(this)
    })
  },

  handleEnteredQuestionChange: function(event) {
    this.setState({question: event.target.value.substr(0, 140)});
  },

  handleEnteredAnswerChange: function(event) {
    this.setState({answer: event.target.value.substr(0, 140)});
  },

  render: function() {
    var currentUser = this.props.currentUser;
    var currentUserIsOwner = (currentUser.id === this.props.deckEditorID);

    if ( _.isObject(currentUser) && _.isNumber(currentUser.id) ) {
      return(
        <div>
          <h5>Suggest a New Card:</h5>
          <CardSuggestionAlert
            message={this.state.alertMessage}
            onClick={this.handleRemoveAlertClick}
          />

          <small>Question:</small>
          <textarea
            className='form-control'
            value={this.state.question}
            onChange={this.handleEnteredQuestionChange}
            rows='2'
          />
          <ValidationsOrRequirements
            inputText={this.state.question}
            errors={this.state.questionErrors}
          />

          <small>Answer:</small>
          <textarea
            className='form-control'
            value={this.state.answer}
            onChange={this.handleEnteredAnswerChange}
            rows='2'
          />
          <ValidationsOrRequirements
            inputText={this.state.answer}
            errors={this.state.answerErrors}
          />

          <CardSuggestionSubmittedBy
            id={this.props.currentUser.id}
            name={this.props.currentUser.name}
          />
          <div
            onClick={this.saveCardSuggestionToServer}
            className='btn btn-block btn-primary'
          >
            Suggest Card
          </div>

        </div>
      )
    } else {
      return null
    }
  }
});
