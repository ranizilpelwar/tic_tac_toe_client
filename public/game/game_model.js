class Game {
  
  constructor(gameDetails){
    this.languageTag = gameDetails["game"]["language_tag"];
    this.recordMoves = gameDetails["game"]["record_moves"];
    this.matchNumber = gameDetails["game"]["match_number"];
    this.board = gameDetails["game"]["board"];
    this.lastMoveForPlayer1 = gameDetails["game"]["last_move_for_player1"];
    this.lastMoveForPlayer2 = gameDetails["game"]["last_move_for_player2"];
    if (gameDetails["statuses"] === undefined) {
      this.isGameOver = false;
      this.isTieGame = false;
      this.winner = "";
    }
    else {
      this.isGameOver = gameDetails["statuses"]["game_over"];
      this.isTieGame = gameDetails["statuses"]["tie_game"];
      this.winner = gameDetails["statuses"]["winner"];
    }
    this.errorMessage = gameDetails["errors"]["error_message"] === undefined ? "" : gameDetails["errors"]["error_message"];
    this.stackTrace = gameDetails["errors"]["stack_trace"] === undefined ? "" : gameDetails["errors"]["stack_trace"];
  }

  errorType() {
    return this.errorMessage.split(':')[0];
  }

  errorText() {
    this.errorMessage.split(':')[1];
  }

  toString(){
    let gameInfo = "Game details: "
                + "matchNumber: " + this.matchNumber + ", "
                + "board: [" + this.board + "], "
                + "lastMoveForPlayer1: " + this.lastMoveForPlayer1 + ", "
                + "lastMoveForPlayer2: " + this.lastMoveForPlayer2 + ", "
                + "isGameOver: " + this.isGameOver + ", "
                + "isTieGame: " + this.isTieGame + ", "
                + "winner: " + this.winner + ", "
                + "errorMessage: " + this.errorMessage + ", "
                + "stackTrace: " + this.stackTrace + ". ";
    console.log(gameInfo);
    return gameInfo;
  }

  playHumanTurn(players, selectedTileOnBoard) {
    let requestGenerator = new RequestGenerator;
    let dataToSend = requestGenerator.humanPlayerNextMove(this, players, selectedTileOnBoard);
    let requestCoordinator = new RequestCoordinator;
    requestCoordinator.put("/human_players_turn", dataToSend)
    .then(
      function(responseData){
        let gameElements = document.getElementById("game_content");
        let parent = RemoveElements.at(gameElements);
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
  }

  playComputerTurn(players) {
    let requestGenerator = new RequestGenerator;
    let dataToSend = requestGenerator.game(this, players);
    let requestCoordinator = new RequestCoordinator;
    requestCoordinator.put("/computer_players_turn", dataToSend)
      .then(
        function(responseData) {
          let gameElements = document.getElementById("game_content");
          let parent = RemoveElements.at(gameElements);
          players.refreshCurrent(responseData["game"]["current_player_symbol"]);
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
      )
  }
}