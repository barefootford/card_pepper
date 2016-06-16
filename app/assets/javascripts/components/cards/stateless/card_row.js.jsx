CardRow = React.createClass({
  propTypes: {
    card: React.PropTypes.object,
    key: React.PropTypes.string,
    handleChangeCardStatusClick: React.PropTypes.func,
    handleEditCardChange: React.PropTypes.func,
    handleEditedCardSave: React.PropTypes.func
  },

  handleSetCardStatusToViewing: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'viewing');
  },
  handleSetCardStatusToEditing: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'editing');
  },
  handleSetCardStatusToConsideringDeleting: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'consideringDeleting');
  },
  handleSetCardStatusToDESTROY: function () {
    this.props.handleChangeCardStatusClick(this.props.card, 'DESTROY');
  },

  handleEditCardQuestionChange: function(event) {
    this.props.handleEditCardChange(event, this.props.card, 'question');
  },
  handleEditCardAnswerChange: function(event) {
    this.props.handleEditCardChange(event, this.props.card, 'answer');
  },

  render: function() {
    var card = this.props.card;
    var that = this;

    var editPencilStyle = {
      fontSize: '24px'
    };
    var textAreaStyle = {
      width: '100%'
    };

    if (card.status === 'viewing') {
      return(
        <tr key={card.question}>
          <td>{card.question}<br/><hr/>
            {card.answer}<br/><hr/>
            <SubmittedBy 
              id={card.id}
              name={card.user_name}
            />
            <a style={editPencilStyle}
              className="glyphicon glyphicon-pencil text-primary"
              onClick={this.handleSetCardStatusToEditing} cardID={card.id}
              aria-hidden="true"
            />
          </td>
        </tr>
      )
    } else if (card.status === 'editing') {
      return(
        <tr key={card.question}>
          <td>
            <small>Question:</small>
            <textarea
              className='form-control'
              style={textAreaStyle}
              onChange={this.handleEditCardQuestionChange}
              value={card.edited_question}
            />
            <br/><hr/>

            <small>Answer:</small>
            <textarea
              className='form-control'
              style={textAreaStyle}
              onChange={this.handleEditCardAnswerChange}
              value={card.edited_answer}
            />
            <SubmittedBy
              id={card.id}
              name={card.user_name}
            />

            <span
              onClick={this.handleSetCardStatusToViewing}
              className='btn btn-xs btn-default mhm'
            >
              Cancel
            </span>
            <span
              onClick={this.handleSetCardStatusToConsideringDeleting}
              className='btn btn-xs btn-default mhm'
            >
              Delete
            </span>
            <span 
              onClick={this.props.handleEditedCardSave}
              className='btn btn-xs btn-primary mhm'
            >
              Save
            </span>
          </td>
        </tr>
      )
    } else if (card.status === 'consideringDeleting') {
      var divStyle = { marginBottom: '10px' };
      return(
        <tr key={card.question}>
          <td>
            {card.question}<br/><hr/>
            {card.answer}<br/><hr/>
            <div style={divStyle}>
              <small className='text-danger'>Do you really want to delete this card?</small>
            </div>
            <span onClick={this.handleSetCardStatusToDESTROY} className='btn btn-xs btn-danger mhm'>Delete Card</span>
            <span onClick={this.handleSetCardStatusToEditing} className='btn btn-xs btn-default mhm'>Cancel</span>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROY') {
      return (
        <tr key={card.question}>
          <td>
            {card.question}<br/><hr/>
            {card.answer}<br/><hr/>
            <span className='text-danger'>Deleting...</span>
          </td>
        </tr>
      )
    } else if (card.status === 'DESTROYFAILED') {
      return (
        <tr key={card.question}>
          <td>
            {card.question}<br/><hr/>
            {card.answer}<br/><hr/>
            <div>
              <small>We can't connect to delete this card. Double check that your Internet is working or refresh the page.</small>
            </div>
            <span className='text-danger'>
              Do you really want to delete this card?
            </span>
            <span
              onClick={this.handleSetCardStatusToDESTROY}
              className='btn btn-xs btn-danger mhm'
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
    }
  }
});