var Dashboard = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    ownedDecks: React.PropTypes.array.isRequired,
    favoritedDecks: React.PropTypes.array.isRequired,
    favoritedDecksEditors: React.PropTypes.array.isRequired
  },

  render: function() {
    var currentUser = this.props.currentUser;
    var favoritedDecksEditors = this.props.favoritedDecksEditors;

    return (
      <div className='row'>
        <div className='col-md-6'>
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