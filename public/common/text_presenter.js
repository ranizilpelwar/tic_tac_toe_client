class TextPresenter {
  render(parentElement, text) {
    let textNode = document.createTextNode(text);
    let textElement = document.createElement("p");
    textElement.appendChild(textNode);
    parentElement.appendChild(textElement);
    return textElement;
  }
}
