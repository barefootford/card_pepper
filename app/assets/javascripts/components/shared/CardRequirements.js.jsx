var CardRequirements = React.createClass({
  propTypes: {
    inputText: React.PropTypes.string.isRequired
  },

  render: function() {
    var style = {
      color: '#7b8996' 
    };
    var text = this.props.inputText;

    if (text.length === 0) {
      return (<small style={style}>1 character minimum</small>)
    } else if (_.trim(text).length === 0) {
      return (<small style={style}>can't be blank</small>)
    } else if (text.length> 100) {
      return (<small style={style} >140 character maximum. Current: {text.length}</small>)
    } else {
      return (<small style={style}>&nbsp;</small>)
    }
  }
})



