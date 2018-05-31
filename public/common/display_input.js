var displayInput = function(parentElement, inputText, inputId){
  let textNode = document.createTextNode(inputText);
  let input = document.createElement('input');
  input.setAttribute("type", "text");
  input.setAttribute("id", inputId);
  parentElement.appendChild(textNode);
  parentElement.appendChild(input);
  return input;
};