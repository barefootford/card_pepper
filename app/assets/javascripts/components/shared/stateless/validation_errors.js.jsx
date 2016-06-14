var ValidationErrors = React.createClass({
  render: function() {
    if (this.props.errors.length > 0) {
      var style = {
        color: '#7b8996'
      };
      return(
        <ol>
          {
            this.props.errors.map(function(errorText) {
              return(
                <small key={errorText} style={style}>
                  <li>
                    {errorText}
                  </li>
                </small>
              )
            })
          }
        </ol>
      )
    } else {
      return null
    }
  }
})