describe("A Players class", function() {
  describe("initialization, when the first player is selected as going first", function() {
    beforeEach(function() {
      this.gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };

      this.players = new Players(this.gameSetupData);
    });

    it("should set the player1Symbol to the symbol of the first player", function() {
      expect(this.players.player1Symbol).toEqual("X");
    });

    it("should set the player1Type to the type of the first player in the match", function() {
      expect(this.players.player1Type).toEqual("Human");
    });

    it("should set the currentPlayerSymbol to the symbol of the first player", function() {
      expect(this.players.currentPlayerSymbol).toEqual("X");
    });

    it("should set the currentPlayerType to the type of the first player", function() {
      expect(this.players.currentPlayerType).toEqual("Human");
    });

    it("should set the player2Symbol to the symbol of the second player", function() {
      expect(this.players.player2Symbol).toEqual("Y");
    });

    it("should set the player2Type to the type of the second player in the match", function() {
      expect(this.players.player2Type).toEqual("Computer");
    });
  });

  describe("initialization, when the second player is selected as going first", function() {
    beforeEach(function() {
      this.gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "Y"
      };

      this.players = new Players(this.gameSetupData);
    });

    it("should set the player1Symbol to the symbol of the second player", function() {
      expect(this.players.player1Symbol).toEqual("Y");
    });

    it("should set the player1Type to the type of the second player", function() {
      expect(this.players.player1Type).toEqual("Computer");
    });

    it("should set the currentPlayerSymbol to the symbol of the second player", function() {
      expect(this.players.currentPlayerSymbol).toEqual("Y");
    });

    it("should set the currentPlayerType to the type of the second player", function() {
      expect(this.players.currentPlayerType).toEqual("Computer");
    });

    it("should set the player2Symbol to the symbol of the first player", function() {
      expect(this.players.player2Symbol).toEqual("X");
    });

    it("should set the player2Type to the type of the first player", function() {
      expect(this.players.player2Type).toEqual("Human");
    });
  });

  it("throws an exception when selectedFirstPlayerSymbol doesn't match provided player symbols", function() {
    expect(
        function() {
          let gameSetupData = {
            "matchNumber": 2,
            "firstPlayerSymbol": "X",
            "secondPlayerSymbol": "Y",
            "selectedFirstPlayerSymbol": "Z"
          };
          let players = new Players(gameSetupData);
          players.refreshCurrent("Z");
        }).toThrow(new PlayersException("selectedFirstPlayerSymbol doesn't match players"));
  });

  describe("method called refreshCurrent", function() {
    beforeEach(function() {
      this.gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "Y"
      };

      this.players = new Players(this.gameSetupData);
    });

    describe("when the current player is player1", function() {
      beforeEach(function() {
        this.players.refreshCurrent("X");
      });

      it("updates the symbol of the current player to player1's symbol", function() {
        expect(this.players.currentPlayerSymbol).toEqual("X");
      });
      it("updates the type of the current player to player1's type", function() {
        expect(this.players.currentPlayerType).toEqual("Human");
      });
      it("updates the player number of the current player to 1", function() {
        expect(this.players.currentPlayerNumber).toEqual(2);
      });
    });

    describe("when the current player is player2", function() {
      beforeEach(function() {
        this.players.refreshCurrent("Y");
      });
      it("updates the symbol of the current player to player2's symbol", function() {
        expect(this.players.currentPlayerSymbol).toEqual("Y");
      });
      it("updates the type of the current player to player2's type", function() {
        expect(this.players.currentPlayerType).toEqual("Computer");
      });
      it("updates the player number of the current player to 2", function() {
        expect(this.players.currentPlayerNumber).toEqual(1);
      });
    });
    
    it ("throws a PlayerException when the selected symbol doesn't match player 1 or 2", function() {
      expect(
        function() {
          let gameSetupData = {
            "matchNumber": 2,
            "firstPlayerSymbol": "X",
            "secondPlayerSymbol": "Y",
            "selectedFirstPlayerSymbol": "Y"
          };
          let players = new Players(gameSetupData);
          players.refreshCurrent("Z");
        }).toThrow(new PlayersException("currentPlayerSymbol doesn't match players"));
    });
  });

  describe("method called getPlayerNumber", function(){
    beforeEach(function() {
      this.gameSetupData = {
        "matchNumber": 2,
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "Y"
      };

      this.players = new Players(this.gameSetupData);
    });
    it("returns the number of the current player", function(){
      expect(this.players.getPlayerNumber()).toEqual(1);
    });
  });
});