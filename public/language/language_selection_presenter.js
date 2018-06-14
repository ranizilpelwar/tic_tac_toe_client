class LanguageSelectionPresenter {
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
    button.onclick = function() {
        let inputElements = document.getElementsByTagName("input");
        let languages = Array.from(inputElements);
        let selectedLanguage = languages.filter(x => x.type === "radio" && x.checked === true);
        if (selectedLanguage.length === 1) {
          configureLanguage();
        }
        else {
          promptText.style.color = "red";
        }
    };

    parentElement.appendChild(languageContentParent);
  }
}
