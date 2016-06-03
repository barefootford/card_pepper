var WideButton = React.createClass({
  style: {
    marginTop: '10px'
  },

  render: function() {
    return(<button style={this.style} onClick={this.props.onSaveClick} className='btn btn-block btn-primary'>{this.props.text}</button>)
  }
});