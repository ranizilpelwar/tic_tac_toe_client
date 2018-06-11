var getGameSetupData = function(){
  let matchNumber = "";

  let inputElements = document.getElementsByTagName("input");
  
  let firstPlayerSymbol = inputElements["player1_symbol"].value;
  let secondPlayerSymbol = inputElements["player2_symbol"].value;
  let selectedFirstPlayerSymbol = inputElements["first_player_symbol_input"].value;
  if (selectedFirstPlayerSymbol === "1") {
    selectedFirstPlayerSymbol = firstPlayerSymbol;
  } else if (selectedFirstPlayerSymbol === "2"){
    selectedFirstPlayerSymbol = secondPlayerSymbol;
  }
  let matches = Array.from(inputElements);
  let selectedMatch = matches.filter(x => x.type === "radio" && x.checked === true);
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