var displayGameInitializationForm = function(elementNameOfInsertionPoint, allMessages){
  let form = document.createElement("form");
  form.setAttribute("id", "start_game_form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "javascript:;");
  form.onsubmit = function() {displayGameDetails("start_game", applicationMessages);};
  
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  insertText(gameContentParent, allMessages["messages"]["welcome"]);
  insertText(gameContentParent, allMessages["messages"]["match_selection_prompt"]);
  
  let matchTypesContainer = document.createElement('div');
  matchTypesContainer.setAttribute("id", "match_types");
  gameContentParent.appendChild(matchTypesContainer);

  insertText(gameContentParent, allMessages["messages"]["player_setup_prompt"]);
  insertText(gameContentParent, allMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(gameContentParent);
  
  displaySubmitButton(gameContentParent, "start_game_submit", "Let's get started!");
  
  form.appendChild(gameContentParent);

  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(form);
};