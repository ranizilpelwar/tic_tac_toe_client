var gameSetupRequest = function(playerAndMatchData){

  let setupData = {
    "match_number": parseInt(playerAndMatchData["matchNumber"]),
    "first_player_symbol": playerAndMatchData["firstPlayerSymbol"],
    "second_player_symbol": playerAndMatchData["secondPlayerSymbol"]
  };

  return makeRequestable(setupData);
};