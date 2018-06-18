var getGameSetupData = function(){
  let errors = false;
  let exceptionText = [];
  
  let inputElements = document.getElementsByTagName("input");
  let matches = Array.from(inputElements);
  let selectedMatch = matches.filter(x => x.type === "radio" && x.checked === true);
  if (selectedMatch.length === 0){
    errors = true;
    let exceptionTextTemplate = applicationMessages["messages"]["match_selection_prompt"];
    exceptionText.push(exceptionTextTemplate.replace(":", "."));
  }

  let firstPlayerSymbol = inputElements["player1_symbol"].value;
  if (firstPlayerSymbol === "" || firstPlayerSymbol === " ") {
    errors = true;
    let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
    exceptionText.push(exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 1"));
  }
  let secondPlayerSymbol = inputElements["player2_symbol"].value;
  if (secondPlayerSymbol === "" || secondPlayerSymbol === " ") {
    errors = true;
    let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
    exceptionText.push(exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 2"));
  }

  let selectedFirstPlayerSymbol = inputElements["first_player_symbol_input"].value;
  if ((selectedFirstPlayerSymbol === "" || selectedFirstPlayerSymbol === " ")) {
    errors = true;
    exceptionText.push(applicationMessages["messages"]["first_player_of_game_prompt"]);
  }
  if (firstPlayerSymbol === secondPlayerSymbol && secondPlayerSymbol !== ""){
    errors = true;
    exceptionText.push(applicationMessages["messages"]["uniqueness_error"]);
  }

  if(selectedFirstPlayerSymbol !== "" && selectedFirstPlayerSymbol !== " " && 
    selectedFirstPlayerSymbol !== firstPlayerSymbol && selectedFirstPlayerSymbol !== secondPlayerSymbol){
    errors = true;
    exceptionText.push(applicationMessages["messages"]["invalid_selection_error"] + " " + applicationMessages["messages"]["first_player_of_game_prompt"]);
  }

  if (errors) {
    let exceptionsPresenter = new ExceptionsPresenter;
    let exceptionArea = document.getElementById("exception_div");
    let error = new Error("Game Setup Data");
    exceptionsPresenter.render(exceptionArea, error, exceptionText);
    throw error;
  }

  if (selectedFirstPlayerSymbol === "1") {
    selectedFirstPlayerSymbol = firstPlayerSymbol;
  } else if (selectedFirstPlayerSymbol === "2"){
    selectedFirstPlayerSymbol = secondPlayerSymbol;
  }

  return {
    "matchNumber": selectedMatch[0].value,
    "firstPlayerSymbol": firstPlayerSymbol,
    "secondPlayerSymbol": secondPlayerSymbol,
    "selectedFirstPlayerSymbol": selectedFirstPlayerSymbol
  }
};