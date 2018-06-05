class Players {
  constructor(gameSetupData){
    let matchNumber = gameSetupData["matchNumber"];
    let playerType1 = applicationMessages["matches"][matchNumber -1]["player1_type"];
    let playerType2 = applicationMessages["matches"][matchNumber -1]["player2_type"];

    if (gameSetupData["selectedFirstPlayerSymbol"] === gameSetupData["firstPlayerSymbol"]){
      this.player1Symbol = gameSetupData["firstPlayerSymbol"].toUpperCase();
      this.player1Type = playerType1;
      this.currentPlayerSymbol = this.player1Symbol;
      this.currentPlayerType = this.player1Type;
      this.player2Symbol = gameSetupData["secondPlayerSymbol"].toUpperCase();
      this.player2Type = playerType2;
    }
    else if (gameSetupData["selectedFirstPlayerSymbol"] === gameSetupData["secondPlayerSymbol"]){
      this.player1Symbol = gameSetupData["secondPlayerSymbol"].toUpperCase();
      this.player1Type = playerType2;
      this.currentPlayerSymbol = this.player1Symbol;
      this.currentPlayerType = this.player1Type;
      this.player2Symbol = gameSetupData["firstPlayerSymbol"].toUpperCase();
      this.player2Type = playerType1;
    }
    else throw new PlayersException("selectedFirstPlayerSymbol doesn't match players");
  }

  refreshCurrent(currentPlayerSymbol){
    if (currentPlayerSymbol === this.player1Symbol){
      this.currentPlayerType = player1Type;
      this.currentPlayerSymbol = currentPlayerSymbol.toUpperCase();
    }
    else if (currentPlayerSymbol === player2Symbol){
      this.currentPlayerType = player2Type;
      this.currentPlayerSymbol = currentPlayerSymbol.toUpperCase();
    }
    else throw new PlayersException("currentPlayerSymbol doesn't match players");
  }

  toString(){
    return "player1Symbol: " + this.player1Symbol + ", player1Type: " + this.player1Type + ", player2Symbol: " + this.player2Symbol + ", player2Type: " + this.player2Type + ", currentPlayerSymbol: " + this.currentPlayerSymbol + "."; 
  }
}