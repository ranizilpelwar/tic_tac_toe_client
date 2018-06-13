class PlayerTileSelectionPresenter {
  render(parentElement, gameDetails, players) {
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
    let inputField = new InputFieldPresenter;
    let input1 = inputField.render(divPlayer1, inputText1, id1);
    
    let divPlayer2 = document.createElement("div");
    divPlayer2.setAttribute("id", "player" + player2Symbol + "_div");
    let inputText2 = player_text + " " + player2Symbol + ":";
    let id2 = "player" + player2Symbol + "_input";
    let input2 = inputField.render(divPlayer2, inputText2, id2);

    let submitButton;
    let currentInputField;

    if (currentPlayerNumber === 1) {
      input2.disabled = true;
      let submit = new SubmitButtonPresenter;
      submitButton = submit.render(divPlayer1, "game_play_submit", game_play_submit_text);
      currentInputField = input1;
    }
    else if (currentPlayerNumber === 2) {
      input1.disabled = true;
      let submit = new SubmitButtonPresenter;
      submitButton = submit.render(divPlayer2, "game_play_submit", game_play_submit_text);
      currentInputField = input2;
    }
    else {
      throw new PlayersException("unknown player number: " + currentPlayerNumber);
    }

    if (currentPlayerType === applicationMessages["messages"]["human"]) {
      setTimeout(function(){currentInputField.focus();});
      submitButton.onclick = function() {
        if (currentInputField.value !== "") {
          let game = new Game(gameDetails);
          game.playHumanTurn(players, currentInputField.value);
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
        playComputerTurn(gameDetails, players);
      }, 3000);
    }
    else {
      throw new PlayersException("unknown player type: " + currentPlayerType);
    }

    parentElement.appendChild(divPlayer1);

    let br = document.createElement("BR");
    parentElement.appendChild(br);
    
    parentElement.appendChild(divPlayer2);
  }
}