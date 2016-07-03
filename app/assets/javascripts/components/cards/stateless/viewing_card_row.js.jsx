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
                onClick={this.props.editButtonOnClickCallback}
                text={this.props.editButtonText}
              />
            </div>
            <SubmittedByCol4
              id={card.user_id}
              name={card.user_name}
            />
          </div>
          <CardRowFlash flash={card.flash} />
        </td>
      </tr>
    )
  }
})