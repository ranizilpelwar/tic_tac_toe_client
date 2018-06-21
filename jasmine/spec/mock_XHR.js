class MockXHR {
  constructor(expectedResult, statusCode) {
    this.result = expectedResult;
    this.status = statusCode;
    this.onload = function() {};
    this.responseType = "json";
    this.response = function() {
                        let gameDetails = {
                              "game": {
                                        "language_tag": gameObject.languageTag,
                                        "match_number": gameObject.matchNumber,
                                        "player1_symbol": playersObject.player1Symbol,
                                        "player2_symbol": playersObject.player2Symbol,
                                        "current_player_symbol": playersObject.currentPlayerSymbol,
                                        "board": gameObject.board,
                                        "record_moves": gameObject.recordMoves,
                                        "last_move_for_player1": gameObject.lastMoveForPlayer1,
                                        "last_move_for_player2": gameObject.lastMoveForPlayer2
                                      },
                              "errors": {
                                          "error_message": "mock failed"
                              }
                        };
                        return gameDetails;
    }
  }

  open(httpVerb, url) {

  }

  send() {

  }

  setRequestHeader(contentType, format) {

  }

}