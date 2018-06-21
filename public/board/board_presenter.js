class BoardPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  render(parentElement, gameDetails, players) {
    let game = new Game(this.requestCoordinator, gameDetails);
    let table = document.createElement("table");
    table.setAttribute("class", "board");
    let boardIndex = 0;
    for (var row = 1; row <= 3; row++){
      let tableRow = document.createElement("tr");
      tableRow.setAttribute("id", "board");
      for (var column = 1; column <= 3; column++){
        let tableData = document.createElement("td");
        let tileNumber = boardIndex + 1;
        tableData.setAttribute("id", tileNumber);
        tableData.setAttribute("class", "board board-cell");
        let textNode = document.createTextNode(game.board[boardIndex].toUpperCase());
        tableData.onclick = () => this.playAsHumanIfLegal(game, players, textNode);
        tableData.appendChild(textNode);
        tableRow.appendChild(tableData);
        boardIndex = boardIndex + 1;
      }
      table.appendChild(tableRow);
    }
    let br = document.createElement("br");
    parentElement.appendChild(table);
    parentElement.appendChild(br);
  }

  playAsHumanIfLegal(game, players, textNode) {
    let tileIsNotYetSelected = Number.isInteger(parseInt(textNode.data));
    if (!game.isGameOver && players.currentPlayerType === applicationMessages["messages"]["human"] && tileIsNotYetSelected) {
      game.playHumanTurn(players, textNode.data);
    }
  }
}
