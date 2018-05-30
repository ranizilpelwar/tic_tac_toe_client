var insertText = function(parentElement, text){
  let text_node = document.createTextNode(text);
  let text_element = document.createElement("p");
  text_element.appendChild(text_node);
  parentElement.appendChild(text_element);
};