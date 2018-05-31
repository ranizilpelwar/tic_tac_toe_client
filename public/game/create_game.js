var createGame = function(elementNameOfInsertionPoint) {
  console.log("createGame" + Date.now());
  let browserData = getGameSetupData();
  console.log("browser data =" + browserData);
  let gameSetupRequestData = gameSetupRequest(browserData);
  console.log("gamesetupdata = " + gameSetupRequestData);

  post("/game", gameSetupRequestData)
  .then(function(responseData){
    displayGameDetails(responseData);
    }, function(error){console.error("Create Game: Failed." + error);}
  );
};