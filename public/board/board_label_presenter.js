class BoardLabelPresenter {
  render(parentElement) {
    let text = new TextPresenter;
    text.render(parentElement, applicationMessages["messages"]["board_intro"]);
  }
}