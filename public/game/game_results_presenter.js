class GameResultsPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  render(parentElement, gameDetails, players){
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
    
    let gameResults = new EndGameStatePresenter;
    gameResults.render(gameDetailsContainer, gameDetails);
    
    let text = new TextPresenter;
    text.render(gameDetailsContainer, applicationMessages["messages"]["replay_game_prompt"]);
    let submit = new SubmitButtonPresenter;
    let submitButton = submit.render(gameDetailsContainer, "start_game_submit", applicationMessages["messages"]["start_new_game"]);
    submitButton.onclick = () => this.startNewGame(this.requestCoordinator, gameDetailsContainer);
    submitButton.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        submitButton.click();
      }
    });
    setTimeout(function(){submitButton.focus();});

    parent.appendChild(gameDetailsContainer);
  }

  startNewGame(requestCoordinator, parent) {
      RemoveElements.at(parent);
      let gameStart = new GameStartPresenter(requestCoordinator);
      gameStart.render();
  }
}
