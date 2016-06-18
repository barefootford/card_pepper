var CardRowQuestionAnswerFields = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    handleEditCardChange: React.PropTypes.func.isRequired
  },

  handleEditCardQuestionChange: function(event) {
    this.props.handleEditCardChange(event, this.props.card, 'edited_question');
  },

  handleEditCardAnswerChange: function(event) {
    this.props.handleEditCardChange(event, this.props.card, 'edited_answer');
  },

  render: function() {
    return(
      <div>
        {/* <small>Question:</small> */}
        
        <textarea
          className='form-control'
          placeholder='Question'
          value={this.props.card.edited_question}
          onChange={this.handleEditCardQuestionChange}
        />
        <ValidationsOrRequirements
          errors={this.props.card.questionErrors}
          text={this.props.card.edited_question}
        />

        {/* <small>Answer:</small> */}
        <textarea
          className='form-control'
          placeholder='Answer'
          value={this.props.card.edited_answer}
          onChange={this.handleEditCardAnswerChange}
        />
        <ValidationsOrRequirements
          errors={this.props.card.answerErrors}
          text={this.props.card.edited_question}
        />
      </div>
    )
  }
})