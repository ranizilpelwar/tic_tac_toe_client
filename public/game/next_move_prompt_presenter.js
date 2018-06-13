class NextMovePromptPresenter {
  render(parentElement, currentPlayerSymbol) {
    let nextMoveTemplate = applicationMessages["messages"]["next_move_prompt"];
    let updatedMessageText = nextMoveTemplate.replace("[1]", currentPlayerSymbol);
    let text = new TextPresenter;
    text.render(parentElement, updatedMessageText);
  }
}