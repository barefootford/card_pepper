var DecksEditTabs = React.createClass({
  render: function() {
    var style = {
      marginBottom: '10px'
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
            text="Card List"
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