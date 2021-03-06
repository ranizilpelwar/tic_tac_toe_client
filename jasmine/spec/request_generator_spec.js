describe("A Request Generator", function() {
  describe("method called game", function() {
    it("should return a game object containing the expected format in JSON", function() {
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": -1,
          "last_move_for_player2": -1
        }, 
        "errors": {
          "error_message": ""
        }
      };
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let game = new Game(mockRequestCoordinator, gameDetails);

      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      
      let request = new RequestGenerator;

      let gameResult = {
                        "game": {
                          "language_tag": "en",
                          "match_number": 2,
                          "player1_symbol": "X",
                          "player2_symbol": "Y",
                          "current_player_symbol": "X",
                          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                          "record_moves": false,
                          "last_move_for_player1": -1,
                          "last_move_for_player2": -1
                        }
          };
      let expectedResult = JSON.stringify(gameResult);

      expect(request.game(game, players)).toEqual(expectedResult);
    });
  });

  describe("method called humanPlayerNextMove", function() {
    it("should return a combined game object containing the next move action in expected format in JSON", function() {
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": -1,
          "last_move_for_player2": -1
        }, 
        "errors": {
          "error_message": ""
        }
      };
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let game = new Game(mockRequestCoordinator, gameDetails);
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      
      let request = new RequestGenerator;

      let humanPlayerNextMoveResult = {
                        "game": {
                          "language_tag": "en",
                          "match_number": 2,
                          "player1_symbol": "X",
                          "player2_symbol": "Y",
                          "current_player_symbol": "X",
                          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                          "record_moves": false,
                          "last_move_for_player1": -1,
                          "last_move_for_player2": -1
                        },
                        "actions": {
                          "tile_on_board": "1"
                        }
          };
      let expectedResult = JSON.stringify(humanPlayerNextMoveResult);

      expect(request.humanPlayerNextMove(game, players, "1")).toEqual(expectedResult);
    });
  });

  describe("method called gameSetup", function() {
    it("should return a setup object containing the initial player and match information in expected format in JSON", function() {
      let playerAndMatchData = {
          "firstPlayerSymbol": "X",
          "secondPlayerSymbol": "Y",
          "selectedFirstPlayerSymbol": "X",
          "matchNumber": 2
      };

      let gameSetupOutput = {
        "match_number": 2,
        "first_player_symbol": "X",
        "second_player_symbol": "Y"
      };

      let expectedResult = JSON.stringify(gameSetupOutput);
      let request = new RequestGenerator;
      expect(request.gameSetup(playerAndMatchData)).toEqual(expectedResult);
    });
  });
});