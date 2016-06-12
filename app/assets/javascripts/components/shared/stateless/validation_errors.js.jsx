var ValidationErrors = React.createClass({
  render: function() {
    if (this.props.errors.length > 0) {
      return(
        <ol>
          {
            this.props.errors.map(function(errorText) {
              return(<li key={errorText}>{errorText}</li>)
            })
          }
        </ol>
      )
    } else {
      return null
    }
  }
})