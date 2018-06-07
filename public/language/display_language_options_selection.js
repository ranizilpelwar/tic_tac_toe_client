var displayLanguageOptions = function(parentElement, responseData){
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
};


var displayLanguageOptionsSelectionContent = function(parentElement){
  elementNameOfInsertionPoint = "start_game";

  let languageContentParent = document.createElement("div");
  languageContentParent.setAttribute("id", "language_selection_content");

  let titleTextElement = insertText(languageContentParent, applicationMessages["messages"]["title_of_language_options_screen"]);
  titleTextElement.setAttribute("id", "title");

  insertText(languageContentParent, applicationMessages["messages"]["language_selection_prompt"]);
  
  let languageOptions = document.createElement('div');
  languageOptions.setAttribute("id", "language_options");
  displayLanguageOptions(languageOptions, applicationMessages);
  languageContentParent.appendChild(languageOptions);

  let br = document.createElement("br");
  languageContentParent.appendChild(br);

  let button = displaySubmitButton(languageContentParent, "language_selection_submit", applicationMessages["messages"]["configure_language"]);
  button.onclick = function() {configureLanguage();};

  parentElement.appendChild(languageContentParent);
};