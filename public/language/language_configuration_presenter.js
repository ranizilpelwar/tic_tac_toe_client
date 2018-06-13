class LanguageConfigurationPresenter {
  render(parentElement) {
    let languageConfigDiv = document.createElement("div");
    languageConfigDiv.setAttribute("id", "language_div");
    let languageConfigText = applicationMessages["messages"]["language_configuration_prompt"];
    let text = new TextPresenter;
    let languageTextElement = text.render(languageConfigDiv, languageConfigText);
    languageTextElement.setAttribute("id", "language_config_text");
    let submit = new SubmitButtonPresenter;
    let languageButton = submit.render(languageTextElement, "language_config_submit", applicationMessages["messages"]["configure_language"]);
    languageButton.onclick = function() { 
      let div = document.getElementById("initialization_content");
      let parent = RemoveElements.at(div);
      let selectionPage = new LanguageSelectionPresenter;
      selectionPage.render(parent);
    };
    parentElement.appendChild(languageConfigDiv);
  }
}
