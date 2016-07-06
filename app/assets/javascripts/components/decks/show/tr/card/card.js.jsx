Decks.Show.TR.Card = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleCardChange: React.PropTypes.func.isRequired
  },

  render: function() {
    var card = this.props.card;

    if (card.status === 'viewing') {
      return(
        <Decks.Show.TR.Card.Show
          card={card}
          onRecommendChangeClick={this.props.handleChangeCardStatusClick}
        />
      )
    } else if (card.status === 'new') {
      return(
        <Decks.Show.TR.CardEdit.New
          card={card}
          handleCardChange={this.props.handleCardChange}
          currentUser={this.props.currentUser}
          handleChangeCardStatusClick={this.props.handleChangeCardStatusClick}
        />
      )
    } else if (card.status === 'CREATE') {
      return (
        <Decks.Show.TR.CardEdit.New
          card={card}
          handleCardChange={doNothing}
          currentUser={this.props.currentUser}
          handleChangeCardStatusClick={doNothing}
          saving={true}
        />
      )
    } else if (card.status === 'CREATEFAILED') {
      return (
        <Decks.Show.TR.CardEdit.New
          card={card}
          handleCardChange={doNothing}
          currentUser={this.props.currentUser}
          handleChangeCardStatusClick={doNothing}
          saving={true}
        />
      )
    } else {
      return null
    }
  }
});