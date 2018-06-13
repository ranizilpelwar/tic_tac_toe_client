class GameCoordinator {
  startGame() {
    document.title = 'Tic Tac Toe';
    let requestCoordinator = new RequestCoordinator;
    requestCoordinator.get("/message_content")
    .then(
      function(allMessageContent) {
        applicationMessages = allMessageContent;
        let gameStart = new GameStartPresenter(applicationMessages);
        gameStart.render();
      }, 
      error => console.error("Get Message Content: Failed. " + error)
    )
    return applicationMessages;
  }

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
      error => console.error("Create Game: Failed. " + error)
    );
  }
}