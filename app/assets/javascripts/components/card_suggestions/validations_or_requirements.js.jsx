var ValidationsOrRequirements = React.createClass({
  propTypes: {
    errors: React.PropTypes.array,
    text: React.PropTypes.string
  },

  render: function() {
    // if there are any server generated errors show those
    if (this.props.errors.length > 0) {
      return(<ValidationErrors errors={this.props.errors} />)
    } else {
    // otherwise show gentle help
      var style = { color: '#7b8996' };
      var text = this.props.text;

      if (text.length === 0) {
        return <div><small style={style}>1 character minimum</small></div>
      } else if (_.trim(text).length === 0) {
        return <div><small style={style}>can't be blank</small></div>
      } else if (text.length > 100) {
        return <div><small style={style}>140 character maximum. Current: {text.length}</small></div>
      } else {
        return <div>&nbsp;</div>
      }
    }
  }
});