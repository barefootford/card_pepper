var Heart = React.createClass({
  propTypes: {
    status: React.PropTypes.string
  },

  heartColor: function() {
    if (this.props.status === 'pending') {
      return 'rgba(231,76,43,0.5)'
      // 'quiet pink'
    } else if (this.props.status === 'like') {
      return '#e74c3c'
      // red
    } else {
      return '#bdc3c7'
      // grey
    }
  },

  render: function() {
    var style = {
      fontSize: '26px',
      color: this.heartColor()
    };

    return(
      <span
        style={style}
        className="fui-heart mhm"
      />
    )
  }
});