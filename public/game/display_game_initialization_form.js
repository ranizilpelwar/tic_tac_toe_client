var displayGameInitializationForm = function(){
  elementNameOfInsertionPoint = "start_game";
  
  let form = document.createElement("form");
  form.setAttribute("id", "start_game_form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "javascript:;");
  form.onsubmit = function() {createGame("start_game");};
  
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  insertText(gameContentParent, applicationMessages["messages"]["welcome"]);
  insertText(gameContentParent, applicationMessages["messages"]["match_selection_prompt"]);
  
  let matchTypesContainer = document.createElement('div');
  matchTypesContainer.setAttribute("id", "match_types");
  gameContentParent.appendChild(matchTypesContainer);

  insertText(gameContentParent, applicationMessages["messages"]["player_setup_prompt"]);
  insertText(gameContentParent, applicationMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(gameContentParent);
  
  displaySubmitButton(gameContentParent, "start_game_submit", "Let's get started!");
  
  form.appendChild(gameContentParent);

  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(form);
};