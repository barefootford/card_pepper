var DecksEditTabs = React.createClass({
  propTypes: {
    activeComponent: React.PropTypes.string.isRequired,
    handleSwitchTab: React.PropTypes.func.isRequired,
    cardsCount: React.PropTypes.number.isRequired,
    cardSuggestionsCount: React.PropTypes.number.isRequired
  },

  render: function() {
    var style = {
      marginBottom: '-5px'
    };

    return (
      <div style={style} >
        <ul className="nav nav-tabs">
          <DeckTab
            text="New Card"
            callbackAttribute="New Card"
            active={this.props.activeComponent === "New Card"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
          <DeckTab
            text={ViewHelpers.pluralizeCard(this.props.cardsCount, true)}
            callbackAttribute="Card List"
            active={this.props.activeComponent === "Card List"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
          <DeckTab
            text="Community Suggestions"
            callbackAttribute="Community Suggestions"
            active={this.props.activeComponent === "Community Suggestions"}
            handleSwitchTab={this.props.handleSwitchTab}
            cardSuggestionsCount={this.props.cardSuggestionsCount}
          />
          <DeckTab
            text="Deck Settings"
            callbackAttribute="Deck Settings"
            active={this.props.activeComponent === "Deck Settings"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
        </ul>
      </div>
    )
  }
})