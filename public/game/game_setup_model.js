var gameSetupRequest = function(playerAndMatchData){

  let firstPlayerSymbol = playerAndMatchData["firstPlayerSymbol"];
  let secondPlayerSymbol = playerAndMatchData["secondPlayerSymbol"];
  let selectedFirstPlayerSymbol = playerAndMatchData["selectedFirstPlayerSymbol"];

  if (selectedFirstPlayerSymbol === secondPlayerSymbol){
    let temp = secondPlayerSymbol;
    secondPlayerSymbol = firstPlayerSymbol;
    firstPlayerSymbol = temp;
  }

  let setupData = {
    "match_number": parseInt(playerAndMatchData["matchNumber"]),
    "first_player_symbol": firstPlayerSymbol,
    "second_player_symbol": secondPlayerSymbol
  };

  return DataConverter.makeRequestable(setupData);
};