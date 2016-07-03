var XsBtn = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    // onClick isn't required so that we can change text
    // to say "saving..." without onClick consequences
    onClick: React.PropTypes.func,
    callbackAttribute: React.PropTypes.string,
    callbackAttributeId: React.PropTypes.number,
    additionalClasses: React.PropTypes.string,
    primary: React.PropTypes.bool,
    hidden: React.PropTypes.bool
  },

  style: function() {
    if (this.props.hidden === true) {
      return {
        display: 'none'
      }
    } else {
      return {}
    }
  },

  btnClass: function() {
    var addlClassesStr = _.toString(this.props.additionalClasses);

    if (this.props.primary) {
      return('btn btn-xs btn-primary ' + addlClassesStr)
    } else {
      return('btn btn-xs btn-default ' + addlClassesStr)
    }
  },

  render: function() {
    return(
      <button
        onClick={this.props.onClick}
        className={this.btnClass()}
        style={this.style()}
        data-callback-attribute={this.props.callbackAttribute}
        data-callback-attribute-id={this.props.callbackAttributeId}
      >
        {this.props.text}
      </button>
    )
  }
});