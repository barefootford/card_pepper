var CardSuggestionsList = React.createClass({
  render: function() {
    var handleApproveCardSuggestionClick = this.props.handleApproveCardSuggestionClick;
    var handleDeclineCardSuggestionClick = this.props.handleDeclineCardSuggestionClick;

    if (this.props.active) {
      if (this.props.cardSuggestions.length > 0) {
        var cards = this.props.cardSuggestions.map(function(cs){
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
        var cards = <tr key='noCardSuggestions'><td>No card suggestions to approve.</td></tr>;
      }

      return(
        <div id='CardSuggestionsListTable'>
          <table className='table table-striped'>
            <tbody>
                <tr key={"CardSuggestionsListHeaderTR"}>
                  <th>Question & Answer</th>
                </tr>
                { cards }
            </tbody>
          </table>
        </div>
      )
    } else {
      return null
    }
  }
});