NewCard = React.createClass({
  styles: {
    marginTop: '10px',
    borderRadius: '6px',
    width: '100%',
    border: '2px solid #bdc3c7',
    fontSize: '15px'
  },

  render: function() {
    if (this.props.active) {
      return(<div className='new_card_form'>
        <form className='new_card'>
          <textarea style={this.styles} className='form-control' placeholder="Question" value={this.props.question} onChange={this.props.onChange} rows='4'/>
          <textarea style={this.styles} className='form-control' placeholder="Answer" value={this.props.answer} onChange={this.props.onChange} rows='4'/>
          <WideButton onSaveClick={this.props.onSaveClick} text='Save Card'/>
        </form>
      </div>)
    } else {
      return(<div className='new_card_form'></div>)
    }
  }
})