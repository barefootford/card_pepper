CardRow = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    key: React.PropTypes.string,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleEditCardChange: React.PropTypes.func.isRequired,
  },

  QuestionAnswerFields: function() {
    return(
      <CardRowQuestionAnswerFields
        card={this.props.card}
        handleEditCardChange={this.props.handleEditCardChange}
      />
    )
  },

  render: function() {
    var card = this.props.card;
    var alignRight = {
      textAlign: 'right'
    };

    if (card.status === 'viewing') {
      return(
        <ViewingCardRow
          card={card}
          submittedByStyle={this.alignRight}
          editButtonText="edit card"
          editButtonOnClickCallback={this.props.handleChangeCardStatusClick}
        />
      )
    } else if (card.status === 'editing') {
      return(
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields()}
            <div className='row'>
              <div className='col-md-8'>
                <XsBtn
                  text='Save'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='saving'
                  callbackAttributeId={card.id}
                  primary
                />
                <XsBtn
                  text='Cancel'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='viewing'
                  callbackAttributeId={card.id}
                  additionalClasses='mhm'
                />
                <XsBtn
                  text='Delete'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='consideringDeleting'
                  callbackAttributeId={card.id}
                />
              </div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'saving') {
      return(
        <tr>
          <td>
            {this.QuestionAnswerFields()}

            <div className='row'>
              <div className='col-md-8'>
                <XsBtn
                  text='Saving...'
                  primary 
                />
              </div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'consideringDeleting') {
      return(
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields()}

            <div className='row'>
              <div className='col-md-8'>
                <XsBtn
                  text='Delete Card'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='DESTROY'
                  callbackAttributeId={card.id}
                  danger
                />
                <XsBtn
                  text='Cancel'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='editing'
                  callbackAttributeId={card.id}
                  additionalClasses='mhm'
                />
              </div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROY') {
      return (
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields()}
            <div className='row'>
              <div className='col-md-8'>
                  
                  <XsBtn
                    text='Deleting Card...'
                    danger
                  />
              </div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROYFAILED') {
      return (
        <tr key={card.question}>
          <td>
            <div className='row'>
              <div className='col-md-8'>
                {this.QuestionAnswerFields}
                <small>
                  We can't connect to delete this card. Double check that your Internet is working and
                  <A
                    text="try again"
                    onClick={this.props.handleChangeCardStatusClick}
                    callbackAttribute='DESTROY'
                    callbackAttributeId={card.id}
                    danger
                  />.
                </small>
                <XsBtn
                  text='Cancel'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='editing'
                  callbackAttributeId={card.id}
                />
                <XsBtn
                  text='Delete Card'
                  onClick={this.props.handleChangeCardStatusClick}
                  callbackAttribute='DESTROY'
                  callbackAttributeId={card.id}
                  danger
                />
              </div>
              <SubmittedByCol4 card={card} />
            </div>
          </td>
        </tr>
      )
    } else {
      return null
    }
  }
});