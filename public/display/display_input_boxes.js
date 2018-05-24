var displayPlayerSymbolInputs = function(element_id) {
  var insertionPoint = document.getElementById(element_id);
  
  var table = document.createElement('table');
  for (var index = 1; index < 3; index++){
      var tr = document.createElement('tr');   
      var td = document.createElement('td');
      
      var text = "Symbol for Player " + index + ":";
      var textNode = document.createTextNode(text);
      var input = document.createElement('input');
      input.setAttribute("type", "text");
      var id = "player" + index + "_symbol"
      input.setAttribute("id", id);
      td.appendChild(textNode);
      td.appendChild(input);
      tr.appendChild(td);
      table.appendChild(tr);
  }
  insertionPoint.appendChild(table);
};