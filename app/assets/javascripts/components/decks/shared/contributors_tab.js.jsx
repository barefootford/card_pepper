Decks.ContributorsRow = React.createClass({
  message: function (created, edited) {
    var summation = ''
    edited = edited || ''
    created = created || ''
    if (created) {
      if (created === 1) {
        created = '1 New Card'
      } else {
        created += ' New Cards'
      }
    }
    summation += created;
    if (edited) {
      if (edited === 1) {
        edited = '1 Card Edit'
      } else {
        edited += ' Card Edits'
      }
    }
    if (edited) {
      summation += ', ' + edited
    }
    return summation
  },

  render: function () {
    var user = this.props.user;
    return (
      <tr>
        <td>
          <A text={user.name} href={user.url} />
          <span> - {this.message(user.created, user.edited)}</span>
        </td>
      </tr>
    )
  }
});

Decks.ContributorsTab = React.createClass({
  propTypes: {
    active: React.PropTypes.bool.isRequired,
    deckId: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      ajaxStatus: '',
      contributors: []
      // {
      //   name: 'Andrew',
      //   url: '/users/1',
      //   edited: 0,
      //   created: 5
      // }
    }
  },

  componentWillReceiveProps: function(nextProps){
    if (nextProps.active && this.state.ajaxStatus === '') {
      this.setState({ajaxStatus: 'requesting'});
      $.ajax({
        url: '/deck_contributors/' + this.props.deckId,
        success: function(response) {
          this.setState({contributors: response, ajaxStatus:'responseReceived'})
        }.bind(this),
        errors: function(response) {
          console.log(response)
          this.setState({ajaxStatus: 'error'})
        }.bind(this)
      })
    }
  },

  render: function() {
    var active = this.props.active;
    var ajaxStatus = this.state.ajaxStatus;
    var contributors = this.state.contributors;
    if (active === false) {
      return null
    }
    if ((ajaxStatus === 'requesting') || (ajaxStatus === '')) {
      return <QuietLabel text="loading..." />
    }
    if (!contributors.length) {
      return <div>No contributors yet.</div>
    }
    return (
      <table className='table table-striped'>
        <tbody>
          {contributors.map(function (contributor) {
              return <Decks.ContributorsRow
                user={contributor}
                key={contributor.url} />
          })}
        </tbody>
      </table>
    )
  }
});
