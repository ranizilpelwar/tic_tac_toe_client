var displayPlayerSymbolInputs = function(parentElement) {
  let table = document.createElement('table');
  for (var index = 1; index < 3; index++){
      let tr = document.createElement('tr');   
      let td = document.createElement('td');
      
      let text = "Symbol for Player " + index + ":";
      let textNode = document.createTextNode(text);
      let input = document.createElement('input');
      input.setAttribute("type", "text");
      let id = "player" + index + "_symbol"
      input.setAttribute("id", id);
      td.appendChild(textNode);
      td.appendChild(input);
      tr.appendChild(td);
      table.appendChild(tr);
  }
  parentElement.appendChild(table);
};