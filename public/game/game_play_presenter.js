class GamePlayPresenter {
  render(parentElement, gameDetails, players) {
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
    let nextMovePrompt = new NextMovePromptPresenter;
    nextMovePrompt.render(gameDetailsContainer, currentPlayerSymbol);
    let playerInputArea = new PlayerTileSelectionPresenter;
    playerInputArea.render(gameDetailsContainer, gameDetails, players);
    
    if (players.currentPlayerType == applicationMessages["messages"]["human"]){
      let undo = new UndoButtonPresenter;
      undo.render(gameDetailsContainer, gameDetails, players);
    }
    
    parent.appendChild(gameDetailsContainer);
  }
}

var playHumanTurn = function(gameDetails, players, selectedTileOnBoard){
  let request = new PlayNextTurnRequest;
  let playNextTurnRequestDetails = request.getRequest(gameDetails, selectedTileOnBoard);
  let requestGenerator = new RequestGenerator;
  requestGenerator.put("/human_players_turn", DataConverter.makeRequestable(playNextTurnRequestDetails))
  .then(function(responseData){
    console.log("human_players_turn");
    let gameElements = document.getElementById("game_content");
    parent = RemoveElements.at(gameElements);
    players.refreshCurrent(responseData["game"]["current_player_symbol"]);
    if(responseData["statuses"]["game_over"] === true){
      let gameResults = new GameResultsPresenter;
      gameResults.render(parent, responseData, players);
    }
    else {
      let gamePlay = new GamePlayPresenter;
      gamePlay.render(parent, responseData, players);
    }
  }, function(error){console.error("Play Next Turn: Human, Failed." + error);}
  );
};

var playComputerTurn = function(gameDetails, players){
  let requestGenerator = new RequestGenerator;
  requestGenerator.put("/computer_players_turn", DataConverter.makeRequestable(gameDetails))
    .then(
      function(responseData) {
        console.log("play_next_turn put computer_players_turn:");
        console.log("playNextTurn responseData = " + JSON.stringify(responseData));
        let gameElements = document.getElementById("game_content");
        parent = RemoveElements.at(gameElements);
        players.refreshCurrent(responseData["game"]["current_player_symbol"]);
        console.log("Players: " + players.toString());
        if(responseData["statuses"]["game_over"] === true){
          let gameResults = new GameResultsPresenter;
          gameResults.render(parent, responseData, players);
        }
        else {
          let gamePlay = new GamePlayPresenter;
          gamePlay.render(parent, responseData, players);
        }
      }, 
      error => console.error("Play Next Turn: Computer, Failed." + error)
    );
};
