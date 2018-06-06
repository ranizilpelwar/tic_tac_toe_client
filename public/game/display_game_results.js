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
