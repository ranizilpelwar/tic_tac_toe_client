class ExceptionsPresenter {
  render(parentElement, errorObject, userFriendlyTextArray) {
    let existingException = document.getElementById("exception_content");
    if (existingException !== null) {
      RemoveElements.at(existingException);
    }
    let div = document.createElement("div");
    console.log(errorObject.name + " " + errorObject.message);
    div.setAttribute("id", "exception_content");
    div.setAttribute("class", "exception_content");
    for (var line = 0; line < userFriendlyTextArray.length; line++){
      let lineText = userFriendlyTextArray[line];
      console.log(lineText);
      let textNode = document.createTextNode(lineText);
      div.appendChild(textNode);
      let br = document.createElement("br");
      div.appendChild(br);
    }
    parentElement.appendChild(div);
  }
}
