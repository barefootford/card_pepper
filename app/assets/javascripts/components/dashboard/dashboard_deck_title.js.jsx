var DashboardDeckTitle = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    deck: React.PropTypes.object.isRequired,
    deckEditor: React.PropTypes.object.isRequired
  },

  editOrViewDeckBtn: function() {
    var deck = this.props.deck;
    var deckEditorIsCurrentUser = deck.user_id === this.props.currentUser.id;

    if (deckEditorIsCurrentUser) {
      return <A
               text={'Edit'}
               additionalClasses='btn btn-xs btn-default mhm'
               href={deck.edit_deck_path}
             />
    } else {
      return <A
               text={'View'}
               additionalClasses='btn btn-xs btn-default mhm'
               href={deck.deck_path}
             />
    }
  },

  render: function() {
    var deck = this.props.deck;
    var deckEditor = this.props.deckEditor;
    var currentUser = this.props.currentUser

    var style = {
      marginTop: '1px',
      marginBottom: '-6px'
    };

    return (
      <div>
        <h4 style={style}>
          <a className='no-link-primary' href={deck.deck_path}>{deck.title}</a>
        </h4>
        <small>
          By{" "}
          <A
            text={deckEditor.name}
            href={deckEditor.profile_path}
          />
          {this.editOrViewDeckBtn()}
        </small>
      </div>
    )
  }
});