var displayGameInitializationContent = function(){
  elementNameOfInsertionPoint = "start_game";
  
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  insertText(gameContentParent, applicationMessages["messages"]["welcome"]);

  displayLanguageConfigOption(gameContentParent);

  insertText(gameContentParent, applicationMessages["messages"]["match_selection_prompt"]);
  
  let matchTypes = document.createElement('div');
  matchTypes.setAttribute("id", "match_types");
  displayMatchTypes(matchTypes, applicationMessages);
  gameContentParent.appendChild(matchTypes);

  insertText(gameContentParent, applicationMessages["messages"]["player_setup_prompt"]);
  insertText(gameContentParent, applicationMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(gameContentParent);

  let br = document.createElement("br");
  gameContentParent.appendChild(br);

  let button = displaySubmitButton(gameContentParent, "start_game_submit", applicationMessages["messages"]["start_game"]);
  button.onclick = function() {createGame("start_game")};

  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(gameContentParent);
};





