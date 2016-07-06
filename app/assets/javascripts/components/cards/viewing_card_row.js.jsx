var ViewingCardRow = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    editButtonText: React.PropTypes.string.isRequired,
    submittedByStyle: React.PropTypes.object,
    editButtonOnClickCallback: React.PropTypes.func.isRequired
  },

  render: function() {
    var card = this.props.card;

    return(
      <tr key={card.question}>
        <td>
          {card.question}<br/><hr/>
          {card.answer}<br/><hr/>

          <div className='row'>
            <div className='col-md-8'>
              <XsBtn
                text={this.props.editButtonText}
                onClick={this.props.editButtonOnClickCallback}
                callbackAttribute='editing'
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
})