describe("A PlayerTileSelectionPresenter", function() {
  describe("method called render", function() {
    it("calls setTimeout when the current player is a Human", function() {
      let mockRequestCoordinator = new MockRequestCoordinator;
      let presenter = new PlayerTileSelectionPresenter(mockRequestCoordinator);
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

      setTimeout = jasmine.createSpy("setTimeout");
      
      let gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      let players = new Players(gameSetupData);
      let div = document.createElement("div");
      presenter.render(div, gameDetails, players);

      expect(setTimeout).toHaveBeenCalled();
    });
  });
});