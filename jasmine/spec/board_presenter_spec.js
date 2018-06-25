describe("A BoardPresenter Presenter", function() { 
  describe("method called playAsHumanIfLegal", function() {
    it("calls the playHumanTurn function when the current player is a human", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new BoardPresenter(mockRequestCoordinator);
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "errors": {
          "error_message": ""
        }
      };

      let game = new Game(mockRequestCoordinator, gameDetails);

      spyOn(game, "playHumanTurn");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };
      let players = new Players(gameSetupData);

      let textNode = document.createTextNode("1");
      presenter.playAsHumanIfLegal(game, players, textNode);

      expect(game.playHumanTurn).toHaveBeenCalled();
    });

    it("doesn't call playHumanTurn function when the current player is a computer", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new BoardPresenter(mockRequestCoordinator);
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "errors": {
          "error_message": ""
        }
      };

      let game = new Game(mockRequestCoordinator, gameDetails);

      spyOn(game, "playHumanTurn");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "Y"
      };
      let players = new Players(gameSetupData);

      let textNode = document.createTextNode("1");
      presenter.playAsHumanIfLegal(game, players, textNode);

      expect(game.playHumanTurn).not.toHaveBeenCalled();
    });

    it("doesn't call playHumanTurn function when the game is over", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new BoardPresenter(mockRequestCoordinator);
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "errors": {
          "error_message": ""
        },
        "statuses": {
          "game_over": true,
          "tie_game": false,
          "winner": ""
        }
      };

      let game = new Game(mockRequestCoordinator, gameDetails);

      spyOn(game, "playHumanTurn");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };
      let players = new Players(gameSetupData);

      let textNode = document.createTextNode("1");
      presenter.playAsHumanIfLegal(game, players, textNode);

      expect(game.playHumanTurn).not.toHaveBeenCalled();
    });

    it("doesn't call playHumanTurn function when the tile is occupied", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new BoardPresenter(mockRequestCoordinator);
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "errors": {
          "error_message": ""
        },
        "statuses": {
          "game_over": false,
          "tie_game": false,
          "winner": ""
        }
      };

      let game = new Game(mockRequestCoordinator, gameDetails);

      spyOn(game, "playHumanTurn");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };
      let players = new Players(gameSetupData);

      let textNode = document.createTextNode("X");
      presenter.playAsHumanIfLegal(game, players, textNode);

      expect(game.playHumanTurn).not.toHaveBeenCalled();
    });
  });
});
