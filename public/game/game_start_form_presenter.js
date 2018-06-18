class GameStartFormPresenter {
  render() {
    let elementNameOfInsertionPoint = "start_game";
    let gameContentParent = document.createElement("div");
    gameContentParent.setAttribute("id", "initialization_content");

    let form = document.createElement("form");
    form.setAttribute("id", "start_game_form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "javascript:;");
    form.onsubmit = function() {createGame("start_game");};
    gameContentParent.appendChild(form);
    
    let text = new TextPresenter;
    text.render(form, applicationMessages["messages"]["welcome"]);

    let exceptionArea = document.createElement("div");
    exceptionArea.setAttribute("id", "exception_div");
    form.appendChild(exceptionArea);

    let languageConfig = new LanguageConfigurationPresenter;
    languageConfig.render(form);
    
    text.render(form, applicationMessages["messages"]["match_selection_prompt"]);
    let matchTypesDiv = document.createElement('div');
    matchTypesDiv.setAttribute("id", "match_types");
    let matchTypes = new MatchTypesPresenter;
    matchTypes.render(matchTypesDiv, applicationMessages);
    form.appendChild(matchTypesDiv);

    text.render(form, applicationMessages["messages"]["player_setup_prompt"]);
    text.render(form, applicationMessages["messages"]["player_symbol_option"]);
    
    let playerArea = new PlayerSymbolInputFieldsPresenter;
    playerArea.render(form);
    
    let submit = new SubmitButtonPresenter;
    submit.render(form, "start_game_submit", "Let's get started!");
    
    let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
    insertionPoint.appendChild(gameContentParent);
  }
}
