CardRow = React.createClass({
  getInitialState: function() {
    return({thinkingAboutDeleting: false})
  },
  handleCancelThinkingAboutDeletingClick: function() {
    this.setState({thinkingAboutDeleting: false});
  },
  render: function() {
    var editPencilStyle = {
      fontSize: '24px'
    };
    var textAreaStyle = {
      width: '100%'
    };

    var card = this.props.card;
    var that = this;

    // these could probably all be combined, then adding a field_type argumnet, eg;
    // 'question', 'answer', 'change_to_editing', 'change_to_not_editing'
    var handleEditCardClick = function(event) {
      that.props.handleEditCardClick(event, card.id)
    };
    var handleCancelEditClick = function(event) {
      that.props.handleCancelEditClick(event, card.id)
    };
    var handleEditCardQuestionChange = function(event) {
      that.props.handleEditCardChange(event, card.id, 'question')
    };
    var handleEditCardAnswerChange = function(event) {
      that.props.handleEditCardChange(event, card.id, 'answer')
    };
    var handleEditedCardSave = function() {
      that.props.handleEditedCardSave(card.id)
    };
    var handleDeleteCard = function() {
      that.props.handleDeleteCard(card)
    };
    var handleConsideringDeletingCardClick = function() {
      that.props.handleConsideringDeletingCardClick(card.id);
    };
    var handleCancelConsideringDeletingCardClick = function() {
      that.props.handleCancelConsideringDeletingCardClick(card.id);
    };


    // we should change it so card.status === "consideringDeleting" || "editing" || "none"
    if (card.consideringDeleting) {
      return(
        <tr key={card.question}>
          <td>
            {card.question}<br/><hr/>{card.answer}
          </td>
          <td>
            <span className='text-danger'>Really delete this card?</span>
          </td>
          <td>
            <span onClick={handleDeleteCard} className='btn btn-xs btn-danger mhm'>Delete Card</span>
            <span onClick={handleCancelConsideringDeletingCardClick} className='btn btn-xs btn-default mhm'>Cancel</span>
          </td>
        </tr>
      )
    } else if (card.editing) {
      return(
        <tr key={card.question}>
          <td>
            <small>Question:</small>
            <textarea className='form-control' style={textAreaStyle}
             onChange={handleEditCardQuestionChange}
             value={card.edited_question}/>
             <br/><hr/>
            <small>Answer:</small>
            <textarea className='form-control' style={textAreaStyle}
             onChange={handleEditCardAnswerChange}
             value={card.edited_answer}/>
          </td>
          <td>{card.user_name}</td>
          <td>
            <span onClick={handleCancelEditClick} className='btn btn-xs btn-default mhm'>Cancel</span>
            <span onClick={handleConsideringDeletingCardClick} className='btn btn-xs btn-default mhm'>Delete</span>
            <span onClick={handleEditedCardSave} className='btn btn-xs btn-primary mhm'>Save</span>
          </td>
        </tr>
      )
    } else {
    return(
      <tr key={card.question}>
        <td>{card.question}<br/><hr/>{card.answer}</td>
        <td>{card.user_name}</td>
        <td>
          <a style={editPencilStyle}
            className="glyphicon glyphicon-pencil text-primary"
            onClick={handleEditCardClick} cardID={card.id}
            aria-hidden="true"/>
        </td>
      </tr>
    )
    }
  }
});