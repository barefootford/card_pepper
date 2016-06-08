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
            handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
          />
          <DeckEditTab
            text="Card List"
            active={this.props.activeComponent === "Card List"}
            handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
          />
          <DeckEditTab
            text="Card Suggestions"
            active={this.props.activeComponent === "Card Suggestions"}
            handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
            cardSuggestionsCount={this.props.cardSuggestionsCount}
          />
          <DeckEditTab
            text="Deck Settings"
            active={this.props.activeComponent === "Deck Settings"}
            handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
          />
        </ul>
      </div>
    )
  }
})