Decks.Show.TR.Card = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleCardChange: React.PropTypes.func.isRequired,
    deckEditorIsCurrentUser: React.PropTypes.bool
  },

  render: function() {
    var card = this.props.card;
    var deckEditorIsCurrentUser = this.props.deckEditorIsCurrentUser;

    // Same as 'viewing', but do not display "Recommend a change" buttons
    if (card.status === 'viewing' && deckEditorIsCurrentUser) {
      return(
        <tr key={card.id}>
          <td>
            <QuestionLabel />
            <br/>
            {card.question}<br/><hr/>

            <AnswerLabel />
            <br/>
            {card.answer}<br/>

            <div className='row'>
              <div className='col-md-8'></div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'viewing') {
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
          saving
        />
      )
    } else if (card.status === 'CREATEFAILED') {
      return (
        <Decks.Show.TR.CardEdit.New
          card={card}
          handleCardChange={doNothing}
          currentUser={this.props.currentUser}
          handleChangeCardStatusClick={doNothing}
          saving
        />
      )
    } else {
      return null
    }
  }
});