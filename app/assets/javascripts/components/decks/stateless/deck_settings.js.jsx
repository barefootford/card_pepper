var DeckSettings = React.createClass({
  render: function() {
    if (this.props.active) {
      var style = {
        marginBottom: '15px'
      };

      function needsAttention(array) {
        if (array.length > 0) {
          return 'has-error'
          // this is a custom class for the flat-ui theme
        } else {
          return ''
        }
      };

      if (this.props.deckSettingsSavedRecently) {
        var buttonSaveText = "Deck Saved."
      } else {
        var buttonSaveText = "Save"
      }

      return(
        <div id='deckSettings'>
          <small>Title:</small>
          <div
            className={'form-group ' + needsAttention(this.props.deckTitleUpdatedErrors)}
          >
            <textarea
              className='form-control'
              rows={'1'}
              value={this.props.deckTitleUpdated}
              onChange={this.props.handleEditDeckTitle}
            />
          </div>
          <ValidationErrors errors={this.props.deckTitleUpdatedErrors} />

          <small>Instructions:</small>
          <div
            className={'form-group ' + needsAttention(this.props.deckInstructionsUpdatedErrors)}
          >
            <textarea
              className='form-control'
              rows={'5'}
              value={this.props.deckInstructionsUpdated}
              onChange={this.props.handleEditDeckInstructions}
              style={style}
            />
          </div>
          <ValidationErrors errors={this.props.deckInstructionsUpdatedErrors} />

          <div
            onClick={this.props.saveUpdatedDeckSettings}
            className='btn btn-block btn-primary'
          >
            {buttonSaveText}
          </div>
          <DeleteDeckButtons
            deckID={this.props.deckID}
            deckUserConsideringDeleting={this.props.deckUserConsideringDeleting}
            handleDeckUserConsideringDeleting={this.props.handleDeckUserConsideringDeleting}
          />
        </div>
      )
    } else {
      return null
    }
    
  }
});
