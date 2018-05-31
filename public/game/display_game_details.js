function removeExistingContent(){
  let gameElements = document.getElementById("initialization_content");
  let parent = gameElements.parentElement;
  gameElements.remove();
  return parent;
}

function displayPlayersIntroduction(elementNameOfInsertionPoint, responseData){
  let playersIntroTemplate = applicationMessages["messages"]["players_intro"];
  match_number = responseData["game"]["match_number"]
  index = match_number - 1;
  let player1_symbol = responseData["game"]["player1_symbol"].toUpperCase();
  let player2_symbol = responseData["game"]["player2_symbol"].toUpperCase();
  let player1_type = applicationMessages["matches"][index]["player1_type"];
  let player2_type = applicationMessages["matches"][index]["player2_type"];
  
  let updatedMessageText = playersIntroTemplate.replace("[1]", player1_symbol);
  updatedMessageText = updatedMessageText.replace("[2]", player1_type);
  updatedMessageText = updatedMessageText.replace("[3]", player2_symbol);
  updatedMessageText = updatedMessageText.replace("[4]", player2_type);

  insertText(elementNameOfInsertionPoint, updatedMessageText);
}

function displayBoardLabel(elementNameOfInsertionPoint){
  insertText(elementNameOfInsertionPoint, applicationMessages["messages"]["board_intro"]);
}

function displayNextMovePrompt(elementNameOfInsertionPoint, currentPlayerSymbol){
  let nextMoveTemplate = applicationMessages["messages"]["next_move_prompt"];
  updatedMessageText = nextMoveTemplate.replace("[1]", currentPlayerSymbol);
  insertText(elementNameOfInsertionPoint, updatedMessageText);
}

function displayGameDetails(elementNameOfInsertionPoint, responseData){
  console.log("responseData = " + JSON.stringify(responseData));
  parent = removeExistingContent();
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1_symbol = responseData["game"]["player1_symbol"].toUpperCase();
  let player2_symbol = responseData["game"]["player2_symbol"].toUpperCase();
  let currentPlayerSymbol = responseData["game"]["current_player_symbol"].toUpperCase();
  
  displayPlayersIntroduction(gameDetailsContainer, responseData);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, responseData);
  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  
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

