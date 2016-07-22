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
          <div className='small'>Question:</div>
          <textarea
            style={style}
            className='form-control'
            placeholder="Question"
            value={this.props.card.question}
            onChange={this.props.onChange}
            rows='3'
          />
          <ValidationsOrRequirements
            errors={this.props.card.questionErrors}
            inputText={this.props.card.question}
          />
          <div className='small'>Answer:</div>
          <textarea
            style={style}
            className='form-control'
            placeholder="Answer"
            value={this.props.card.answer}
            onChange={this.props.onChange}
            rows='3'
          />
          <ValidationsOrRequirements
            errors={this.props.card.answerErrors}
            inputText={this.props.card.answer}
          />
          <BlockBtn
            onClick={this.props.onSaveClick}
            text='Save Card'
            savingText='Saving Card...'
            primary
          />
        </form>
      )
    } else {
      return null
    }
  }
})