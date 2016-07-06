Decks.Show.TR.Card.Show = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    onRecommendChangeClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var card = this.props.card
    return(
      <tr key={card.id}>
        <td>
          {card.question}<br/><hr/>
          {card.answer}<br/><hr/>

          <div className='row'>
            <div className='col-md-8'>
              <XsBtn
                text='Recommend a change to this card'
                onClick={this.props.onRecommendChangeClick}
                callbackAttribute='new'
                callbackAttributeId={card.id}
              />
            </div>
            <SubmittedByCol4 card={card} />
          </div>
          <CardRowFlash flash={card.flash} />
        </td>
      </tr>
    )
  }
});
