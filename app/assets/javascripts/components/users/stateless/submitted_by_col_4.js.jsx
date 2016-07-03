var SubmittedByCol4 = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    return(
      <div className='col-md-4' style={{textAlign: 'right'}}>
        <SubmittedBy
          id={this.props.id}
          name={this.props.name}
        />
      </div>
    )
  }
})




