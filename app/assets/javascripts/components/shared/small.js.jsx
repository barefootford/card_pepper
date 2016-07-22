var Small = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  },

  style: function() {
    // grey text color
    var initialStyle = {color: '#7b8996'};

    if (typeof(this.props.style) === 'object') {
      var style = _.merge(initialStyle, this.props.style);
    } else {
      var style = initialStyle;
    }

    return style;
  },

  render: function() {
    return (
      <small style={this.style()}>
        {this.props.text}
      </small>
    )
  }
});