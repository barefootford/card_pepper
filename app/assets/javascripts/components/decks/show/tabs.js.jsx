Decks.Show.Tabs = React.createClass({
  propTypes: {
    activeComponent: React.PropTypes.string.isRequired,
    handleSwitchTab: React.PropTypes.func.isRequired,
    cardSuggestions: React.PropTypes.array.isRequired,
    cards: React.PropTypes.array.isRequired,
    cardEdits: React.PropTypes.array.isRequired
  },

  render: function() {
    var style = {
      marginBottom: '10px'
    };

    return (
      <div style={style} >
        <ul className="nav nav-tabs">
          <DeckTab
            text="Card List"
            active={this.props.activeComponent === "Card List"}
            handleSwitchTab={this.props.handleSwitchTab}
            callbackAttribute="Card List"
          />
          <DeckTab
            text="New Card Suggestions"
            active={this.props.activeComponent === "New Card Suggestions"}
            handleSwitchTab={this.props.handleSwitchTab}
            cardSuggestionsCount={this.props.cardSuggestionsCount}
            callbackAttribute="New Card Suggestions"
          />
          <DeckTab
            text="Card Edits"
            active={this.props.activeComponent === "Card Edits"}
            handleSwitchTab={this.props.handleSwitchTab}
            callbackAttribute="Card Edits"
          />
        </ul>
      </div>
    )
  }
})