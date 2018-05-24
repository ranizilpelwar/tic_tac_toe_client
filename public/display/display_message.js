var displayMessage = function(responseData, elementId) {
  var insertionPoint = document.getElementById(elementId);
  var textArray = responseData["message"]["text"];
  insert_text(insertionPoint, textArray);
};