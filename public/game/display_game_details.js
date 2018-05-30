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

    let playersIntroTemplate = allMessages["messages"]["players_intro"];

    console.log("responseData = " + JSON.stringify(responseData));

    match_number = responseData["game"]["match_number"]
    index = match_number - 1;
    let updatedMessageText = playersIntroTemplate.replace("[1]", responseData["game"]["player1_symbol"].toUpperCase());
    updatedMessageText = updatedMessageText.replace("[2]", allMessages["matches"][index]["player1_type"]);
    updatedMessageText = updatedMessageText.replace("[3]", responseData["game"]["player2_symbol"].toUpperCase());
    updatedMessageText = updatedMessageText.replace("[4]", allMessages["matches"][index]["player2_type"]);

    insertText(gameDetailsContainer, updatedMessageText);

    parent.appendChild(gameDetailsContainer);

    //player value label or "" if first time

    //Board label

    //Display board

    //current player prompt

    //submit button
      }, function(error){console.error("Post game: Failed." + error);}
  );
}

