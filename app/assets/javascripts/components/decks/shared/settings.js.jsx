var DeckSettings = React.createClass({
  render: function() {
    var data = this.props.deckSettingsData;

    if (data.componentActive) {
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

      if (data.settingsSavedRecently) {
        var buttonSaveText = "Deck Saved."
      } else {
        var buttonSaveText = "Save"
      }

      return(
        <div id='deckSettings'>
          <small>Title:</small>
          <div
            className={'form-group ' + needsAttention(data.titleUpdatedErrors)}
          >
            <textarea
              className='form-control'
              rows={'1'}
              value={data.titleUpdated}
              onChange={this.props.handleEditDeckTitle}
            />
          </div>
          <ValidationErrors errors={data.titleUpdatedErrors} />

          <small>Instructions:</small>
          <div
            className={'form-group ' + needsAttention(data.instructionsUpdatedErrors)}
          >
            <textarea
              className='form-control'
              rows={'5'}
              value={data.instructionsUpdated}
              onChange={this.props.handleEditDeckInstructions}
              style={style}
            />
          </div>
          <ValidationErrors errors={data.instructionsUpdatedErrors} />

          <div
            onClick={this.props.saveUpdatedDeckSettings}
            className='btn btn-block btn-primary'
          >
            {buttonSaveText}
          </div>
          <DeleteDeckButtons
            deckID={data.id}
            deckUserConsideringDeleting={data.deckUserConsideringDeleting}
            handleDeckUserConsideringDeleting={this.props.handleDeckUserConsideringDeleting}
          />
        </div>
      )
    } else {
      return null
    }
  }
});
