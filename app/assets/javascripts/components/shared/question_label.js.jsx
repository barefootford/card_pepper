var QuestionLabel = React.createClass({
  propTypes: {
    // Appends optional '(no change):' string for use when
    // showing whether a user is requesting a change in a diff.
    // example: PendingCardEdits Table
    noChange: React.PropTypes.bool
  },

  render: function() {
    if (this.props.noChange) {
      var text = 'question (no change):';
    } else {
      var text = 'question:';
    }

    return <QuietLabel text={text} />
  }
});