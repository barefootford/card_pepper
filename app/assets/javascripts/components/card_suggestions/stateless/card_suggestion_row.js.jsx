var CardSuggestionRow = React.createClass({
  render: function() {
    var cs = this.props.cs;
    var that = this;

    var handleApproveCardSuggestionClick = function() {
      that.props.handleApproveCardSuggestionClick(cs);
    };

    var handleDeclineCardSuggestionClick = function() {
      that.props.handleDeclineCardSuggestionClick(cs);
    };

    return (
      <tr key={"CardSuggestion:" + cs.id}>
        <td>
          {cs.question} <br/>
          <hr/>
          {cs.answer}
          <hr/>
          <div className='row'>
            <div className='col-md-9'>
              <a
                onClick={handleApproveCardSuggestionClick}
                className="btn btn-xs btn-primary"
              >
                Approve
              </a>
              <a
                onClick={handleDeclineCardSuggestionClick}
                className="btn btn-xs btn-default mhm"
              >
                Decline
              </a>
            </div>
            <div className='col-md-3'>
              <SubmittedBy name={cs.username} id={cs.userID} />
            </div>
          </div>
        </td>
      </tr>
    )
  }
})