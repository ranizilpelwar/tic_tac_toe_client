class UndoButtonPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  updateGamePlayPresentation(parentElement, divIdToUpdate, gameDetails, players) {
    let divCollection = parentElement.getElementsByTagName("div");
    let divs = Array.from(divCollection);
    let playerDivToUpdate = divs.filter(x => x.id === divIdToUpdate)[0];
    let submit = new SubmitButtonPresenter;
    let undoButton = submit.render(playerDivToUpdate, "undo_move_submit", applicationMessages["messages"]["undo_move"]);
    undoButton.onclick = () => this.requestAndRenderUpdatedGameDetails(this.requestCoordinator, gameDetails, players);
  }

  requestAndRenderUpdatedGameDetails(requestCoordinator, gameDetails, players) {
    requestCoordinator.put("/undo_move", DataConverter.makeRequestable(gameDetails))
      .then(function(updatedGameDetails) {
          let gameElements = document.getElementById("game_content");
          parent = RemoveElements.at(gameElements);
          let gamePlay = new GamePlayPresenter(requestCoordinator);
          gamePlay.render(parent, updatedGameDetails, players);
        }, 
        function(error) {
          let exceptionsPresenter = new ExceptionsPresenter;
          let exceptionArea = document.getElementById("exception_div");
          let userFriendlyMessageArray = [];
          userFriendlyMessageArray.push("Undo Move Failed.");
          exceptionsPresenter.render(exceptionArea, error, userFriendlyMessageArray);
        } 
      );
  }

  render(parentElement, gameDetails, players) {
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
      this.updateGamePlayPresentation(parentElement, divIdToUpdate, gameDetails, players);
    }
  }
}