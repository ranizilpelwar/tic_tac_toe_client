class GameStartPresenter {
  constructor(requestCoordinator) {
    this.requestCoordinator = requestCoordinator;
  }

  render() {
    let elementNameOfInsertionPoint = "start_game";
    let gameContentParent = document.createElement("div");
    gameContentParent.setAttribute("id", "initialization_content");
    
    let text = new TextPresenter;
    text.render(gameContentParent, applicationMessages["messages"]["welcome"]);

    let exceptionArea = document.createElement("div");
    exceptionArea.setAttribute("id", "exception_div");
    gameContentParent.appendChild(exceptionArea);
    
    let languageConfig = new LanguageConfigurationPresenter(this.requestCoordinator);
    languageConfig.render(gameContentParent);
    
    text.render(gameContentParent, applicationMessages["messages"]["match_selection_prompt"]);
    let matchTypesDiv = document.createElement('div');
    matchTypesDiv.setAttribute("id", "match_types");
    let matchTypes = new MatchTypesPresenter;  
    matchTypes.render(matchTypesDiv, applicationMessages);
    gameContentParent.appendChild(matchTypesDiv);
    
    text.render(gameContentParent, applicationMessages["messages"]["player_setup_prompt"]);
    text.render(gameContentParent, applicationMessages["messages"]["player_symbol_option"]);
    
    let playerArea = new PlayerSymbolInputFieldsPresenter;
    playerArea.render(gameContentParent);
    
    let br = document.createElement("br");
    gameContentParent.appendChild(br);
    
    let submit = new SubmitButtonPresenter;
    let button = submit.render(gameContentParent, "start_game_submit", applicationMessages["messages"]["start_game"]);
    button.onclick = () => this.createANewGame(this.requestCoordinator);
    let insertionPoint = document.getElementById(elementNameOfInsertionPoint);
    insertionPoint.appendChild(gameContentParent);
  }

  createANewGame(requestCoordinator) {
    let gameCoordinator = new GameCoordinator(requestCoordinator);
    gameCoordinator.createGame("start_game");
  }
}
