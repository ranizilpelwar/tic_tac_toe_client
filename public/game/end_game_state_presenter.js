class EndGameStatePresenter {
  render(parentElement, gameDetails, players) {
    let text = new TextPresenter;
    text.render(parentElement, applicationMessages["messages"]["game_over"]);
    if (gameDetails["statuses"]["tie_game"] === true){
      text.render(parentElement, applicationMessages["messages"]["tie_game"]);
    }
    else {
      let winnerTemplate = applicationMessages["messages"]["player_won"]
      let updatedMessageText = winnerTemplate.replace("[1]", gameDetails["statuses"]["winner"].toUpperCase());
      text.render(parentElement, updatedMessageText);
    }
  }
}