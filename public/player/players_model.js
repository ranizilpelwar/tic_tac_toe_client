class Players {
  constructor(gameSetupData) {
    let matchNumber = gameSetupData["matchNumber"];
    let symbol1 = gameSetupData["firstPlayerSymbol"].toUpperCase();
    let symbol2 = gameSetupData["secondPlayerSymbol"].toUpperCase();
    let playerType1 = applicationMessages["matches"][matchNumber -1]["player1_type"];
    let playerType2 = applicationMessages["matches"][matchNumber -1]["player2_type"];
    this.currentPlayerNumber = 1;

    if (gameSetupData["selectedFirstPlayerSymbol"] === gameSetupData["firstPlayerSymbol"]) {
      this.player1Symbol = symbol1;
      this.player1Type = playerType1;
      this.currentPlayerSymbol = this.player1Symbol;
      this.currentPlayerType = this.player1Type;
      this.player2Symbol = symbol2;
      this.player2Type = playerType2;
    }
    else if (gameSetupData["selectedFirstPlayerSymbol"] === gameSetupData["secondPlayerSymbol"]) {
      this.player1Symbol = symbol2;
      this.player1Type = playerType2;
      this.currentPlayerSymbol = this.player1Symbol;
      this.currentPlayerType = this.player1Type;
      this.player2Symbol = symbol1;
      this.player2Type = playerType1;
    }
    else {
      throw new PlayersException("selectedFirstPlayerSymbol doesn't match players");
    }
  }

  refreshCurrent(currentPlayerSymbol) {
    currentPlayerSymbol = currentPlayerSymbol.toUpperCase();
    console.log("players refreshCurrent currentPlayerSymbol = " + currentPlayerSymbol);
    if (currentPlayerSymbol === this.player1Symbol) {
      this.currentPlayerSymbol = currentPlayerSymbol;
      this.currentPlayerType = this.player1Type;
      this.currentPlayerNumber = 1;
    }
    else if (currentPlayerSymbol === this.player2Symbol){
      this.currentPlayerSymbol = currentPlayerSymbol;
      this.currentPlayerType = this.player2Type;
      this.currentPlayerNumber = 2;
    }
    else throw new PlayersException("currentPlayerSymbol doesn't match players");
  }

  getPlayerNumber() {
    return this.currentPlayerNumber;
  }

  toString() {
    return "player1Symbol: " + this.player1Symbol + ", player1Type: " + this.player1Type + ", player2Symbol: " + this.player2Symbol + ", player2Type: " + this.player2Type + ", currentPlayerSymbol: " + this.currentPlayerSymbol + ", currentPlayerType: " + this.currentPlayerType + ", currentPlayerNumber: " + this.currentPlayerNumber; 
  }
}