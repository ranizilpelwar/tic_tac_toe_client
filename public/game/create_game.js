var createGame = function(elementNameOfInsertionPoint) {
  console.log("createGame" + Date.now());
  let gameSetupData = getGameSetupData();
  console.log("gameSetupData data =" + JSON.stringify(gameSetupData));

  let players = new Players(gameSetupData);
  console.log("Players:" + players.toString());

  let gameSetupRequestData = gameSetupRequest(gameSetupData);
  console.log("gameSetupRequestData = " + gameSetupRequestData);

  let requestCoordinator = new RequestCoordinator;
  requestCoordinator.post("/game", gameSetupRequestData)
  .then(function(responseData){
    let gameElements = document.getElementById("initialization_content");
    parent = RemoveElements.at(gameElements);
    let gamePlay = new GamePlayPresenter;
    gamePlay.render(parent, responseData, players);
    },
    function(error) {
        let exceptionsPresenter = new ExceptionsPresenter;
        let exceptionArea = document.getElementById("exception_div");
        let userFriendlyMessageArray = [];
        userFriendlyMessageArray.push("Create Game Failed.");
        exceptionsPresenter.render(exceptionArea, error, userFriendlyMessageArray);
    } 
  );
};