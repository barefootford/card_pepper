var DeleteDeckButtons = React.createClass({
  render: function() {
    var deleteDeckStyle = {
      marginTop: '5px'
    };

    if (this.props.deckUserConsideringDeleting === false) {
      return(
        <div
          onClick={this.props.handleDeckUserConsideringDeleting}
          className='btn btn-block btn-default'
        >
          Delete Deck
        </div>
      )
    } else {
      return(
        <div>
          <div
            onClick={this.props.handleDeckUserConsideringDeleting}
            className='btn btn-block btn-default'
            style={deleteDeckStyle}
          >
            Cancel
          </div>

          <a
            href={"/decks/" + this.props.deckID + "/destroy" }
            className='btn btn-block btn-danger'
            style={deleteDeckStyle}
          >
            Permanently Delete Deck
          </a>

          <ul className='col-md-12'>
            <li>This will permanently delete the deck.</li>
            <li>This will delete your own and community contributions.</li>
            <li>This is NOT reversible.</li>
          </ul>
        </div>
      )
    }
  }
})
