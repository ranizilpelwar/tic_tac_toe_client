var promptOnRedirect = function() {
  window.onbeforeunload = function() {
    return "This will end the game, are you sure?";
  };
};