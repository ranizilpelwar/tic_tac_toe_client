class GamePlayPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  render(parentElement, gameDetails, players) {
    WindowListener.promptOnRedirect();
    let gameDetailsContainer = document.createElement("div");
    gameDetailsContainer.setAttribute("id", "game_content");
    let player1Symbol = players.player1Symbol;
    let currentPlayerSymbol = players.currentPlayerSymbol;

    let playersIntro = new PlayersIntroductionPresenter;
    playersIntro.render(gameDetailsContainer, gameDetails, players);

    let exceptionArea = document.createElement("div");
    exceptionArea.setAttribute("id", "exception_div");
    gameDetailsContainer.appendChild(exceptionArea);

    let boardLabel = new BoardLabelPresenter;
    boardLabel.render(gameDetailsContainer);
    let board = new BoardPresenter(this.requestCoordinator);
    board.render(gameDetailsContainer, gameDetails, players);
    let nextMovePrompt = new NextMovePromptPresenter;
    nextMovePrompt.render(gameDetailsContainer, currentPlayerSymbol);
    let playerInputArea = new PlayerTileSelectionPresenter(this.requestCoordinator);
    playerInputArea.render(gameDetailsContainer, gameDetails, players);
    
    if (players.currentPlayerType == applicationMessages["messages"]["human"]){
      this.displayUndo(gameDetailsContainer, gameDetails, players);
    }
    
    parentElement.appendChild(gameDetailsContainer);
  }

  displayUndo(gameDetailsContainer, gameDetails, players) {
    let undo = new UndoButtonPresenter(this.requestCoordinator);
    undo.render(gameDetailsContainer, gameDetails, players);
  }
}
