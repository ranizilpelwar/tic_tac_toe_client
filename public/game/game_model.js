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
      function(updatedGameDetails){
        let updatedGame = new Game(updatedGameDetails);
        let gameElements = document.getElementById("game_content");
        let parent = RemoveElements.at(gameElements);
        players.refreshCurrent(updatedGameDetails["game"]["current_player_symbol"]);
        if(updatedGame.isGameOver){
          let gameResults = new GameResultsPresenter;
          gameResults.render(parent, updatedGameDetails, players);
        }
        else {
          let gamePlay = new GamePlayPresenter;
          gamePlay.render(parent, updatedGameDetails, players);
        }
      }, 
      function(error) {
        let exceptionsPresenter = new ExceptionsPresenter;
        let exceptionArea = document.getElementById("exception_div");
        let userFriendlyMessageArray = [];
        userFriendlyMessageArray.push(applicationMessages["messages"]["invalid_selection_error"]);
        exceptionsPresenter.render(exceptionArea, error, userFriendlyMessageArray);
      } 
    );
  }

  playComputerTurn(players) {
    let requestGenerator = new RequestGenerator;
    let dataToSend = requestGenerator.game(this, players);
    let requestCoordinator = new RequestCoordinator;
    requestCoordinator.put("/computer_players_turn", dataToSend)
      .then(
        function(updatedGameDetails) {
          let updatedGame = new Game(updatedGameDetails);
          let gameElements = document.getElementById("game_content");
          let parent = RemoveElements.at(gameElements);
          players.refreshCurrent(updatedGameDetails["game"]["current_player_symbol"]);
          if(updatedGame.isGameOver){
            let gameResults = new GameResultsPresenter;
            gameResults.render(parent, updatedGameDetails, players);
          }
          else {
            let gamePlay = new GamePlayPresenter;
            gamePlay.render(parent, updatedGameDetails, players);
          }
        }, 
        function(error) {
          let exceptionsPresenter = new ExceptionsPresenter;
          let exceptionArea = document.getElementById("exception_div");
          let userFriendlyMessageArray = [];
          userFriendlyMessageArray.push(applicationMessages["messages"]["invalid_selection_error"]);
          exceptionsPresenter.render(exceptionArea, error, userFriendlyMessageArrays);
        } 
      );
  }
}