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

var displayPlayerInputsAndSubmitButton = function(parentElement, gameDetails, players){
  let player1Symbol = players.player1Symbol;
  let player2Symbol = players.player2Symbol;
  let currentPlayerNumber = players.currentPlayerNumber;
  let currentPlayerType = players.currentPlayerType;
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

  let submitButton;
  let currentInputField;

  if (currentPlayerNumber === 1) {
    input2.disabled = true;
    submitButton = displaySubmitButton(divPlayer1, "game_play_submit", game_play_submit_text);
    currentInputField = input1;
  }
  else if (currentPlayerNumber === 2) {
    input1.disabled = true;
    submitButton = displaySubmitButton(divPlayer2, "game_play_submit", game_play_submit_text);
    currentInputField = input2;
  }
  else {
    throw new PlayersException("unknown player number: " + currentPlayerNumber);
  }

  if (currentPlayerType === applicationMessages["messages"]["human"]) {
    setTimeout(function(){currentInputField.focus();});
    submitButton.onclick = function() {
      let userInput = currentInputField.value;
      if (userInput !== "") {
        playHumanTurn(gameDetails, players, userInput);
      }
    };
    currentInputField.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13 && currentInputField.value !== "") {
        submitButton.click();
      }
    });
  }
  else if (currentPlayerType === applicationMessages["messages"]["computer"]) {
    currentInputField.disabled = true;
    currentInputField.value = thinking_process_for_computers_turn_text;
    setTimeout(function(){
      playNextTurn(gameDetails, players);
    }, 3000);
  }
  else {
    throw new PlayersException("unknown player type: " + currentPlayerType);
  }

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
      .then(
        function(responseData) {
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
        }, 
        error => console.error("Play Next Turn: Computer, Failed." + error)
      );
  }
};

var displayUndoButton = function(gameDetailsContainer, gameDetails, players){
  let divIdToUpdate;
  let haveMoveToUndo = false;

  if (players.currentPlayerNumber == 1 && parseInt(gameDetails["game"]["last_move_for_player1"]) !== -1) {
    haveMoveToUndo = true;
    divIdToUpdate = "player" + players.player1Symbol + "_div";
  }
  else if (players.currentPlayerNumber == 2 && parseInt(gameDetails["game"]["last_move_for_player2"]) !== -1) {
    haveMoveToUndo = true;
    divIdToUpdate = "player" + players.player2Symbol + "_div";
  }

  if (haveMoveToUndo) {
    let divCollection = gameDetailsContainer.getElementsByTagName("div");
    let divs = Array.from(divCollection);
    let playerDivToUpdate = divs.filter(x => x.id === divIdToUpdate)[0];
    let undoButton = displaySubmitButton(playerDivToUpdate, "undo_move_submit", applicationMessages["messages"]["undo_move"]);
    undoButton.onclick = function() {
      put("/undo_move", makeRequestable(gameDetails))
        .then(function(updatedGameDetails) {
            let gameElements = document.getElementById("game_content");
            parent = removeExistingContent(gameElements);
            promptOnRedirect();
            displayGameDetails(parent, updatedGameDetails, players);
          }, function(error){console.error("Undo Move: Failed." + error);}
        );
    }
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
  displayBoard(gameDetailsContainer, gameDetails, players);
  displayNextMovePrompt(gameDetailsContainer, currentPlayerSymbol);
  displayPlayerInputsAndSubmitButton(gameDetailsContainer, gameDetails, players);
  
  if (players.currentPlayerType == applicationMessages["messages"]["human"]){
    displayUndoButton(gameDetailsContainer, gameDetails, players);
  }
  
  parent.appendChild(gameDetailsContainer);
};
