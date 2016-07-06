var XsBtn = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    // Pass in an empty anonymous function when you don't
    // want an onClick function. (ie: while 'saving')
    onClick: React.PropTypes.func.isRequired,
    callbackAttribute: React.PropTypes.string,
    callbackAttributeId: React.PropTypes.number,
    additionalClasses: React.PropTypes.string,
    primary: React.PropTypes.bool,
    danger: React.PropTypes.bool,
    hidden: React.PropTypes.bool
  },

  style: function() {
    if (this.props.hidden) {
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
    } else if (this.props.danger) {
      return('btn btn-xs btn-danger ' + addlClassesStr)
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