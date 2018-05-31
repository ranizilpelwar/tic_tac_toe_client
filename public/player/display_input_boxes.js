var displayPlayerSymbolInputs = function(parentElement) {
  let table = document.createElement('table');
  for (var index = 1; index < 3; index++){
      let tr = document.createElement('tr');   
      let td = document.createElement('td');
      
      let text = "Symbol for Player " + index + ":";
      let id = "player" + index + "_symbol";
      displayInput(td, text, id);
      tr.appendChild(td);
      table.appendChild(tr);
  }

  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let firstPlayerPromptTemplate = applicationMessages["messages"]["first_player_of_game_prompt"];
  let firstPlayerPrompt = firstPlayerPromptTemplate.replace(", [1] or [2]", "");
  displayInput(td, firstPlayerPrompt, "first_player_symbol_input");
  tr.appendChild(td);
  table.appendChild(tr);

  parentElement.appendChild(table);
};
