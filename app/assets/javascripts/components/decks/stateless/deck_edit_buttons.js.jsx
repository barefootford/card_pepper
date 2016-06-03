var DeckEditButtons = React.createClass({
  render: function() {
    var style = {
      marginBottom: '10px'
    };

    return (
      <div style={style} >
        <DeckEditButton
          text="New Card"
          active={this.props.activeComponent === "New Card"}
          handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
        />
        <DeckEditButton
          text="Card List"
          active={this.props.activeComponent === "Card List"}
          handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
        />
        <DeckEditButton
          text="Card Suggestions"
          active={this.props.activeComponent === "Card Suggestions"}
          handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
          cardSuggestionsCount={this.props.cardSuggestionsCount}
        />
        <DeckEditButton
          text="Deck Settings"
          active={this.props.activeComponent === "Deck Settings"}
          handleDeckEditButtonClick={this.props.handleDeckEditButtonClick}
        />
      </div>
    )
  }
})