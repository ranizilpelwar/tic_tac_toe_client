function removeExistingContent(){
  let gameElements = document.getElementById("initialization_content");
  let parent = gameElements.parentElement;
  gameElements.remove();
  return parent;
}



function displayGameDetails(elementNameOfInsertionPoint, responseData){
  parent = removeExistingContent();
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");

  let playersIntroTemplate = applicationMessages["messages"]["players_intro"];

  console.log("responseData = " + JSON.stringify(responseData));

  match_number = responseData["game"]["match_number"]
  index = match_number - 1;
  let player1_symbol = responseData["game"]["player1_symbol"].toUpperCase();
  let player2_symbol = responseData["game"]["player2_symbol"].toUpperCase();
  let player1_type = applicationMessages["matches"][index]["player1_type"];
  let player2_type = applicationMessages["matches"][index]["player2_type"];
  let currentPlayerSymbol = responseData["game"]["current_player_symbol"].toUpperCase();
  
  let updatedMessageText = playersIntroTemplate.replace("[1]", player1_symbol);
  updatedMessageText = updatedMessageText.replace("[2]", player1_type);
  updatedMessageText = updatedMessageText.replace("[3]", player2_symbol);
  updatedMessageText = updatedMessageText.replace("[4]", player2_type);

  insertText(gameDetailsContainer, updatedMessageText);

  //Board label
  insertText(gameDetailsContainer, applicationMessages["messages"]["board_intro"]);

  //Display board
  displayBoard(gameDetailsContainer, responseData);

  //current player prompt
  let nextMoveTemplate = applicationMessages["messages"]["next_move_prompt"];
  updatedMessageText = nextMoveTemplate.replace("[1]", currentPlayerSymbol);
  insertText(gameDetailsContainer, updatedMessageText);

  //player input boxes - enabled or disabled based on player type and if player is current player
  let divPlayer1 = document.createElement("div");
  let inputText1 = "Player " + player1_symbol + ":";
  let id1 = "player1_input";
  input1 = displayInput(divPlayer1, inputText1, id1);
  gameDetailsContainer.appendChild(divPlayer1);

  let br = document.createElement("BR");
  gameDetailsContainer.appendChild(br);

  let divPlayer2 = document.createElement("div");
  let inputText2 = "Player " + player2_symbol + ":";
  let id2 = "player2_input";
  input2 = displayInput(divPlayer2, inputText2, id2);
  gameDetailsContainer.appendChild(divPlayer2);

  if (currentPlayerSymbol === player1_symbol) {
    input2.disabled = true;
    displaySubmitButton(divPlayer1, "game_play_submit", "Go!");
  } else {
    input1.disabled = true;
    displaySubmitButton(divPlayer2, "game_play_submit", "Go!");
  }
  
  parent.appendChild(gameDetailsContainer);
}

