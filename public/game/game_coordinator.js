class GameCoordinator {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  createGame(elementNameOfInsertionPoint) {
    let gameSetupData = getGameSetupData();
    let players = new Players(gameSetupData);
    let requestCoordinator = this.requestCoordinator;
    let requestGenerator = new RequestGenerator;
    let gameSetupRequestData = requestGenerator.gameSetup(gameSetupData);
    requestCoordinator.post("/game", gameSetupRequestData)
    .then(
      function(responseData){
        let gameElements = document.getElementById("initialization_content");
        parent = RemoveElements.at(gameElements);
        let gamePlay = new GamePlayPresenter(requestCoordinator);
        gamePlay.render(parent, responseData, players);
      }, 
      function(error) {
        let exceptionsPresenter = new ExceptionsPresenter;
        let exceptionArea = document.getElementById("exception_div");
        let userFriendlyMessageArray = [];
        userFriendlyMessageArray.push("Create Game failed.");
        exceptionsPresenter.render(exceptionArea, error, userFriendlyMessageArray);
      } 
    );
  }

  refreshApplicationMessages(newLanguageTag) {
    let request = languageSetupRequest(newLanguageTag);
    let requestCoordinator = this.requestCoordinator;
    requestCoordinator.put("/message_content", request)
    .then(
      function(updatedMessages){
        applicationMessages = updatedMessages;
        let languageOptionsConfigElements = document.getElementById("language_selection_content");
        RemoveElements.at(languageOptionsConfigElements);
        let gameStart = new GameStartPresenter(requestCoordinator);
        gameStart.render();
      }, 
      function(error) {
        let exceptionsPresenter = new ExceptionsPresenter;
        let exceptionArea = document.getElementById("exception_div");
        let userFriendlyMessage = "Refresh Application Messages Failed.";
        exceptionsPresenter.render(exceptionArea, error, userFriendlyMessage);
      }
    );
}
}