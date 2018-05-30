var displayGameInitializationContent = function(elementNameOfInsertionPoint, allMessages){
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  insertText(gameContentParent, allMessages["messages"]["welcome"]);
  insertText(gameContentParent, allMessages["messages"]["match_selection_prompt"]);
  
  let div = document.createElement('div');
  div.setAttribute("id", "match_types");
  gameContentParent.appendChild(div);

  insertText(gameContentParent, allMessages["messages"]["player_setup_prompt"]);
  insertText(gameContentParent, allMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(gameContentParent);
  
  let button = displaySubmitButton(gameContentParent, "start_game_submit", "Let's get started!");
  button.onclick = function() {displayGameDetails("start_game", applicationMessages)};

  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(gameContentParent);
};