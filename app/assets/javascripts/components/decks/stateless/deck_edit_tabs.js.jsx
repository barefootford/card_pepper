var DeckEditTabs = React.createClass({
  render: function() {
    var style = {
      marginBottom: '10px'
    };

    return (
      <div style={style} >
        <ul className="nav nav-tabs">
          <DeckEditTab
            text="New Card"
            active={this.props.activeComponent === "New Card"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
          <DeckEditTab
            text="Card List"
            active={this.props.activeComponent === "Card List"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
          <DeckEditTab
            text="Card Suggestions"
            active={this.props.activeComponent === "Card Suggestions"}
            handleSwitchTab={this.props.handleSwitchTab}
            cardSuggestionsCount={this.props.cardSuggestionsCount}
          />
          <DeckEditTab
            text="Deck Settings"
            active={this.props.activeComponent === "Deck Settings"}
            handleSwitchTab={this.props.handleSwitchTab}
          />
        </ul>
      </div>
    )
  }
})