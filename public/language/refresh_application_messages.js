var refreshApplicationMessages = function(newLanguageTag) {
  request = languageSetupRequest(newLanguageTag);
  let requestGenerator = new RequestGenerator;
  requestGenerator.put("/message_content", request)
  .then(function(updatedMessages){
    applicationMessages = updatedMessages;
    languageOptionsConfigElements = document.getElementById("language_selection_content");
    RemoveElements.at(languageOptionsConfigElements);
    let gameStart = new GameStartPresenter;
    gameStart.render();
  }, function(error){console.error("refreshApplicationMessages: Failed." + error);});
};