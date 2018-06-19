class EndGameStatePresenter {
  render(parentElement, gameDetails) {
    this.displayGameOverText(parentElement);
    if (gameDetails["statuses"]["tie_game"] === true){
      this.displayTieGameText(parentElement);
    }
    else {
      this.displayWinnerText(parentElement, gameDetails);
    }
  }

  displayGameOverText(parentElement) {
    let text = new TextPresenter;
    text.render(parentElement, applicationMessages["messages"]["game_over"]);
  }

  displayTieGameText(parentElement) {
    let text = new TextPresenter;
    text.render(parentElement, applicationMessages["messages"]["tie_game"]);
  }

  displayWinnerText(parentElement, gameDetails) {
    let text = new TextPresenter;
    let winnerTemplate = applicationMessages["messages"]["player_won"]
    let updatedMessageText = winnerTemplate.replace("[1]", gameDetails["statuses"]["winner"].toUpperCase());
    text.render(parentElement, updatedMessageText);
  }
}