var CommunitySuggestionsList = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    cardSuggestions: React.PropTypes.array.isRequired,
    cards: React.PropTypes.array.isRequired,
    cardEdits: React.PropTypes.array.isRequired,

    handleChangePendingEditorReply: React.PropTypes.func.isRequired,
    handleChangeCardEditStatus: React.PropTypes.func.isRequired,
    handleApproveCardSuggestionClick: React.PropTypes.func.isRequired,
    handleDeclineCardSuggestionClick: React.PropTypes.func.isRequired
  },

  render: function() {
    if (this.props.active) {
      return (
        <div>
          <Decks.Edit.PendingCardSuggestionsTable
            cardSuggestions={this.props.cardSuggestions}
            cards={this.props.cards}

            handleApproveCardSuggestionClick={this.props.handleApproveCardSuggestionClick}
            handleDeclineCardSuggestionClick={this.props.handleDeclineCardSuggestionClick}
          />

          <Decks.Edit.PendingCardEditsTable
            cardEdits={this.props.cardEdits}
            cards={this.props.cards}

            handleChangePendingEditorReply={this.props.handleChangePendingEditorReply}
            handleChangeCardEditStatus={this.props.handleChangeCardEditStatus}
          />
        </div>
      )
    } else {
      return null
    }
  }
});