var refreshApplicationMessages = function(newLanguageTag) {
  request = languageSetupRequest(newLanguageTag);
  put("/message_content", request)
  .then(function(updatedMessages){
    applicationMessages = updatedMessages;
    languageOptionsConfigElements = document.getElementById("language_selection_content");
    RemoveElements.at(languageOptionsConfigElements);
    displayGameInitializationContent();
  }, function(error){console.error("refreshApplicationMessages: Failed." + error);});
};