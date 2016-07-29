var XsBtn = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    // Pass in an empty anonymous function when you don't
    // want an onClick function. (ie: while 'saving')
    href: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    callbackAttribute: React.PropTypes.string,
    callbackAttributeId: React.PropTypes.number,
    additionalClasses: React.PropTypes.string,
    primary: React.PropTypes.bool,
    danger: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    disabled: React.PropTypes.bool
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

  btnClasses: function() {
    var disabledClass = this.props.disabled ? ' disabled ' : ''
    var addlClassesStr = _.toString(this.props.additionalClasses + disabledClass);

    if (this.props.primary) {
      return('btn btn-xs btn-primary ' + addlClassesStr)
    } else if (this.props.danger) {
      return('btn btn-xs btn-danger ' + addlClassesStr)
    } else {
      return('btn btn-xs btn-default ' + addlClassesStr)
    }
  },

  render: function() {
    if (this.props.href && this.props.href.length > 0) {
      return (
        <a
          href={this.props.href}
          className={this.btnClasses()}
          style={this.style()}
          data-callback-attribute={this.props.callbackAttribute}
          data-callback-attribute-id={this.props.callbackAttributeId}
        >
          {this.props.text}
        </a>
      )
    } else {
      return (
        <span
          onClick={this.props.onClick}
          className={this.btnClasses()}
          style={this.style()}
          data-callback-attribute={this.props.callbackAttribute}
          data-callback-attribute-id={this.props.callbackAttributeId}
        >
          {this.props.text}
        </span>
      )
    }
  }
});