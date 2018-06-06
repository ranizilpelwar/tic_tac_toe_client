var removeExistingContent = function(elementToRemove){
  let parent = elementToRemove.parentElement;
  elementToRemove.remove();
  return parent;
};

var displayPlayersIntroduction = function(parentElement, responseData, players){
  let playersIntroTemplate = applicationMessages["messages"]["players_intro"];
  match_number = responseData["game"]["match_number"]
  index = match_number - 1;
  
  let updatedMessageText = playersIntroTemplate.replace("[1]", players.player1Symbol);
  updatedMessageText = updatedMessageText.replace("[2]", players.player1Type);
  updatedMessageText = updatedMessageText.replace("[3]", players.player2Symbol);
  updatedMessageText = updatedMessageText.replace("[4]", players.player2Type);

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

var emulateComputerAction = function(players) {
  console.log("emulateComputerAction");
  if (players.currentPlayerType === "Computer"){
    let submitButton = document.getElementById("game_play_submit");
    submitButton.click();
  }
};

var displayPlayerInputsAndSubmitButton = function(parentElement, gameDetails, players){
  let player1Symbol = players.player1Symbol;
  let player2Symbol = players.player2Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;
  let submitButton;

  let divPlayer1 = document.createElement("div");
  divPlayer1.setAttribute("id", "player" + player1Symbol + "_div");
  let inputText1 = "Player " + player1Symbol + ":";
  let id1 = "player" + player1Symbol + "_input";
  input1 = displayInput(divPlayer1, inputText1, id1);
  
  let divPlayer2 = document.createElement("div");
  divPlayer2.setAttribute("id", "player" + player2Symbol + "_div");
  let inputText2 = "Player " + player2Symbol + ":";
  let id2 = "player" + player2Symbol + "_input";
  input2 = displayInput(divPlayer2, inputText2, id2);
  
  let playerNumber = (currentPlayerSymbol === player1Symbol) ? 1 : 2;
  console.log("playerNumber = " + playerNumber);
  if (playerNumber === 1){
    input2.disabled = true;
    submitButton = displaySubmitButton(divPlayer1, "game_play_submit", "Go!");
  }

  if (playerNumber === 1 && players.currentPlayerType === "Human"){
    setTimeout(function(){input1.focus();});
    input1.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && input1.value !== "") {
        submitButton.click();
      }
    });
  }

  if (playerNumber === 1 && players.currentPlayerType === "Computer"){
    input1.disabled = true;
    input1.value = "Thinking...";
  }

  if (playerNumber === 2){
    input1.disabled = true;
    submitButton = displaySubmitButton(divPlayer2, "game_play_submit", "Go!");
  }

  if (playerNumber === 2 && players.currentPlayerType === "Human"){
    setTimeout(function(){input2.focus();});
    input2.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && input2.value !== "") {
        submitButton.click();
      }
    });
  }

  if (playerNumber === 2 && players.currentPlayerType === "Computer"){
    input2.disabled = true;
    input2.value = "Thinking...";
  }

  submitButton.onclick = function(){
    playNextTurn(gameDetails, players);
  };

  submitButton.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      submitButton.click();
    }
  });
  parentElement.appendChild(divPlayer1);

  let br = document.createElement("BR");
  parentElement.appendChild(br);
  
  parentElement.appendChild(divPlayer2);
};

var playNextTurnRequest = function(gameDetails, currentPlayerInputForNextMove){
  console.log("playNextTurnRequest currentPlayerInputForNextMove = " + currentPlayerInputForNextMove);
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

var playNextTurn = function(gameDetails, players) {
  console.log("playNextTurn");
  console.log("playNextTurn gameDetails = " + JSON.stringify(gameDetails));
  
  if(players.currentPlayerType === "Human"){
    console.log("playNextTurn currentPlayerType Human:");
    let userInputElement = document.getElementById("player" + players.currentPlayerSymbol + "_input");
    let playNextTurnRequestDetails = playNextTurnRequest(gameDetails, userInputElement.value);
    console.log("playNextTurn playNextTurnRequestDetails = " + JSON.stringify(playNextTurnRequestDetails));

    put("/human_players_turn", makeRequestable(playNextTurnRequestDetails))
    .then(function(responseData){
      console.log("human_players_turn");
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      players.refreshCurrent(responseData["game"]["current_player_symbol"]);
      promptOnRedirect();
      if(responseData["statuses"]["game_over"] === true){
        displayGameResults(parent, responseData, players);
      }
      else {
        displayGameDetails(parent, responseData, players);
      }
    }, function(error){console.error("Play Next Turn: Human, Failed." + error);}
    );
  } else {
    console.log("playNextTurn currentPlayerType Computer:");
    put("/computer_players_turn", makeRequestable(gameDetails))
    .then(function(responseData){
      console.log("play_next_turn put computer_players_turn:");
      console.log("playNextTurn responseData = " + JSON.stringify(responseData));
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      players.refreshCurrent(responseData["game"]["current_player_symbol"]);
      console.log("Players: " + players.toString());
      promptOnRedirect();
      if(responseData["statuses"]["game_over"] === true){
        displayGameResults(parent, responseData, players);
      }
      else {
        displayGameDetails(parent, responseData, players);
      }
    }, function(error){console.error("Play Next Turn: Computer, Failed." + error);}
    );
  }
};

var triggerComputerActionIfCurrentPlayer = function(players){
  if(players.currentPlayerType === "Computer"){
    setTimeout(function(){
      emulateComputerAction(players);
    }, 1000);
  }
};

var displayGameDetails = function(parentElement, gameDetails, players){
  console.log("displayGameDetails gameDetails = " + JSON.stringify(gameDetails));
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1Symbol = players.player1Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;

  displayPlayersIntroduction(gameDetailsContainer, gameDetails, players);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, gameDetails);
  

  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  displayPlayerInputsAndSubmitButton(gameDetailsContainer, gameDetails, players);
  triggerComputerActionIfCurrentPlayer(players);

  parent.appendChild(gameDetailsContainer);
};

var displayWinner = function(parentElement, gameDetails, players){
  insertText(parentElement, applicationMessages["messages"]["game_over"]);
  if (gameDetails["statuses"]["tie_game"] === true){
    insertText(parentElement, applicationMessages["messages"]["tie_game"]);
  }
  else {
    let winnerTemplate = applicationMessages["messages"]["player_won"]
    let updatedMessageText = winnerTemplate.replace("[1]", gameDetails["statuses"]["winner"].toUpperCase());
    insertText(parentElement, updatedMessageText);
  }
};

var displayGameResults = function(parentElement, gameDetails, players){
  console.log("displayGameResults gameDetails = " + JSON.stringify(gameDetails));
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1Symbol = players.player1Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;

  displayPlayersIntroduction(gameDetailsContainer, gameDetails, players);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, gameDetails);
  
  displayWinner(gameDetailsContainer, gameDetails, players);
  insertText(gameDetailsContainer, "Do you want to play again?");
  let submitButton = displaySubmitButton(gameDetailsContainer, "start_game_submit", "Start New Game");

  submitButton.onclick = function(){
    removeExistingContent(gameDetailsContainer);
    displayGameInitializationContent();
  };

  submitButton.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      submitButton.click();
    }
  });

  setTimeout(function(){submitButton.focus();});

  parent.appendChild(gameDetailsContainer);
};

