var insert_text = function(insertionPoint, text_array){
  var index;
  var match_selection_prompt_node;
  var match_selection_prompt_element;
  for(index = 0; index < text_array.length; index++) {
    match_selection_prompt_node = document.createTextNode(text_array[index]);
    match_selection_prompt_element = document.createElement("p");
    match_selection_prompt_element.appendChild(match_selection_prompt_node);
    insertionPoint.appendChild(match_selection_prompt_element);
  }
};