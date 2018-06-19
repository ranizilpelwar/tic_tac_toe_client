describe("An End Game State Presenter", function() {
  describe("method called render", function() {
    it("calls the displayGameOverText function when it is a tie game", function() {
      let presenter = new EndGameStatePresenter;
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "statuses": {
          "game_over": true,
          "tie_game": true, 
          "winner": ""
        }
      };

      spyOn(presenter, "displayGameOverText");

      let parentDiv = document.createElement("div");
      let div = document.createElement("div");
      parentDiv.appendChild(div);
      presenter.render(parentDiv, gameDetails);

      expect(presenter.displayGameOverText).toHaveBeenCalled();
    });

    it("calls the displayGameOverText function even when it isn't a tie game", function() {
      let presenter = new EndGameStatePresenter;
      let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "statuses": {
          "game_over": true,
          "tie_game": false, 
          "winner": ""
        }
      };

      spyOn(presenter, "displayGameOverText");

      let parentDiv = document.createElement("div");
      let div = document.createElement("div");
      parentDiv.appendChild(div);
      presenter.render(parentDiv, gameDetails);

      expect(presenter.displayGameOverText).toHaveBeenCalled();
    });

    it("calls the displayTieGameText function when it is a tie game", function() {
      let presenter = new EndGameStatePresenter;
        let gameDetails = {
          "game": {
            "language_tag": "en",
            "record_moves": false,
            "match_number": 2,
            "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "last_move_for_player1": 4,
            "last_move_for_player2": 5
          }, 
          "statuses": {
            "game_over": true,
            "tie_game": true, 
            "winner": ""
          }
        };

        spyOn(presenter, "displayTieGameText");

        let parentDiv = document.createElement("div");
        let div = document.createElement("div");
        parentDiv.appendChild(div);
        presenter.render(parentDiv, gameDetails);

        expect(presenter.displayTieGameText).toHaveBeenCalled();
    });

    it("doesnt call the displayTieGameText function it isn't a tie game", function() {
      let presenter = new EndGameStatePresenter;
        let gameDetails = {
          "game": {
            "language_tag": "en",
            "record_moves": false,
            "match_number": 2,
            "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "last_move_for_player1": 4,
            "last_move_for_player2": 5
          }, 
          "statuses": {
            "game_over": true,
            "tie_game": false, 
            "winner": ""
          }
        };

        spyOn(presenter, "displayTieGameText");

        let parentDiv = document.createElement("div");
        let div = document.createElement("div");
        parentDiv.appendChild(div);
        presenter.render(parentDiv, gameDetails);

        expect(presenter.displayTieGameText).not.toHaveBeenCalled();
    });

    it("calls the displayWinnerText function when it isn't a tie game", function() {
      let presenter = new EndGameStatePresenter;
        let gameDetails = {
          "game": {
            "language_tag": "en",
            "record_moves": false,
            "match_number": 2,
            "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "last_move_for_player1": 4,
            "last_move_for_player2": 5
          }, 
          "statuses": {
            "game_over": true,
            "tie_game": false, 
            "winner": ""
          }
        };

        spyOn(presenter, "displayWinnerText");

        let parentDiv = document.createElement("div");
        let div = document.createElement("div");
        parentDiv.appendChild(div);
        presenter.render(parentDiv, gameDetails);

        expect(presenter.displayWinnerText).toHaveBeenCalled();
    });

    it("doesnt call the displayWinnerText function it is a tie game", function() {
      let presenter = new EndGameStatePresenter;
        let gameDetails = {
          "game": {
            "language_tag": "en",
            "record_moves": false,
            "match_number": 2,
            "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "last_move_for_player1": 4,
            "last_move_for_player2": 5
          }, 
          "statuses": {
            "game_over": true,
            "tie_game": true, 
            "winner": ""
          }
        };

        spyOn(presenter, "displayWinnerText");

        let parentDiv = document.createElement("div");
        let div = document.createElement("div");
        parentDiv.appendChild(div);
        presenter.render(parentDiv, gameDetails);

        expect(presenter.displayWinnerText).not.toHaveBeenCalled();
    });
  });
});