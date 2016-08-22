var DashboardView = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    ownedDecks: React.PropTypes.array.isRequired,
    favoritedDecks: React.PropTypes.array.isRequired,
    favoritedDecksEditors: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      currentUser: this.props.currentUser
    }
  },

  handleUserSawWelcomeMessage: function(event) {
    event.preventDefault()

    var updatedCurrentUser = this.state.currentUser;
    updatedCurrentUser.userSawWelcomeMessage = true
    this.setState({currentUser: updatedCurrentUser});
    // some ajax to actually update it on the server.
    $.ajax({
      url: '/users/' + this.props.currentUser.id,
      method: 'PATCH',
      data: {
        user: {
          user_saw_welcome_message: true
        }
      },
      dataType: 'json',
      success: function(response) {
        console.log("Yes! The internet is working.")
        // We anticipate this working so we change the client
        // attribute, currentUser.userSawWelcomeMessage,
        // before sending the request.
      }.bind(this)
    })
  },

  render: function() {
    var currentUser = this.state.currentUser;
    var favoritedDecksEditors = this.props.favoritedDecksEditors;

    return (
      <div className='row'>
        <div className='col-md-6'>
          <Welcome
            userSawWelcomeMessage={currentUser.userSawWelcomeMessage}
            handleUserSawWelcomeMessage={this.handleUserSawWelcomeMessage}
          />
          <h3>Dashboard</h3>
          <hr/>
          <OwnedDecks
            currentUser={currentUser}
            ownedDecks={this.props.ownedDecks}
          />
          <br/>
          <FavoritedDecks
            currentUser={currentUser}
            favoritedDecks={this.props.favoritedDecks}
            favoritedDecksEditors={favoritedDecksEditors}
          />
        </div>
      </div>
    )
  }
});