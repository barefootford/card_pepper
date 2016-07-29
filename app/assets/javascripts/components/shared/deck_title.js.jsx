var DeckTitle = React.createClass({
  propTypes: {
    deck: React.PropTypes.object.isRequired,
    deckEditor: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    cards: React.PropTypes.array.isRequired,
    currentPage: React.PropTypes.string.isRequired,
    createDeckFavorite: React.PropTypes.func,
    destroyDeckFavorite: React.PropTypes.func
  },

  editLink: function() {
    var currentUser = this.props.currentUser;
    var deckEditor = this.props.deckEditor;
    var deckEditorIsCurrentUser = deckEditor.id === currentUser.id;
    var deck = this.props.deck;

    if (deckEditorIsCurrentUser && (this.props.currentPage === 'show')) {
      return(
        <span>
          <XsBtn
            text='edit deck'
            primary
            href={deck.edit_deck_path}
            onClick={doNothing}
          />
        </span>
      )
    } else if (deckEditorIsCurrentUser && this.props.currentPage === 'edit'){
      return (
        <span>
          <XsBtn
            text='view deck'
            primary
            href={deck.deck_path}
            onClick={doNothing}
          />
        </span>
      )
    } else {
      return null
    }
  },

  render: function() {
    var deck = this.props.deck;
    var deckEditor = this.props.deckEditor;
    var currentUser = this.props.currentUser;
    var cards = this.props.cards;
    var currentPage = this.props.currentPage;

    var headStyle = {
      marginBottom: '-4px'
    };

    var cardCountString = ViewHelpers.pluralizeCard(cards.length);
    var contributionCount = ViewHelpers.communityContributionsCount(cards, deckEditor.id);
    var contributionString = ViewHelpers.pluralizeContrib(contributionCount);

    return (
      <div>
        <h3 style={headStyle}>{deck.title}</h3>
        <small>
          by <a href={deckEditor.profilePath}>{deckEditor.name}</a>
          {' | ' + cardCountString}
          {' | ' + contributionString }
          <DeckFavBtn
            deck={deck}
            currentUser={currentUser}
            createDeckFavorite={this.props.createDeckFavorite}
            destroyDeckFavorite={this.props.destroyDeckFavorite}
          />
          { this.editLink() }
        </small>
        <hr/>
      </div>
    )
  }
});