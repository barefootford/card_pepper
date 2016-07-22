Decks.Show.CardEditsTable = React.createClass({
  propTypes: {
    cards: React.PropTypes.array.isRequired,
    cardEdits: React.PropTypes.array.isRequired
  },

  render: function() {
    var that = this;
    if (this.props.active) {
      return (
        <table className='table table-striped'>
          <tbody>
            { this.props.cardEdits.map(function(ce) {
              var savedCard = _.find(that.props.cards, {id: ce.card_id});

              return(
                <tr key={ce.id + 'diff'}>
                  <td>
                    <CardEditDiff
                      areChanges={ce.question !== savedCard.question }
                      key={ce.id + 'q'}
                      before={savedCard.question}
                      after={ce.question}
                      label={'question'}
                    />

                    <CardEditDiff
                      areChanges={ce.answer !== savedCard.answer }
                      key={ce.id + 'a'}
                      before={savedCard.answer}
                      after={ce.answer}
                      label={'answer'}
                    />

                    <CardEditReason reason={ce.reason}/>

                    <div className='row'>
                      <div className='col-md-8'>
                        {/* */}
                      </div>
                      <div className='col-md-4' style={{textAlign: 'right'}}>
                        <SubmittedBy
                          id={ce.user_id}
                          name={ce.name}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    } else {
      return null
    }
  }
})