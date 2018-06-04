var displayGameInitializationForm = function(){
  elementNameOfInsertionPoint = "start_game";
  
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  let form = document.createElement("form");
  form.setAttribute("id", "start_game_form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "javascript:;");
  form.onsubmit = function() {createGame("start_game");};

  gameContentParent.appendChild(form);

  insertText(form, applicationMessages["messages"]["welcome"]);
  insertText(form, applicationMessages["messages"]["match_selection_prompt"]);
  
  let matchTypes = document.createElement('div');
  matchTypes.setAttribute("id", "match_types");
  displayMatchTypes(matchTypes, applicationMessages);
  form.appendChild(matchTypes);

  insertText(form, applicationMessages["messages"]["player_setup_prompt"]);
  insertText(form, applicationMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(form);
  
  displaySubmitButton(form, "start_game_submit", "Let's get started!");
  
  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(gameContentParent);
};