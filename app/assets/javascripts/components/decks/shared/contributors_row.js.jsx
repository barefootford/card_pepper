Decks.ContributorsRow = React.createClass({
  user_row_text: function (created, edited) {
    var combined_string = ''
    edited = edited || ''
    created = created || ''
    if (created) {
      if (created === 1) {
        created = '1 New Card'
      } else {
        created += ' New Cards'
      }
    }
    combined_string += created;
    if (edited) {
      if (edited === 1) {
        edited = '1 Card Edit'
      } else {
        edited += ' Card Edits'
      }
    }
    if (edited) {
      combined_string += ', ' + edited
    }
    return combined_string
  },

  render: function () {
    var user = this.props.user;
    return (
      <tr>
        <td>
          <A text={user.name} href={user.url} />
          <span> - {this.user_row_text(user.cards_created_count, user.cards_edited_count)}
          </span>
        </td>
      </tr>
    )
  }
});