var FlashList = React.createClass({
  render: function() {
    var style = {
      textAlign: 'left'
    }
    if (this.props.flashes && this.props.flashes.length > 0) {
      return(
        <div className="dialog dialog-info">
          <div style={style} className="container">
            <ul>
              {
                this.props.flashes.map(function(flash){
                  return <li key={flash}>{flash}</li>
                })
              }
            </ul>
          </div>
        </div>
      )
    } else {
      return (<ul></ul>)
    }
  }
})