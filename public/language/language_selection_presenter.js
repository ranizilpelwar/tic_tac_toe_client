class LanguageSelectionPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  render(parentElement) {
    WindowListener.promptOnRedirect();
    let elementNameOfInsertionPoint = "start_game";

    let languageContentParent = document.createElement("div");
    languageContentParent.setAttribute("id", "language_selection_content");

    let text = new TextPresenter;
    let titleTextElement = text.render(languageContentParent, applicationMessages["messages"]["title_of_language_options_screen"]);
    titleTextElement.setAttribute("id", "title");

    let promptText = text.render(languageContentParent, applicationMessages["messages"]["language_selection_prompt"]);
    
    let languageOptions = document.createElement('div');
    languageOptions.setAttribute("id", "language_options");
    let list = new LanguageOptionsListPresenter;
    list.render(languageOptions, applicationMessages);
    languageContentParent.appendChild(languageOptions);

    let br = document.createElement("br");
    languageContentParent.appendChild(br);

    let submit = new SubmitButtonPresenter;
    let button = submit.render(languageContentParent, "language_selection_submit", applicationMessages["messages"]["configure_language"]);
    button.onclick = () => { this.updateApplicationWithNewLanguageSelection(this.requestCoordinator) };
    parentElement.appendChild(languageContentParent);
  }

  updateApplicationWithNewLanguageSelection(requestCoordinator) {
    let inputElements = document.getElementsByTagName("input");
    let inputElementsArray = Array.from(inputElements);
    let selectedLanguageRadioButtons = inputElementsArray.filter(x => x.type === "radio" && x.checked === true);
    if (selectedLanguageRadioButtons.length === 1) {
      let radioButtonValue = selectedLanguageRadioButtons[0].value;
      let index = radioButtonValue - 1;
      let languagesArray = applicationMessages["languages"];
      let languageTag = languagesArray[index]["language_tag"];
      let gameCoordinator = new GameCoordinator(requestCoordinator);
      gameCoordinator.refreshApplicationMessages(languageTag);
    }
    else {
      promptText.style.color = "red";
    }
  }
}
