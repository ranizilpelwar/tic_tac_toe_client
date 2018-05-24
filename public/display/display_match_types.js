var displayMatchTypes = function(responseData, elementId) {
  var insertionPoint = document.getElementById(elementId);
  var matches = responseData["matches"];

  var table = document.createElement('table');
  for (var index = 0; index < matches.length; index++){
      var tr = document.createElement('tr');   
      var td = document.createElement('td');
      var radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("name", "match_number");
      radioButton.setAttribute("value", index+1);
      var text = matches[index]["player1_type"] + " vs " + matches[index]["player2_type"];
      var textNode = document.createTextNode(text);
      td.appendChild(radioButton);
      td.appendChild(textNode);
      tr.appendChild(td);
      table.appendChild(tr);
  }
  insertionPoint.appendChild(table);
};