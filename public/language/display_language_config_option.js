var displayLanguageConfigOption = function(parentElement){
  let languageConfigDiv = document.createElement("div");
  languageConfigDiv.setAttribute("id", "language_div");
  languageConfigText = applicationMessages["messages"]["language_configuration_prompt"];
  let languageTextElement = insertText(languageConfigDiv, languageConfigText);
  languageTextElement.setAttribute("id", "language_config_text");
  let languageButton = displaySubmitButton(languageTextElement, "language_config_submit", "Configure Language");
  languageButton.onclick = function() { //configure language screen
  };
  parentElement.appendChild(languageConfigDiv);
};