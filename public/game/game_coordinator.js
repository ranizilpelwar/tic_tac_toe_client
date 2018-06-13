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
}