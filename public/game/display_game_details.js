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
  if (players.currentPlayerType === applicationMessages["messages"]["computer"]){
    let submitButton = document.getElementById("game_play_submit");
    submitButton.click();
  }
};

var displayPlayerInputsAndSubmitButton = function(parentElement, gameDetails, players){
  let player1Symbol = players.player1Symbol;
  let player2Symbol = players.player2Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;
  let submitButton;
  let game_play_submit_text = applicationMessages["messages"]["go"];
  let player_text = applicationMessages["messages"]["player"];
  let thinking_process_for_computers_turn_text = applicationMessages["messages"]["thinking_process_for_computers_turn"];

  let divPlayer1 = document.createElement("div");
  divPlayer1.setAttribute("id", "player" + player1Symbol + "_div");
  let inputText1 = player_text + " " + player1Symbol + ":";
  let id1 = "player" + player1Symbol + "_input";
  input1 = displayInput(divPlayer1, inputText1, id1);
  
  let divPlayer2 = document.createElement("div");
  divPlayer2.setAttribute("id", "player" + player2Symbol + "_div");
  let inputText2 = player_text + " " + player2Symbol + ":";
  let id2 = "player" + player2Symbol + "_input";
  input2 = displayInput(divPlayer2, inputText2, id2);
  
  let playerNumber = (currentPlayerSymbol === player1Symbol) ? 1 : 2;
  console.log("playerNumber = " + playerNumber);
  console.log("players.currentPlayerType = " + players.currentPlayerType);
  console.log("players.currentPlayerSymbol = " + players.currentPlayerSymbol);
  console.log("applicationMessages human = " + applicationMessages["messages"]["human"]);
  
  if (playerNumber === 1){
    input2.disabled = true;
    submitButton = displaySubmitButton(divPlayer1, "game_play_submit", game_play_submit_text);
  }

  let condition = playerNumber === 1 && players.currentPlayerType === applicationMessages["messages"]["human"];
  console.log("condition = " + condition);
  if (playerNumber === 1 && players.currentPlayerType === applicationMessages["messages"]["human"]){
    setTimeout(function(){input1.focus();});
    input1.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && input1.value !== "") {
        submitButton.click();
      }
    });
  }

  if (playerNumber === 1 && players.currentPlayerType === applicationMessages["messages"]["computer"]){
    input1.disabled = true;
    input1.value = thinking_process_for_computers_turn_text;
  }

  if (playerNumber === 2){
    input1.disabled = true;
    submitButton = displaySubmitButton(divPlayer2, "game_play_submit", game_play_submit_text);
  }

  if (playerNumber === 2 && players.currentPlayerType === applicationMessages["messages"]["human"]){
    setTimeout(function(){input2.focus();});
    input2.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && input2.value !== "") {
        submitButton.click();
      }
    });
  }

  if (playerNumber === 2 && players.currentPlayerType === applicationMessages["messages"]["computer"]){
    input2.disabled = true;
    input2.value = thinking_process_for_computers_turn_text;
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


var playHumanTurn = function(gameDetails, players, selectedTileOnBoard){
  let playNextTurnRequestDetails = playNextTurnRequest(gameDetails, selectedTileOnBoard);
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
};

var playNextTurn = function(gameDetails, players) {
  console.log("playNextTurn");
  console.log("playNextTurn gameDetails = " + JSON.stringify(gameDetails));
  
  if(players.currentPlayerType === applicationMessages["messages"]["human"]){
    console.log("playNextTurn currentPlayerType Human:");
    let id = "player" + players.currentPlayerSymbol + "_input";
    console.log("playNextTurn id = " + id);
    let userInputElement = document.getElementById(id);
    let value = userInputElement.value;
    console.log("playNextTurn value = " + value);
    playHumanTurn(gameDetails, players, value);
    players.refreshCurrent(responseData["game"]["current_player_symbol"]);
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
  if(players.currentPlayerType === applicationMessages["messages"]["computer"]){
    setTimeout(function(){
      emulateComputerAction(players);
    }, 5000);
  }
};

var displayUndoButton = function(gameDetailsContainer, gameDetails, players){
  //evaluate if the other player is a human && has a last move to undo
  let currentPlayer = players.currentPlayerSymbol;
  let playerNumberOfOtherPlayer;
  if (players.currentPlayerSymbol === players.player1Symbol){
    playerNumberOfOtherPlayer = 2;
  }
  else {
    playerNumberOfOtherPlayer = 1;
  }
  //if so, add undo button to other player's div
  if (playerNumberOfOtherPlayer === 1 && players.player1Type === applicationMessages["messages"]["human"] && parseInt(gameDetails["game"]["last_move_for_player1"]) !== -1){
    let playerId = "player" + players.player1Symbol + "_div";
    console.log("playerId = " + playerId);
    let divCollection = gameDetailsContainer.getElementsByTagName("div");
    let divs = Array.from(divCollection);
    let playerDivToUpdate = divs.filter(x => x.id === playerId)[0];
    let undoButton = displaySubmitButton(playerDivToUpdate, "undo_move_submit", "Undo Move");
    undoButton.onclick = function(){
    //undo move request
    console.log("undo move game details before = " + JSON.stringify(gameDetails));
    put("/undo_move", makeRequestable(gameDetails))
    .then(function(updatedGameDetails){
      console.log("undo move game details after = " + JSON.stringify(updatedGameDetails));
      players.refreshCurrent(updatedGameDetails["game"]["current_player_symbol"]);
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      displayGameDetails(parent, updatedGameDetails, players);
    }, function(error){console.error("Undo Move: Failed." + error);});
    //with game details / response data, draw new game details
    //current player in players stays the same
  };
  }
  if (playerNumberOfOtherPlayer === 2 && players.player2Type === applicationMessages["messages"]["human"] && parseInt(gameDetails["game"]["last_move_for_player2"]) !== -1){
    let playerId = "player" + players.player2Symbol + "_div";
    let divCollection = gameDetailsContainer.getElementsByTagName("div");
    let divs = Array.from(divCollection);
    let playerDivToUpdate = divs.filter(x => x.id === playerId)[0];
    let undoButton = displaySubmitButton(playerDivToUpdate, "undo_move_submit", "Undo Move");
    undoButton.onclick = function(){
    //undo move request
    console.log("undo move game details before = " + JSON.stringify(gameDetails));
    
    put("/undo_move", makeRequestable(gameDetails))
    .then(function(updatedGameDetails){
      //let gameElements = document.getElementById("game_content");
      console.log("undo move game details after = " + JSON.stringify(updatedGameDetails));
      players.refreshCurrent(updatedGameDetails["game"]["current_player_symbol"]);
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      promptOnRedirect();
      displayGameDetails(parent, updatedGameDetails, players);
    }, function(error){console.error("Undo Move: Failed." + error);});
    //with game details / response data, draw new game details
    //current player in players stays the same
  };
  }
  //wire up undo button to execute undo request which redraws game details with updated responseData
  
};

var displayGameDetails = function(parentElement, gameDetails, players){
  console.log("displayGameDetails gameDetails = " + JSON.stringify(gameDetails));
  
  let gameDetailsContainer = document.createElement("div");
  gameDetailsContainer.setAttribute("id", "game_content");
  
  let player1Symbol = players.player1Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;

  displayPlayersIntroduction(gameDetailsContainer, gameDetails, players);
  displayBoardLabel(gameDetailsContainer);
  displayBoard(gameDetailsContainer, gameDetails, players);
  

  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  displayPlayerInputsAndSubmitButton(gameDetailsContainer, gameDetails, players);
  displayUndoButton(gameDetailsContainer, gameDetails, players);
  triggerComputerActionIfCurrentPlayer(players);

  parent.appendChild(gameDetailsContainer);
};
