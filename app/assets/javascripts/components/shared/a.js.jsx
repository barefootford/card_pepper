var A = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    callbackAttribute: React.PropTypes.string,
    callbackAttributeId: React.PropTypes.number,
    additionalClasses: React.PropTypes.string,
    href: React.PropTypes.string,
    danger: React.PropTypes.bool,
  },

  onClickFunc: function() {
    if (_.isFunction(this.props.onClick)) {
      return this.props.onClick
    } else {
      return null
    }
  },

  style: function() {
    return this.props.danger ? {color: '#e74c3c'} : {}
  },

  render: function() {
    return(
      <a
        onClick={this.props.onClickFunc}
        className={ _.toString(this.props.additionalClasses) }
        style={this.style()}
        data-callback-attribute={_.toString(this.props.callbackAttribute)}
        data-callback-attribute-id={this.props.callbackAttributeId}
        href={this.props.href}
      >
        {this.props.text}
      </a>
    )
  }
});