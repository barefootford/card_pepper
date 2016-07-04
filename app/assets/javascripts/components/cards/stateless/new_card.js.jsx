var NewCard = React.createClass({
  render: function() {
    var style = {
      borderRadius: '6px',
      width: '100%',
      border: '2px solid #bdc3c7',
      fontSize: '15px'
    }

    if (this.props.active) {
      return(
        <form className='new_card'>
          <small>Question:</small>
          <textarea
            style={style}
            className='form-control'
            placeholder="Question"
            value={this.props.card.question}
            onChange={this.props.onChange}
            rows='4'
          />
          <ValidationsOrRequirements
            errors={this.props.card.questionErrors}
            text={this.props.card.question}
          />
          <small>Answer:</small>
          <textarea
            style={style}
            className='form-control'
            placeholder="Answer"
            value={this.props.card.answer}
            onChange={this.props.onChange}
            rows='4'
          />
          <ValidationsOrRequirements
            errors={this.props.card.answerErrors}
            text={this.props.card.answer}
          />
          <WideSaveButton
            onSaveClick={this.props.onSaveClick}
            standardText='Save Card'
            savingText='Saving Card...'
            objectStatus={this.props.card.status}
          />
        </form>
      )
    } else {
      return null
    }
  }
})