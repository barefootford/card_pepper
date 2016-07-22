var QuietLabel = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  style: {
    color: 'rgb(188, 195, 202)'
  },

  render: function() {
    return(
      <small style={this.style}>{this.props.text}</small>
    )
  }
})