class GameResultsPresenter {
  render(parentElement, gameDetails, players){
    WindowListener.promptOnRedirect();
    let gameDetailsContainer = document.createElement("div");
    gameDetailsContainer.setAttribute("id", "game_content");
    let player1Symbol = players.player1Symbol;
    let currentPlayerSymbol = players.currentPlayerSymbol;

    let playersIntro = new PlayersIntroductionPresenter;
    playersIntro.render(gameDetailsContainer, gameDetails, players);

    let boardLabel = new BoardLabelPresenter;
    boardLabel.render(gameDetailsContainer);
    let board = new BoardPresenter;
    board.render(gameDetailsContainer, gameDetails, players);
    
    let winner = new EndGameStatePresenter;
    winner.render(gameDetailsContainer, gameDetails, players);
    
    let text = new TextPresenter;
    text.render(gameDetailsContainer, applicationMessages["messages"]["replay_game_prompt"]);
    let submit = new SubmitButtonPresenter;
    let submitButton = submit.render(gameDetailsContainer, "start_game_submit", applicationMessages["messages"]["start_new_game"]);
    submitButton.onclick = function(){
      RemoveElements.at(gameDetailsContainer);
      let gameStart = new GameStartPresenter;
      gameStart.render();
    };
    submitButton.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        submitButton.click();
      }
    });
    setTimeout(function(){submitButton.focus();});

    parent.appendChild(gameDetailsContainer);
  }
}
