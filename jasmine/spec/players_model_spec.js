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
});