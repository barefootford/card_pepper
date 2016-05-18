var DeckEditButtons = React.createClass({
  render: function() {
    var componentSelectorStyle = {
      marginBottom: '20px'
    }

    return (
      <div>
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
        />
      </div>
    )
  }
})