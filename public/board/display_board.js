var displayBoard = function(parentElement, responseData) {
  let table = document.createElement('table');
  let boardIndex = 0;
  for (var row = 1; row <= 3; row++){
    let tableRow = document.createElement('tr');
    for (var column = 1; column <= 3; column++){
      let tableData = document.createElement('td');
      let textNode = document.createTextNode(responseData.game.board[boardIndex]);
      tableData.appendChild(textNode);
      tableRow.appendChild(tableData);
      boardIndex = boardIndex + 1;
    }
    table.appendChild(tableRow);
  }
  parentElement.appendChild(table);
}