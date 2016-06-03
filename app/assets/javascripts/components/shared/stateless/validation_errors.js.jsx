var ValidationErrors = React.createClass({
  render: function() {
    if (this.props.errors.length > 0) {
      // var style = {
      //   marginTop: '-15px'
      // };

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