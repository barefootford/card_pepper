var TextArea = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    defaultText: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired, // while saving pass in doNothing()
    callbackAttribute: React.PropTypes.string,
    callbackAttributeID: React.PropTypes.number
  },

  style: {
    marginBottom: '10px'
  },

  render: function() {
    var text = _.toString(this.props.text);
    var defaultText = _.toString(this.props.defaultText);

    return(
      <textarea
        defaultValue={text.length > 0 ? text : defaultText}
        onChange={this.props.onChange}
        className='form-control'
        style={this.style}
        // rows={this.props.rows}
        data-callback-attribute={this.props.callbackAttribute}
        data-callback-attribute-id={this.props.callbackAttributeID}
      />
    )
  }
});