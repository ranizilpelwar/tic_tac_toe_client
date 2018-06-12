var createGame = function(elementNameOfInsertionPoint) {
  console.log("createGame" + Date.now());
  let gameSetupData = getGameSetupData();
  console.log("gameSetupData data =" + JSON.stringify(gameSetupData));

  let players = new Players(gameSetupData);
  console.log("Players:" + players.toString());

  let gameSetupRequestData = gameSetupRequest(gameSetupData);
  console.log("gameSetupRequestData = " + gameSetupRequestData);

  post("/game", gameSetupRequestData)
  .then(function(responseData){
    let gameElements = document.getElementById("initialization_content");
    parent = RemoveElements.at(gameElements);
    promptOnRedirect();
    let game = new Game(responseData);
    game.toString();
    displayGameDetails(parent, responseData, players);
    }, function(error){console.error("Create Game: Failed." + error);}
  );
};