var getGameSetupData = function(){
  let matchNumber = "";

  //update current player according to who should go first

  let firstPlayerSymbol = "";
  let secondPlayerSymbol = "";

  let gameSetupData = document.getElementsByTagName("input");
  
  firstPlayerSymbol = gameSetupData["player1_symbol"].value;
  secondPlayerSymbol = gameSetupData["player2_symbol"].value;

  let matches = Array.from(gameSetupData);
  let selectedMatch = matches.filter(x => x.type === "radio" && x.checked === true);
  matchNumber = selectedMatch[0].value;
  console.log("matchNumber = " + matchNumber);
  console.log("firstPlayerSymbol = " + firstPlayerSymbol);
  console.log("secondPlayerSymbol = " + secondPlayerSymbol);

  return {
    "matchNumber": matchNumber,
    "firstPlayerSymbol": firstPlayerSymbol,
    "secondPlayerSymbol": secondPlayerSymbol
  }
};