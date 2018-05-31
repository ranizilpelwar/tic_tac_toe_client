var displayMatchTypes = function(parentElement, responseData) {
  let matches = responseData["matches"];

  let table = document.createElement("table");
  for (var index = 0; index < matches.length; index++){
      let tr = document.createElement("tr");   
      let td = document.createElement("td");
      let radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("name", "match_number");
      radioButton.setAttribute("value", index+1);
      let text = matches[index]["player1_type"] + " vs " + matches[index]["player2_type"];
      let textNode = document.createTextNode(text);
      td.appendChild(radioButton);
      td.appendChild(textNode);
      tr.appendChild(td);
      table.appendChild(tr);
  }
  parentElement.appendChild(table);
};