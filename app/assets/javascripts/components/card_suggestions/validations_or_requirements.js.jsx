var ValidationsOrRequirements = React.createClass({
  propTypes: {
    errors: React.PropTypes.array,
    // inputText is the text that is being shown in
    // the corresponding textarea or input field.
    inputText: React.PropTypes.string
  },

  render: function() {
      // if there are any server generated errors show those
    if (this.props.errors.length > 0) {
      return <ValidationErrors errors={this.props.errors} />
      // otherwise show gentle help
    } else {
      return (
        <CardRequirements
          errors={this.props.errors}
          inputText={this.props.inputText}
        />
      )
    }
  }
});