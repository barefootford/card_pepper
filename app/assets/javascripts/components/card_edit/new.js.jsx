Decks.Show.TR.CardEdit.New = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    handleCardChange: React.PropTypes.func.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool
  },

  saveText: function() {
    return this.props.saving ? 'Saving Card Edit...' : 'Save Card Edit'
  },

  handleEditCardQuestionChange: function(event) {
    this.props.handleCardChange(event, this.props.card, 'edited_question');
  },

  handleEditCardAnswerChange: function(event) {
    this.props.handleCardChange(event, this.props.card, 'edited_answer');
  },

  handleEditCardReasonChange: function(event) {
    this.props.handleCardChange(event, this.props.card, 'reason');
  },

  saveButtonShouldBeDisabled: function() {
    var card = this.props.card;
    var questionHasNotChanged = card.edited_question === card.question;
    var answerHasNotChanged = card.edited_answer === card.answer;

    var cardEditHasNoChanges = (questionHasNotChanged && answerHasNotChanged);
    var basicQuestionValidationsFail = ViewHelpers.basicValidationsFail(card.edited_question);
    var basicAnswerValidationsFail = ViewHelpers.basicValidationsFail(card.edited_answer);

    // disable the save button if there are no changes, or the Q or A is empty/blank
    var somethingFailed = (cardEditHasNoChanges || basicQuestionValidationsFail || basicAnswerValidationsFail)

    return somethingFailed
  },

  render: function() {
    var card = this.props.card;
    var that = this;

    return (
      <tr key={card.id}>
        <td>
          <div className='row'>
            <div className='col-md-12'>
              <textarea
                className='form-control'
                placeholder='Question'
                value={card.edited_question}
                onChange={this.handleEditCardQuestionChange}
              />
              <ValidationsOrRequirements
                errors={card.questionErrors}
                inputText={card.edited_question}
              />

              <textarea
                className='form-control'
                placeholder='Answer'
                value={card.edited_answer}
                onChange={that.handleEditCardAnswerChange}
              />
              <ValidationsOrRequirements
                errors={card.answerErrors}
                inputText={card.edited_answer}
              />
              <div><Small text="Reason for Card Edit: (typo, improvement, etc.)"/></div>
              <textarea
                className='form-control'
                value={card.reason}
                onChange={that.handleEditCardReasonChange}
              /><br/>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-8'>
              <XsBtn
                text={this.saveText()}
                onClick={this.props.handleChangeCardStatusClick}
                callbackAttribute='CREATE'
                callbackAttributeId={card.id}
                primary
                disabled={this.saveButtonShouldBeDisabled()}
              />
                <XsBtn
                  text='Cancel'
                  // hide this button if the new Card Edit is saving
                  hidden={this.props.saving ? true : false}
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='viewing'
                  callbackAttributeId={card.id}
                  additionalClasses='mhm'
                />
            </div>
            <div className='col-md-4' style={{textAlign: 'right'}}>
              <CardEditBy
                name={this.props.currentUser.name}
                id={this.props.currentUser.id}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <small>Saving this Card Edit will notify the deck's editor. Only the deck's editor can approve changes.</small>
            </div>
          </div>
        </td>
      </tr>
    )
  }
});
