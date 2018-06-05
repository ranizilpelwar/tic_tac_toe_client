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

var emulateComputerAction = function() {
  console.log("emulateComputerAction");
  let submitButton = document.getElementById("game_play_submit");
  submitButton.click();
};

var displayPlayerInputsAndSubmitButton = function(parentElement, gameDetails, players){
  let player1Symbol = players.player1Symbol;
  let player2Symbol = players.player2Symbol;
  let currentPlayerSymbol = players.currentPlayerSymbol;
  let submitButton;

  let playerNumber = (currentPlayerSymbol === player1Symbol) ? 1 : 2;
  console.log("playerNumber = " + playerNumber);
  let divPlayer1 = document.createElement("div");
  divPlayer1.setAttribute("id", "player" + player1Symbol + "_div");
  let inputText1 = "Player " + player1Symbol + ":";
  let id1 = "player" + player1Symbol + "_input";
  input1 = displayInput(divPlayer1, inputText1, id1);
  if (playerNumber === 1 && players.currentPlayerType === "Computer"){
    input1.disabled = true;
    input1.value = "Thinking...";
    submitButton = displaySubmitButton(divPlayer1, "game_play_submit", "Go!");
  }

  parentElement.appendChild(divPlayer1);

  let br = document.createElement("BR");
  parentElement.appendChild(br);

  let divPlayer2 = document.createElement("div");
  divPlayer2.setAttribute("id", "player" + player2Symbol + "_div");
  let inputText2 = "Player " + player2Symbol + ":";
  let id2 = "player" + player2Symbol + "_input";
  input2 = displayInput(divPlayer2, inputText2, id2);
  if (playerNumber === 2 && players.currentPlayerType === "Computer"){
    input2.disabled = true;
    input2.value = "Thinking...";
    submitButton = displaySubmitButton(divPlayer2, "game_play_submit", "Go!");
  }
  parentElement.appendChild(divPlayer2);

  submitButton.onclick = function(){
    playNextTurn(gameDetails, players);
  };


  // let playerNumber = "";
  // let playerDiv;
  // if (currentPlayerSymbol === player1Symbol) {
  //   input2.disabled = true;
  //   playerDiv = divPlayer1;
  // } else {
  //   input1.disabled = true;
  //   playerDiv = divPlayer2;
  // }
  // let button = displaySubmitButton(playerDiv, "game_play_submit", "Go!");
  // button.onclick = function(){
  //   console.log("game_play_submit click for currentPlayerSymbol " + currentPlayerSymbol);
  //   playNextTurn(gameDetails, players);
  // };

  // let currentPlayerNumber;
  // if (currentPlayerSymbol === player1Symbol){
  //   currentPlayerNumber = "1";
  // } else {
  //   currentPlayerNumber = "2";
  // }

  // let matchNumber = gameDetails["game"]["match_number"];
  // let index = matchNumber - 1;

  // let playerXType = "player" + currentPlayerNumber.toString() + "_type";

  // let currentPlayerType = applicationMessages["matches"][index][playerXType];

  // if (currentPlayerNumber === "1" && currentPlayerType === "Computer"){
  //   input1.value = "Thinking...";
  //   input1.disabled = true;
  // } 
  // else if (currentPlayerNumber === "2" && currentPlayerType === "Computer"){
  //   input2.value = "Thinking...";
  //   input2.disabled = true;
  // }

 /* let currentPlayerInputId = "player" + currentPlayerSymbol + "_input";
  console.log("currentPlayerInputId = " + currentPlayerInputId);
  let inputs = parentElement.getElementsByTagName("input");
  console.log(inputs);
  let array = Array.from(inputs);
  console.log(array);
  let currentPlayerInputBox = array.filter(x => x.id === currentPlayerInputId);
  console.log(currentPlayerInputBox);
  //let currentPlayerInputBox = Array.from(parentElement.getElementsByTagName("input")).filter(x => x.id === currentPlayerInputId);
  console.log(players.currentPlayerType);
  if (players.currentPlayerType === "Computer"){
    currentPlayerInputBox.value = "Thinking...";
  } 
  else {
    currentPlayerInputBox.disabled = false;
  }

  let currentPlayerDivId = "player" + currentPlayerSymbol + "_div";
  console.log("currentPlayerDivId = " + currentPlayerDivId);
  let currentPlayerDiv = Array.from(parentElement.getElementsByTagName("div")).filter(x => x.id === currentPlayerDivId);
  console.log("currentPlayerDiv id = " + currentPlayerDiv.id);*/
  // let button = displaySubmitButton(currentPlayerDiv, "game_play_submit", "Go!");
  // button.onclick = function(){
  //   console.log("game_play_submit click for currentPlayerSymbol " + currentPlayerSymbol);
  //   playNextTurn(gameDetails, players);
  // };
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

var playNextTurn = function(gameDetails, players) {
  console.log("playNextTurn");
  console.log("playNextTurn gameDetails = " + JSON.stringify(gameDetails));
  
  let currentPlayerSymbol = gameDetails["game"]["current_player_symbol"];
  let playerNumber = 0;
  if(currentPlayerSymbol === gameDetails["game"]["player1_symbol"]){
    playerNumber = 1;
  } else {
    playerNumber = 2;
  }

  let matchNumber = gameDetails["game"]["match_number"];
  let index = matchNumber - 1;

  let playerXType = "player" + playerNumber.toString() + "_type";

  let playerType = applicationMessages["matches"][index][playerXType];
  console.log("playerType = " + playerType);

  if(playerType === "Human"){

    let inputBoxes = document.getElementsByTagName("input");
  
    let inputs = Array.from(inputBoxes);
    let enabledInput = inputs.filter(x => x.disabled === false);
    userInput = enabledInput[0].value;
    console.log("userInput = " + userInput);

    let playNextTurnRequestDetails = playNextTurnRequest(gameDetails, userInput);
    console.log("playNextTurn playNextTurnRequestDetails = " + JSON.stringify(playNextTurnRequestDetails));

    put("/human_players_turn", makeRequestable(playNextTurnRequestDetails))
    .then(function(responseData){
      console.log("human_players_turn");
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      displayGameDetails(parent, responseData, players);
      }, function(error){console.error("Play Next Turn: Human, Failed." + error);}
    );
  } else {
    put("/computer_players_turn", makeRequestable(gameDetails))
    .then(function(responseData){
      let gameElements = document.getElementById("game_content");
      parent = removeExistingContent(gameElements);
      displayGameDetails(parent, responseData, players);
      }, function(error){console.error("Play Next Turn: Computer, Failed." + error);}
    );
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
  
  parent.appendChild(gameDetailsContainer);

  let playerNumber;
  if(currentPlayerSymbol === player1Symbol){
    playerNumber = 1;
  } else {
    playerNumber = 2;
  }
  console.log("*** displayGameDetails playerNumber = " + playerNumber);
  let matchNumber = gameDetails["game"]["match_number"];
  let index = matchNumber - 1;

  let playerXType = "player" + playerNumber.toString() + "_type";

  let playerType = applicationMessages["matches"][index][playerXType];
  console.log("*** displayGameDetails playerType = " + playerType);
  
  if(playerType === "Computer"){
    console.log("displayGameDetails: current player is a computer")
    setTimeout(function(){
      emulateComputerAction();
    }, 1000);
  }
};

