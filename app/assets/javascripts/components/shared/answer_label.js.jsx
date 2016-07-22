var AnswerLabel = React.createClass({
  propTypes: {
    // Appends optional 'no change' string for use when
    // showing whether a user is requesting a change.
    // example: PendingCardEdits Table
    noChange: React.PropTypes.bool
  },

  render: function() {
    if (this.props.noChange) {
      var text = 'answer (no change):';
    } else {
      var text = 'answer:';
    }

    return <QuietLabel text={text} />
  }
});