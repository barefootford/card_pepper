Decks.Show.PendingCardSuggestionsTable = React.createClass({
  propTypes: {
    cardSuggestions: React.PropTypes.array.isRequired,
    active: React.PropTypes.bool.isRequired
  },

  render: function() {
    var cardSuggestionsCount = _.toInteger(this.props.cardSuggestions.length);
    var noCardSuggestions = cardSuggestionsCount < 1

    if (this.props.active === false) {
      return null
    } else if (this.props.active && noCardSuggestions) {
      return (
        <table className='table table-striped table-hover'>
          <tbody className='table table-striped table-hover'>
            <tr key='noCardSuggestions'>
              <td>No pending new cards</td>
            </tr>
          </tbody>
        </table>
      )
    } else {
      return (
        <table className='table table-striped table-hover'>
          <tbody className='table table-striped table-hover'>
            {
              this.props.cardSuggestions.map(function(cs){
                return <tr key={"CardSuggestion:" + cs.id}>
                  <td>
                    <QuestionLabel />
                    <br/>
                    {cs.question}<br/><hr/>

                    <AnswerLabel />
                    <br/>
                    {cs.answer}<br/>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      )
    }
  }
});