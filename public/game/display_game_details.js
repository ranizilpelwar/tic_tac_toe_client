function displayGameDetails(elementNameOfInsertionPoint, allMessages){
  console.log("displayGameDetails" + Date.now());
  let browserData = getGameSetupData();
  console.log("browser data =" + browserData);
  let gameSetupRequestData = gameSetupRequest(browserData);
  console.log("gamesetupdata = " + gameSetupRequestData);

  post("/game", gameSetupRequestData)
  .then(function(responseData){
    let gameElements = document.getElementById("initialization_content");
    let parent = gameElements.parentElement;
    gameElements.remove();
    
    let gameDetailsContainer = document.createElement("div");
    gameDetailsContainer.setAttribute("id", "game_content");

    let playersIntroMessage = allMessages["messages"]["players_intro"];


    insertText(gameDetailsContainer, playersIntroMessage);

    parent.appendChild(gameDetailsContainer);

    //player value label or "" if first time

    //Board label

    //Display board

    //current player prompt

    //submit button
      }, function(error){console.error("Post game: Failed." + error);}
  );
}

