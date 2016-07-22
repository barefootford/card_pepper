var Decks = {
  // Index: {},
  Show: {
    View: {},
    TR: {
      Card: {},
      CardEdit: {}
    }
  },
  Edit: {
    View: {},
    Tables: {},
    TR: {},
    Settings: {}
  }
};

// View components have state.
// All other components are stateless
// except CardSuggestionView in Decks#Show.
// We'll move CardSuggestiionView into Decks.Show.View soon.

var doNothing = function() {
// Use this function when you need to pass in a function
// as a callback, but you don't want it to do anything.
// Example: When an object is in 'saving' status.
};

//= require_tree ./components
