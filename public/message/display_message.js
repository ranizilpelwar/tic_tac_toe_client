var displayMessage = function(parentElement, responseData) {
  let textArray = responseData["message"]["text"];
  insert_text(parentElement, textArray);
};