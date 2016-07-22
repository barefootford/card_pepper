Decks.Edit.PendingCardSuggestionsTable = React.createClass({
  propTypes: {
    handleApproveCardSuggestionClick: React.PropTypes.func.isRequired,
    handleDeclineCardSuggestionClick: React.PropTypes.func.isRequired,
    cardSuggestions: React.PropTypes.array.isRequired
  },

  pendingCardSuggestionRows: function() {
    var anyCardSuggestions = this.props.cardSuggestions.length > 0;
    var that = this;

    if (anyCardSuggestions) {
      return this.props.cardSuggestions.map(function(cs){
        return(
          <CardSuggestionRow
            key={"cardSuggestion" + cs.id}
            cs={cs}
            handleApproveCardSuggestionClick={that.props.handleApproveCardSuggestionClick}
            handleDeclineCardSuggestionClick={that.props.handleDeclineCardSuggestionClick}
          />
        )
      });
    } else {
      return <tr key='noCardSuggestions'>
        <td>No new cards to approve.</td>
      </tr>
    }
  },

  render: function() {
    return(
      <table className='table table-striped table-hover'>
        <tbody className='table table-striped table-hover'>
          <tr key={'tableHeaderKey'}>
            <th>Pending New Cards</th>
          </tr>
          { this.pendingCardSuggestionRows() }
        </tbody>
      </table>
    )
  }
});