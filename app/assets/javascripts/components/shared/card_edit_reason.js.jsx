var CardEditReason = React.createClass({
  propTypes: {
    reason: React.PropTypes.string.isRequired
  },

  render: function() {
    var reason = _.toString(this.props.reason);
    
    if (reason.length > 0) {
      return (
        <div>
          <QuietLabel text='reason:' /><br/>
          {this.props.reason}<br/><hr/>
        </div>
      )
    } else {
      return null
    }
  }
});
