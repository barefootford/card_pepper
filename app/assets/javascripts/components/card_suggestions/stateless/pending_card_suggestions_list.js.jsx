var PendingCardSuggestionsList = React.createClass({
  propTypes: {
    handleApproveCardSuggestionClick: React.PropTypes.func.isRequired,
    handleDeclineCardSuggestionClick: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool.isRequired,
    cardSuggestions: React.PropTypes.array.isRequired
  },

  render: function() {
    var handleApproveCardSuggestionClick = this.props.handleApproveCardSuggestionClick;
    var handleDeclineCardSuggestionClick = this.props.handleDeclineCardSuggestionClick;

    if (this.props.active) {
      if (this.props.cardSuggestions.length > 0) {
        var cardSuggestions = this.props.cardSuggestions.map(function(cs){
          return(
            <CardSuggestionRow
              key={"cardSuggestion" + cs.id}
              cs={cs}
              handleApproveCardSuggestionClick={handleApproveCardSuggestionClick}
              handleDeclineCardSuggestionClick={handleDeclineCardSuggestionClick}
            />
          )
        });
      } else {
        var cardSuggestions = <tr key='noCardSuggestions'><td>No card suggestions to approve.</td></tr>;
      }
      return(
        <div>
          <h5>New Card Suggestions:</h5>
          <small>These are flashcards that Card Pepper members think you should add to the deck. </small> <span>Got it.</span>
          <table className='table table-striped table-hover'>
            <tbody className='table table-striped table-hover'>
              <tr key={'tableHeaderKey'}>
                <th>Question & Answer</th>
              </tr>
              { cardSuggestions }
            </tbody>
          </table>
        </div>
      )
    } else {
      return null
    }
  }
});