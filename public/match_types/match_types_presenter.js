class MatchTypesPresenter {
  render (parentElement, responseData) {
    let matches = responseData["matches"];
    let radioButton; 
    let table = document.createElement("table");
    table.setAttribute("class", "container");
    for (var index = 0; index < matches.length; index++){
        let tr = document.createElement("tr");   
        let td = document.createElement("td");
        radioButton = document.createElement("input");
        setTimeout(function(){radioButton.focus();});
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

    radioButton.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
          radioButton.click();
        }
    });
    parentElement.appendChild(table);
  }
}
