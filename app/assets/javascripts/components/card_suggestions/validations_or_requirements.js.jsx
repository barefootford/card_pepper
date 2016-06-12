var ValidationsOrRequirements = React.createClass({
  render: function() {
    // if there are any server generated errors show those
    if (this.props.errors.length > 0) {
      return(<ValidationErrors errors={this.props.errors} />)
    } else {
    // otherwise show gentle help
      var style = { color: '#7b8996' };
      var textLength = this.props.text.length;

      if (textLength === 0) {
        return <small style={style}>1 character minimum</small>
      } else if (textLength > 100) {
        return <small style={style}>140 character maximum. Current: {textLength}</small>
      } else {
        return null
      }
    }
  }
});