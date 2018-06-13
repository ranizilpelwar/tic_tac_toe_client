class PlayersIntroductionPresenter {
  render(parentElement, responseData, players) {
    let playersIntroTemplate = applicationMessages["messages"]["players_intro"];
    let match_number = responseData["game"]["match_number"]
    let index = match_number - 1;
    
    let updatedMessageText = playersIntroTemplate.replace("[1]", players.player1Symbol);
    updatedMessageText = updatedMessageText.replace("[2]", players.player1Type);
    updatedMessageText = updatedMessageText.replace("[3]", players.player2Symbol);
    updatedMessageText = updatedMessageText.replace("[4]", players.player2Type);

    let text = new TextPresenter;
    text.render(parentElement, updatedMessageText);
  }
}