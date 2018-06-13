class ExceptionsPresenter {
  render(parentElement, exceptionType, exceptionText) {
    let existingException = document.getElementById("exception_content");
    if (existingException !== null) {
      RemoveElements.at(existingException);
    }
    let div = document.createElement("div");
    div.setAttribute("id", "exception_content");
    let text = document.createTextNode(exceptionText);
    console.log("Exception: " + exceptionType + ", Exception Details: " + exceptionText);
    div.appendChild(text);
    parentElement.appendChild(div);
  }
}
