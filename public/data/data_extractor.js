class DataExtractor {
  constructor() {
    this.anyErrors = false;
    this.errorMessages = [];
  }

  addErrorMessage(exceptionText) {
    this.errorMessages.push(exceptionText);
  }

  getElementsToEvaluate() {
    let inputElements = document.getElementsByTagName("input");
    return inputElements;
  }

  checkForSelectedMatch(elements) {
    let array = Array.from(elements);
    let selectedMatch = array.filter(x => x.type === "radio" && x.checked === true);
    if (selectedMatch.length === 0) {
      this.anyErrors = true;
      let exceptionTextTemplate = applicationMessages["messages"]["match_selection_prompt"];
      this.addErrorMessage(exceptionTextTemplate.replace(":", "."));
      return 0;
    }
    return selectedMatch[0].value;
  }

  checkIfFirstPlayerSymbolIsProvided(inputElements) {
    let firstPlayerSymbol = inputElements["player1_symbol"].value;
    if (firstPlayerSymbol === "" || firstPlayerSymbol === " ") {
      this.anyErrors = true;
      let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
      this.addErrorMessage(exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 1"));
    }
    return firstPlayerSymbol;
  }

  checkIfSecondPlayerSymbolIsProvided(inputElements) {
    let secondPlayerSymbol = inputElements["player2_symbol"].value;
    if (secondPlayerSymbol === "" || secondPlayerSymbol === " ") {
      this.anyErrors = true;
      let exceptionTextTemplate = applicationMessages["messages"]["invalid_selection_error_for"];
      this.addErrorMessage(exceptionTextTemplate.replace("[1]", applicationMessages["messages"]["player"] + " 2"));
    }
    return secondPlayerSymbol;
  }

  checkIfSelectedFirstPlayerSymbolIsProvided(inputElements) {
    let selectedFirstPlayerSymbol = inputElements["first_player_symbol_input"].value;
    if ((selectedFirstPlayerSymbol === "" || selectedFirstPlayerSymbol === " ")) {
      this.anyErrors = true;
      this.addErrorMessage(applicationMessages["messages"]["first_player_of_game_prompt"]);
    }
    return selectedFirstPlayerSymbol;
  }

  checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol) {
    if (firstPlayerSymbol === secondPlayerSymbol && secondPlayerSymbol !== ""){
      this.anyErrors = true;
      this.addErrorMessage(applicationMessages["messages"]["uniqueness_error"]);
    }
  }

  checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol) {
    if(selectedFirstPlayerSymbol !== "" && selectedFirstPlayerSymbol !== " " 
        && selectedFirstPlayerSymbol !== firstPlayerSymbol && selectedFirstPlayerSymbol !== secondPlayerSymbol) {
      this.anyErrors = true;
      this.addErrorMessage(applicationMessages["messages"]["invalid_selection_error"] + " " + applicationMessages["messages"]["first_player_of_game_prompt"]);
    }
  }

  createDataConstruct(matchNumber, firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol) {
    if (selectedFirstPlayerSymbol === "1") {
        selectedFirstPlayerSymbol = firstPlayerSymbol;
    } 
    else if (selectedFirstPlayerSymbol === "2") {
      selectedFirstPlayerSymbol = secondPlayerSymbol;
    }

    return {
      "matchNumber": matchNumber,
      "firstPlayerSymbol": firstPlayerSymbol,
      "secondPlayerSymbol": secondPlayerSymbol,
      "selectedFirstPlayerSymbol": selectedFirstPlayerSymbol
    }
  }

  getGameSetupData() {
    let elements = this.getElementsToEvaluate();
    let matchNumber = this.checkForSelectedMatch(elements);
    let firstPlayerSymbol = this.checkIfFirstPlayerSymbolIsProvided(elements);
    let secondPlayerSymbol = this.checkIfSecondPlayerSymbolIsProvided(elements);
    let selectedFirstPlayerSymbol = this.checkIfSelectedFirstPlayerSymbolIsProvided(elements);
    this.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
    this.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
    let gameSetupData = this.createDataConstruct(matchNumber, firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
    return gameSetupData;
  }
}