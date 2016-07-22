var CardEditDiff = React.createClass({
  propTypes: {
    before: React.PropTypes.string.isRequired,
    after: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,

    // hide diffs when the user isn't asking for a change
    // For example, when a user wants to change the question, but not answer
    areChanges: React.PropTypes.bool.isRequired
  },

  divStyle: {
    marginBottom: '10px'
  },

  insertStyle: {
    backgroundColor: 'rgb(217,255,225)',
    color: 'black'
  },

  removeStyle: {
    // red background
    backgroundColor: 'rgb(255,226,227)',
    color: 'black'
  },

  labelForChange: function() {
    if (this.props.label === 'question') {
      return <QuestionLabel />
    } else if (this.props.label === 'answer') {
      return <AnswerLabel />
    } else {
      console.log("<CardEditDiff/>: unknown label type: " + this.props.label);
    }
  },

  labelForNoChange: function() {
    if (this.props.label === 'question') {
      return <QuestionLabel noChange={true} />
    } else if (this.props.label === 'answer') {
      return <AnswerLabel noChange={true} />
    } else {
      console.log("<CardEditDiff/>: unknown label type: " + this.props.label);
    }
  },

  render: function() {
    // if a user wants to change a card or a question, show a diff
    if (this.props.areChanges) {
      return (
        <div style={this.divStyle}>
          {this.labelForChange()}<br/>

          <div style={this.removeStyle}>{this.props.before}</div>
          <div style={this.insertStyle}>{this.props.after}</div>
        </div>
      )
    // Otherwise show the existing question.
    } else {
      return (
        <div style={this.divStyle}>
          {this.labelForNoChange()}<br/>
          <div>{this.props.before}</div>
        </div>
      )
    }
  }
});