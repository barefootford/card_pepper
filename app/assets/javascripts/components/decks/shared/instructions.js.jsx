var DeckInstructions = React.createClass({
  propTypes: {
    instructions: React.PropTypes.string.isRequired
  },

  render: function() {
    return(
      <div>
        <QuietLabel text='Deck Instructions' />
        <p>
        {this.props.instructions}
        </p>
      </div>
    )
  }
});