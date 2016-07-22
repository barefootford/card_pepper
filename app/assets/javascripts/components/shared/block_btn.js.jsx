var BlockBtn = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    savingText: React.PropTypes.string,
    callbackAttribute: React.PropTypes.string,
    callbackAttributeId: React.PropTypes.number,
    primary: React.PropTypes.bool
  },

  style: {
    marginTop: '10px'
  },

  btnColor: function() {
    return this.props.primary ? 'btn-primary' : 'btn-default'
  },

  render: function() {
    return(
      <button
        style={this.style}
        onClick={this.props.onClick}
        className={'btn btn-block ' + this.btnColor()}
      >
        {this.props.text}
      </button>
    )
  }
});