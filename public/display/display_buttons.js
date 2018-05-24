var displaySubmitButton = function(button_text, elementId) {
  var insertionPoint = document.getElementById(elementId);
  var button = document.createElement("button");
  button.setAttribute("type", "submit");
  var text = document.createTextNode(button_text);
  button.appendChild(text);
  insertionPoint.appendChild(button);
};