class SubmitButtonPresenter {
  render(parentElement, button_id, button_text) {
    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("id", button_id);
    button.setAttribute("class", "btn-primary");
    let text = document.createTextNode(button_text);
    button.appendChild(text);
    parentElement.appendChild(button);
    return button;
  }
}