function removeExistingContent(elementToRemove){
  let parent = elementToRemove.parentElement;
  elementToRemove.remove();
  return parent;
}

function displayPlayersIntroduction(parentElement, responseData){
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

  insertText(parentElement, updatedMessageText);
}

function displayBoardLabel(parentElement){
  insertText(parentElement, applicationMessages["messages"]["board_intro"]);
}

function displayNextMovePrompt(parentElement, currentPlayerSymbol){
  let nextMoveTemplate = applicationMessages["messages"]["next_move_prompt"];
  updatedMessageText = nextMoveTemplate.replace("[1]", currentPlayerSymbol);
  insertText(parentElement, updatedMessageText);
}

function displayPlayerInputsAndSubmitButton(parentElement, player1Symbol, player2Symbol, currentPlayerSymbol){
  let divPlayer1 = document.createElement("div");
  let inputText1 = "Player " + player1Symbol + ":";
  let id1 = "player1_input";
  input1 = displayInput(divPlayer1, inputText1, id1);
  parentElement.appendChild(divPlayer1);

  let br = document.createElement("BR");
  parentElement.appendChild(br);

  let divPlayer2 = document.createElement("div");
  let inputText2 = "Player " + player2Symbol + ":";
  let id2 = "player2_input";
  input2 = displayInput(divPlayer2, inputText2, id2);
  parentElement.appendChild(divPlayer2);

  if (currentPlayerSymbol === player1Symbol) {
    input2.disabled = true;
    displaySubmitButton(divPlayer1, "game_play_submit", "Go!");
  } else {
    input1.disabled = true;
    displaySubmitButton(divPlayer2, "game_play_submit", "Go!");
  }
}

function displayGameDetails(responseData){
  console.log("responseData = " + JSON.stringify(responseData));
  let gameElements = document.getElementById("initialization_content");
  parent = removeExistingContent(gameElements);
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1Symbol = responseData["game"]["player1_symbol"].toUpperCase();
  let player2Symbol = responseData["game"]["player2_symbol"].toUpperCase();
  let currentPlayerSymbol = responseData["game"]["current_player_symbol"].toUpperCase();
  
  displayPlayersIntroduction(gameDetailsContainer, responseData);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, responseData);
  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  displayPlayerInputsAndSubmitButton(gameDetailsContainer, player1Symbol, player2Symbol, currentPlayerSymbol);

  parent.appendChild(gameDetailsContainer);
}

function updateGameDetailsContent(responseData){
  //update board
  //update next move prompt for player symbol as current player
  //update input boxes - enable/disable
  //update Go button to display next to current player
}
