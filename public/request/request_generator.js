class RequestGenerator {
  game(gameObject, playersObject) {
    let gameDetails = {"game": {
                          "language_tag": gameObject.languageTag,
                          "match_number": gameObject.matchNumber,
                          "player1_symbol": playersObject.player1Symbol,
                          "player2_symbol": playersObject.player2Symbol,
                          "current_player_symbol": playersObject.currentPlayerSymbol,
                          "board": gameObject.board,
                          "record_moves": gameObject.recordMoves,
                          "last_move_for_player1": gameObject.lastMoveForPlayer1,
                          "last_move_for_player2": gameObject.lastMoveForPlayer2
                        }
    }
    return DataConverter.makeRequestable(gameDetails);
  }

  humanPlayerNextMove(gameObject, playersObject, currentPlayerInputForNextMove) {
    let gameRequest = this.game(gameObject, playersObject);
    let gameDetails = JSON.parse(gameRequest);
    let combinedRequest = {};
    let nextTurn = {"actions": {
                      "tile_on_board": currentPlayerInputForNextMove
                    }
    };
    for(var key in gameDetails) {
      if(gameDetails.hasOwnProperty(key)) {
        combinedRequest[key] = gameDetails[key];
      }
    }
    for(var key in nextTurn) {
      if(nextTurn.hasOwnProperty(key)) {
        combinedRequest[key] = nextTurn[key];
      }
    }
    return DataConverter.makeRequestable(combinedRequest);
  }
}