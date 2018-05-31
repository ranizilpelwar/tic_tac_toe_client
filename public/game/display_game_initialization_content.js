var displayGameInitializationContent = function(){
  elementNameOfInsertionPoint = "start_game";
  
  let gameContentParent = document.createElement("div");
  gameContentParent.setAttribute("id", "initialization_content");

  insertText(gameContentParent, applicationMessages["messages"]["welcome"]);
  insertText(gameContentParent, applicationMessages["messages"]["match_selection_prompt"]);
  
  let div = document.createElement('div');
  div.setAttribute("id", "match_types");
  gameContentParent.appendChild(div);

  insertText(gameContentParent, applicationMessages["messages"]["player_setup_prompt"]);
  insertText(gameContentParent, applicationMessages["messages"]["player_symbol_option"]);
  
  displayPlayerSymbolInputs(gameContentParent);

  //prompt - who goes first?
  firstPlayerPromptTemplate = applicationMessages["messages"]["first_player_of_game_prompt"];
  let updatedMessage = firstPlayerPromptTemplate.replace("[1] or [2]", "");
  insertText(gameContentParent, updatedMessage);

  //input box - who goes first?
  
  
  let button = displaySubmitButton(gameContentParent, "start_game_submit", "Let's get started!");
  button.onclick = function() {createGame("start_game")};

  let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
  insertionPoint.appendChild(gameContentParent);
};