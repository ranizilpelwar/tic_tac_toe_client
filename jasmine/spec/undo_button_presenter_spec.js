describe("An Undo Button Presenter", function() {
  describe("method called render", function() {
    it("calls updateGamePlayPresentation when there is a move to undo", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new UndoButtonPresenter(mockRequestCoordinator);
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

      spyOn(presenter, "updateGamePlayPresentation");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      let parentDiv = document.createElement("div");
      let div = document.createElement("div");
      div.setAttribute("id", "playerX_div");
      parentDiv.appendChild(div);
      presenter.render(parentDiv, gameDetails, players);

      expect(presenter.updateGamePlayPresentation).toHaveBeenCalled();
    });

    it("doesnt call updateGamePlayPresentation when there is no move to undo", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let mockRequestCoordinator = new MockRequestCoordinator(mockRequestCreator);
      let presenter = new UndoButtonPresenter(mockRequestCoordinator);
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

      let game = new Game(mockRequestCoordinator, gameDetails);

      spyOn(presenter, "updateGamePlayPresentation");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      let parentDiv = document.createElement("div");
      let div = document.createElement("div");
      div.setAttribute("id", "playerX_div");
      parentDiv.appendChild(div);
      presenter.render(parentDiv, gameDetails, players);

      expect(presenter.updateGamePlayPresentation).not.toHaveBeenCalled();
    });
  });
});