var CardRowFlash = React.createClass({
  propTypes: {
    flash: React.PropTypes.string
  },

  render: function() {
    if (this.props.flash.length > 0) {
      return (
        <div className='row'>
          <div className='col-md-12'>
            <small style={{color: '#7b8996'}}>Card saved.</small>
          </div>
        </div>
      )
    } else {
      return null
    }
    
  }
})

