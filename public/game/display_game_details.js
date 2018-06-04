var removeExistingContent = function(elementToRemove){
  let parent = elementToRemove.parentElement;
  elementToRemove.remove();
  return parent;
};

var displayPlayersIntroduction = function(parentElement, responseData){
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
};

var displayBoardLabel = function(parentElement){
  insertText(parentElement, applicationMessages["messages"]["board_intro"]);
};

var displayNextMovePrompt = function(parentElement, currentPlayerSymbol){
  let nextMoveTemplate = applicationMessages["messages"]["next_move_prompt"];
  updatedMessageText = nextMoveTemplate.replace("[1]", currentPlayerSymbol);
  insertText(parentElement, updatedMessageText);
};

var displayPlayerInputsAndSubmitButton = function(parentElement, player1Symbol, player2Symbol, currentPlayerSymbol){
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

  let playerNumber = "";
  let playerDiv;
  if (currentPlayerSymbol === player1Symbol) {
    input2.disabled = true;
    playerDiv = divPlayer1;
  } else {
    input1.disabled = true;
    playerDiv = divPlayer2;
  }
  let button = displaySubmitButton(playerDiv, "game_play_submit", "Go!");
  return button;
};

var playNextTurnRequest = function(gameDetails, currentPlayerInputForNextMove){
  result = {};
  nextTurn = {
    "actions": {
       "tile_on_board": currentPlayerInputForNextMove
    }
  };
  for(var key in gameDetails){
    if(gameDetails.hasOwnProperty(key)){
      result[key]=gameDetails[key];
    }
  }
  for(var key in nextTurn){
    if(nextTurn.hasOwnProperty(key)){
      result[key]=nextTurn[key];
    }
  }
  return result;
};

var playNextTurn = function(gameDetails) {
  console.log("playNextTurn");
  console.log("playNextTurn gameDetails = " + JSON.stringify(gameDetails));
  
  let inputBoxes = document.getElementsByTagName("input");
  
  let inputs = Array.from(inputBoxes);
  let enabledInput = inputs.filter(x => x.disabled === false);
  userInput = enabledInput[0].value;
  console.log("userInput = " + userInput);

  let playNextTurnRequestDetails = playNextTurnRequest(gameDetails, userInput);
  console.log("playNextTurn playNextTurnRequestDetails = " + JSON.stringify(playNextTurnRequestDetails));
  
  let currentPlayerSymbol = playNextTurnRequestDetails["game"]["current_player_symbol"];
  let playerNumber = 0;
  if(currentPlayerSymbol === playNextTurnRequestDetails["game"]["player1_symbol"]){
    playerNumber = 1;
  } else {
    playerNumber = 2;
  }

  let matchNumber = playNextTurnRequestDetails["game"]["match_number"];
  let index = matchNumber - 1;

  let playerXType = "player" + playerNumber.toString() + "_type";

  let playerType = applicationMessages["matches"][index][playerXType];
  console.log("playerType = " + playerType);

  if(playerType === "Human"){
    put("/human_players_turn", makeRequestable(playNextTurnRequestDetails))
    .then(function(responseData){
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      displayGameDetails(parent, responseData);
      }, function(error){console.error("Play Next Turn: Human, Failed." + error);}
    );
  } else {
    put("/computer_players_turn", makeRequestable(playNextTurnRequestDetails))
    .then(function(responseData){
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      displayGameDetails(parent, responseData);
      }, function(error){console.error("Play Next Turn: Computer, Failed." + error);}
    );
  }
};


var displayGameDetails = function(parentElement, gameDetails){
  console.log("displayGameDetails gameDetails = " + JSON.stringify(gameDetails));
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1Symbol = gameDetails["game"]["player1_symbol"].toUpperCase();
  let player2Symbol = gameDetails["game"]["player2_symbol"].toUpperCase();
  let currentPlayerSymbol = gameDetails["game"]["current_player_symbol"].toUpperCase();
  
  displayPlayersIntroduction(gameDetailsContainer, gameDetails);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, gameDetails);
  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  let button = displayPlayerInputsAndSubmitButton(gameDetailsContainer, player1Symbol, player2Symbol, currentPlayerSymbol);
  button.onclick = function(){playNextTurn(gameDetails)};
    
  parent.appendChild(gameDetailsContainer);
};

var updateGameContent = function(gameDetails){
  console.log("updateGameContent responseData = " + JSON.stringify(gameDetails));
  let gameDetailsContainer = document.getElementById("game_content");
  displayBoard(gameDetailsContainer, gameDetails);
  //indicate who made what move
  let currentPlayerSymbol = gameDetails["game"]["current_player_symbol"].toUpperCase();
  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  let button = displayPlayerInputsAndSubmitButton(gameDetailsContainer, player1Symbol, player2Symbol, currentPlayerSymbol);
  button.onclick = function(){playNextTurn(gameDetails)};
};
