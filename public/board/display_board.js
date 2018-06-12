var displayBoard = function(parentElement, responseData, players) {
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
      tableData.setAttribute("class", "board");
      let textNode = document.createTextNode(responseData.game.board[boardIndex].toUpperCase());
      tableData.onclick = function(){
        let tileIsInt = Number.isInteger(parseInt(textNode.data));
        if (players.currentPlayerType === applicationMessages["messages"]["human"] && tileIsInt) {
          playHumanTurn(responseData, players, textNode.data);
        }
      };
      tableData.appendChild(textNode);
      tableRow.appendChild(tableData);
      boardIndex = boardIndex + 1;
    }
    table.appendChild(tableRow);
  }
  parentElement.appendChild(table);
};