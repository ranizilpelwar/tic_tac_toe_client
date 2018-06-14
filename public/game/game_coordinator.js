class GameCoordinator {
  createGame(elementNameOfInsertionPoint) {
    let gameSetupData = getGameSetupData();
    let players = new Players(gameSetupData);
    let gameSetupRequestData = gameSetupRequest(gameSetupData);

    let requestCoordinator = new RequestCoordinator;
    requestCoordinator.post("/game", gameSetupRequestData)
    .then(
      function(responseData){
        let gameElements = document.getElementById("initialization_content");
        parent = RemoveElements.at(gameElements);
        let gamePlay = new GamePlayPresenter;
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
}