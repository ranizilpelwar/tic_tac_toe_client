var getGameSetupData = function(){
  let matchNumber = "";

  let inputElements = document.getElementsByTagName("input");
  
  let firstPlayerSymbol = inputElements["player1_symbol"].value;
  if (firstPlayerSymbol === "" || firstPlayerSymbol === " ") {
    let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
    let exceptionText = exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 1");
    throw new PlayersException(exceptionText);
  }
  let secondPlayerSymbol = inputElements["player2_symbol"].value;
  if (secondPlayerSymbol === "" || secondPlayerSymbol === " ") {
    let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
    let exceptionText = exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 2");
    throw new PlayersException(exceptionText);
  }
  let selectedFirstPlayerSymbol = inputElements["first_player_symbol_input"].value;
  if (selectedFirstPlayerSymbol === "" || selectedFirstPlayerSymbol === " ") {
    throw new PlayersException("Please select either " + firstPlayerSymbol + " or " + secondPlayerSymbol + " to go first.");
  }

  if (selectedFirstPlayerSymbol === "1") {
    selectedFirstPlayerSymbol = firstPlayerSymbol;
  } else if (selectedFirstPlayerSymbol === "2"){
    selectedFirstPlayerSymbol = secondPlayerSymbol;
  }
  let matches = Array.from(inputElements);
  let selectedMatch = matches.filter(x => x.type === "radio" && x.checked === true);
  if (selectedMatch.length === 0) throw new GameException("Please select one of the provided matches.");
  matchNumber = selectedMatch[0].value;
  console.log("matchNumber = " + matchNumber);
  console.log("firstPlayerSymbol = " + firstPlayerSymbol);
  console.log("secondPlayerSymbol = " + secondPlayerSymbol);

  return {
    "matchNumber": matchNumber,
    "firstPlayerSymbol": firstPlayerSymbol,
    "secondPlayerSymbol": secondPlayerSymbol,
    "selectedFirstPlayerSymbol": selectedFirstPlayerSymbol
  }
};