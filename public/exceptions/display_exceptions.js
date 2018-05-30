var displayExceptionArea = function(parentElement, exception_text) {
  let div = document.createElement("div");
  div.setAttribute("id", "exceptions");
  let text = document.createTextNode(exception_text);
  div.appendChild(text);
  parentElement.appendChild(div);
};