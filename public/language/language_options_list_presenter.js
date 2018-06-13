class LanguageOptionsListPresenter {
  render(parentElement, responseData) {
    let languages = responseData["languages"];
    let radioButton; 
    let table = document.createElement("table");
    for (var index = 0; index < languages.length; index++){
        let tr = document.createElement("tr");   
        let td = document.createElement("td");
        radioButton = document.createElement("input");
        setTimeout(function(){radioButton.focus();});
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("name", "language_option");
        radioButton.setAttribute("value", index+1);
        let text = languages[index]["description"];
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