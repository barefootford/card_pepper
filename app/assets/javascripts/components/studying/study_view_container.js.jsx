var StudyViewContainer = React.createClass({
  getInitialState: function() {
    return({
      card: this.props.initialCard,
      userCard: this.props.initialUserCard,
      studySessionId: this.props.initialStudySessionId,
      sessionComplete: false,
      deckSubscriptionId: this.props.initialDeckSubscriptionId
    })
  },
  getURL: function() {
    return (
      '/deck_subscriptions/' + this.state.deckSubscriptionId +
      '/study_sessions/' + this.state.studySessionId
    )
  },
  handleNewCard: function(data) {
    if (data.status === 'complete') {
      this.setState({sessionComplete: true});
    } else {
      this.setState({
        card: data.card,
        userCard: data.userCard,
        studySessionId: data.studySessionId,
        deckSubscriptionId: data.deckSubscriptionId})
    }
  },
  handleCardResponses: function(response) {
    $.ajax(
      { url: this.getURL(),
        type:'PATCH',
        data: {user_response: response, user_card_id: this.state.userCard.id },
        dataType: 'json',
        error: function(data) {
          console.log('Error: ');
          console.log(data);
        },
        success: function(data) {
          this.handleNewCard(data);
        }.bind(this),
    });
  },
  render: function() {
    if (this.state.sessionComplete) {
      return(
        <div>
          <h3>Study session complete.</h3>
          <p>
            <a href='/dashboard' className='btn btn-primary'>Dashboard</a>
          </p>
        </div>
      )
    } else {
      return (
        <CardView key={this.state.userCard.updated_at} card={this.state.card}
          handleResponses={this.handleCardResponses} />
      )
    }
  }
});