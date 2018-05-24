var displayExceptionArea = function(exception_text, elementId) {
  var insertionPoint = document.getElementById(elementId);
  var div = document.createElement("div");
  div.setAttribute("id", "exceptions");
  var text = document.createTextNode(exception_text);
  div.appendChild(text);
  insertionPoint.appendChild(div);
};