Decks.Show.TR.CardEdit.New = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object,
    handleCardChange: React.PropTypes.func.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool
  },

  saveText: function() {
    return this.props.saving ? 'Saving Card Edit...' : 'Save Card Edit'
  },

  render: function() {
    var card = this.props.card;

    return (
      <tr key={card.id}>
        <td>
          <div className='row'>
            <div className='col-md-12'>
              <CardRowQuestionAnswerFields
                card={this.props.card}
                handleEditCardChange={this.props.handleCardChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-8'>
              <XsBtn
                text={this.saveText()}
                onClick={this.props.handleChangeCardStatusClick}
                callbackAttribute='CREATE'
                callbackAttributeId={card.id}
                primary
              />
                <XsBtn
                  text='Cancel'
                  // hide this button if the new Card Edit is saving
                  hidden={this.props.saving ? true : false}
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='viewing'
                  callbackAttributeId={card.id}
                  additionalClasses='mhm'
                />
            </div>
            <div className='col-md-4' style={{textAlign: 'right'}}>
              <CardEditBy
                name={this.props.currentUser.name}
                id={this.props.currentUser.id}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <small>Saving this Card Edit will notify the deck's editor. Only the deck's editor can approve changes.</small>
            </div>
          </div>
        </td>
      </tr>
    )
  }
});
