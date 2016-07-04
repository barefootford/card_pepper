CardRow = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    handleChangeCardStatusClick: React.PropTypes.func.isRequired,
    handleEditCardChange: React.PropTypes.func.isRequired,
  },

  handleSetCardStatusToViewing: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'viewing');
  },
  handleSetCardStatusToEditing: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'editing');
  },
  handleSetCardStatusToSaving: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'saving');
  },
  handleSetCardStatusToConsideringDeleting: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'consideringDeleting');
  },
  handleSetCardStatusToDESTROY: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'DESTROY');
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
    var that = this;
    var alignRight = {
      textAlign: 'right'
    };


    if (card.status === 'viewing') {
      return(
        <tr key={card.question}>
          <td>
            {card.question}<br/><hr/>
            {card.answer}<br/><hr/>
            
            <div className='row'>
              <div className='col-md-8'>
                <span
                  onClick={this.handleSetCardStatusToEditing}
                  className='btn btn-xs btn-default'
                >
                  Edit
                </span>
              </div>
              <div className='col-md-4' style={alignRight}>
                <SubmittedBy
                  id={card.user_id}
                  name={card.user_name}
                />
              </div>
            </div>
            <CardRowFlash flash={card.flash} />
          </td>
        </tr>
      )
    } else if (card.status === 'editing') {
      return(
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields()}

            <div className='row'>
              <div className='col-md-8'>
                <span 
                  onClick={this.handleSetCardStatusToSaving}
                  className='btn btn-xs btn-primary'
                >
                  Save
                </span>
                <span
                  onClick={this.handleSetCardStatusToViewing}
                  className='btn btn-xs btn-default mhm'
                >
                  Cancel
                </span>
                <span
                  onClick={this.handleSetCardStatusToConsideringDeleting}
                  className='btn btn-xs btn-default'
                >
                  Delete
                </span>
              </div>
              <div className='col-md-4' style={alignRight}>
                <SubmittedBy 
                  id={card.user_id}
                  name={card.user_name}
                />
              </div>
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
                <span className='btn btn-xs btn-default'>Saving...</span>
              </div>
              <div className='col-md-4' style={alignRight}>
                <SubmittedBy
                  id={card.user_id}
                  name={card.user_name}
                />
              </div>
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
                <span onClick={this.handleSetCardStatusToDESTROY} className='btn btn-xs btn-danger'>Delete Card</span>
                <span onClick={this.handleSetCardStatusToEditing} className='btn btn-xs btn-default mhm'>Cancel</span>
              </div>
              <div className='col-md-4' style={alignRight}>
                <SubmittedBy
                  id={card.user_id}
                  name={card.user_name}
                />
              </div>
            </div>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROY') {
      return (
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields()}
            <span
              className='btn btn-xs btn-danger'
            >
              Deleting Card...
            </span>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROYFAILED') {
      return (
        <tr key={card.question}>
          <td>
            {this.QuestionAnswerFields}
            <div>
              <small>We can't connect to delete this card. Double check that your Internet is working and try again.</small>
            </div>
            <span
              onClick={this.handleSetCardStatusToDESTROY}
              className='btn btn-xs btn-danger'
            >
              Delete Card
            </span>
            <span
              onClick={this.handleSetCardStatusToEditing}
              className='btn btn-xs btn-default mhm'
            >
              Cancel
            </span>
          </td>
        </tr>
      )
    } else {
      return null
    }
  }
});