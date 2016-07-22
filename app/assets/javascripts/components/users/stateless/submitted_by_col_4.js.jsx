var SubmittedByCol4 = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired
  },

  render: function() {
    return(
      <div className='col-md-4' style={{textAlign: 'right'}}>
        <SubmittedBy
          id={this.props.card.user_id}
          name={this.props.card.user_name}
        />
      </div>
    )
  }
})




