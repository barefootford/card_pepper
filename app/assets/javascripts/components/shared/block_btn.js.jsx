var BlockBtn = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    href: React.PropTypes.string.isRequired,
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
    var href = this.props.href;
    var hrefPresent = href && href.length > 0;

    if (hrefPresent) {
      return (
        <a
          style={this.style}
          className={'btn btn-block ' + this.btnColor()}
          href={href}
        >
          {this.props.text}
        </a>
      )
    } else {
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
  }
});