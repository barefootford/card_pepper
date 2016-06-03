NewCard = React.createClass({
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
          <textarea style={style} className='form-control' placeholder="Question" value={this.props.question} onChange={this.props.onChange} rows='4'/>
          <small>Answer:</small>
          <textarea style={style} className='form-control' placeholder="Answer" value={this.props.answer} onChange={this.props.onChange} rows='4'/>
          <WideButton onSaveClick={this.props.onSaveClick} text='Save Card'/>
        </form>
      )
    } else {
      return null
    }
  }
})