describe("A Data Extractor", function() {
  describe("initialization", function() {
    it("sets anyErrors to false", function() {
      let object = new DataExtractor;
      expect(object.anyErrors).toBe(false);
    });

    it("sets errorMessages to an array of length 0", function() {
      let object = new DataExtractor;
      expect(object.errorMessages.length).toEqual(0);
    });
  });

  describe("method called addErrorMessage", function() {
    it("increases the length of errorMessages by 1", function() {
      let object = new DataExtractor;
      object.addErrorMessage("test");
      expect(object.errorMessages.length).toEqual(1);
    });
  });

  describe("method called checkForSelectedMatch", function() {
    it("returns 0 when no match is selected", function() {
      let div = document.createElement("div");
      let radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      div.appendChild(radioButton);
      let result = radioButton.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkForSelectedMatch(result);
      expect(returnValue).toEqual("0");
    });

    it("returns match value when a match is selected", function() {
      let div = document.createElement("div");
      let radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      radioButton.setAttribute("value", "1");
      radioButton.checked = true;
      div.appendChild(radioButton);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkForSelectedMatch(result);
      expect(returnValue).toEqual("1");
    });
  });

  describe("method called checkIfFirstPlayerSymbolIsProvided", function() {
    it("sets anyErrors to true when first player symbol is empty", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player1_symbol");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfFirstPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("sets anyErrors to true when first player symbol is a blank space", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player1_symbol");
      input.setAttribute("value", " ");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfFirstPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("returns the value when first player symbol is entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player1_symbol");
      input.setAttribute("value", "X");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfFirstPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("X");
    });

    it("returns empty string when first player symbol is not entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player1_symbol");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfFirstPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("");
    });
  });

  describe("method called checkIfSecondPlayerSymbolIsProvided", function() {
    it("sets anyErrors to true when second player symbol is empty", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player2_symbol");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfSecondPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("sets anyErrors to true when second player symbol is a blank space", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player2_symbol");
      input.setAttribute("value", " ");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfSecondPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("returns the value when second player symbol is entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player2_symbol");
      input.setAttribute("value", "X");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfSecondPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("X");
    });

    it("returns empty string when second player symbol is not entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "player2_symbol");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfSecondPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("");
    });
  });

  describe("method called checkIfSelectedFirstPlayerSymbolIsProvided", function() {
    it("sets anyErrors to true when field is empty", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "first_player_symbol_input");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfSelectedFirstPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("sets anyErrors to true when field is a blank space", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "first_player_symbol_input");
      input.setAttribute("value", " ");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      dataExtractor.checkIfSelectedFirstPlayerSymbolIsProvided(result);
      expect(dataExtractor.anyErrors).toBe(true);
    });

    it("returns the value when value is entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "first_player_symbol_input");
      input.setAttribute("value", "X");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfSelectedFirstPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("X");
    });

    it("returns empty string when value is not entered", function() {
      let div = document.createElement("div");
      let input = document.createElement("input");
      input.setAttribute("id", "first_player_symbol_input");
      div.appendChild(input);
      let result = div.getElementsByTagName('input');
      let dataExtractor = new DataExtractor;
      let returnValue = dataExtractor.checkIfSelectedFirstPlayerSymbolIsProvided(result);
      expect(returnValue).toEqual("");
    });
  });

  describe("method called checkIfFirstAndSecondPlayerSymbolsAreTheSame", function() {
    it ("returns false if the first player symbol is an empty string", function() {
      let firstPlayerSymbol = "";
      let secondPlayerSymbol = "X";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
      expect(result).toBe(false);
    });

    it ("returns false if the second player symbol is an empty string", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
      expect(result).toBe(false);
    });

    it ("returns false if the first and second player symbols are not the same", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "Y";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
      expect(result).toBe(false);
    });

    it ("returns true if the first and second player symbols are the same value", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "X";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
      expect(result).toBe(true);
    });

    it ("returns true if the first and second player symbols are the same value and different cases", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "x";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfFirstAndSecondPlayerSymbolsAreTheSame(firstPlayerSymbol, secondPlayerSymbol);
      expect(result).toBe(true);
    });
  });

  describe("method called checkIfSelectedFirstPlayerSymbolIsValid", function() {
    it("returns false if there is no data in the selectedFirstPlayerSymbol field", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "x";
      let selectedFirstPlayerSymbol = "";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(false);
    });

    it("returns true if there is no data in the first player symbol field but it matches the second player field", function() {
      let firstPlayerSymbol = "";
      let secondPlayerSymbol = "x";
      let selectedFirstPlayerSymbol = "X";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(true);
    });

    it("returns false if there is a blank space in the selectedFirstPlayerSymbol field", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "x";
      let selectedFirstPlayerSymbol = " ";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(false);
    });

    it("returns false if the selectedFirstPlayerSymbol doesn't match the first or second player symbols", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "Y";
      let selectedFirstPlayerSymbol = "U";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(false);
    });
    
    it("returns true if the selectedFirstPlayerSymbol matches the first player symbol", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "Y";
      let selectedFirstPlayerSymbol = "X";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(true);
    });

    it("returns true if the selectedFirstPlayerSymbol matches the second player symbol", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "Y";
      let selectedFirstPlayerSymbol = "Y";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(true);
    });

    it("returns true if the selectedFirstPlayerSymbol matches the second player symbol regardless of case", function() {
      let firstPlayerSymbol = "X";
      let secondPlayerSymbol = "y";
      let selectedFirstPlayerSymbol = "Y";
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.checkIfSelectedFirstPlayerSymbolIsValid(firstPlayerSymbol, secondPlayerSymbol, selectedFirstPlayerSymbol);
      expect(result).toBe(true);
    });
  });

  describe("method called createDataConstruct", function() {
    it("returns an object of the correct formatting", function() {
      let expected = {
        "matchNumber": "1",
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.createDataConstruct("1", "X", "Y", "X");
      expect(result).toEqual(expected);
    });

    it("sets the selectedFirstPlayerSymbol to the firstPlayerSymbol if the user types a 1 in the field instead of the symbol", function() {
      let expected = {
        "matchNumber": "1",
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "X"
      };
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.createDataConstruct("1", "X", "Y", "1");
      expect(result).toEqual(expected);
    });

    it("sets the selectedFirstPlayerSymbol to the secondPlayerSymbol if the user types a 2 in the field instead of the symbol", function() {
      let expected = {
        "matchNumber": "1",
        "firstPlayerSymbol": "X",
        "secondPlayerSymbol": "Y",
        "selectedFirstPlayerSymbol": "Y"
      };
      let dataExtractor = new DataExtractor;
      let result = dataExtractor.createDataConstruct("1", "X", "Y", "2");
      expect(result).toEqual(expected);
    });
  });
});