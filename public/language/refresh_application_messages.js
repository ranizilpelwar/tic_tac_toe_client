var refreshApplicationMessages = function(newLanguageTag) {
  request = languageSetupRequest(newLanguageTag);
  let requestCoordinator = new RequestCoordinator;
  requestCoordinator.put("/message_content", request)
  .then(
    function(updatedMessages){
      applicationMessages = updatedMessages;
      languageOptionsConfigElements = document.getElementById("language_selection_content");
      RemoveElements.at(languageOptionsConfigElements);
      let gameStart = new GameStartPresenter;
      gameStart.render();
    }, 
    function(error) {
      let exceptionsPresenter = new ExceptionsPresenter;
      let exceptionArea = document.getElementById("exception_div");
      let userFriendlyMessage = "Refresh Application Messages Failed.";
      exceptionsPresenter.render(exceptionArea, error, userFriendlyMessage);
    }
  );
};