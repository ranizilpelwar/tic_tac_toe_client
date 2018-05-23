document.title = 'Tic Tac Toe';

var display_match_selection_prompt_text = function(response_data){
  var insertionPoint = document.getElementById("start_game");
  var text_array = response_data["message"]["text"];
  var index;
  var match_selection_prompt_node;
  var match_selection_prompt_para;
  for(index = 0; index < text_array.length; index++) {
    match_selection_prompt_node = document.createTextNode(text_array[index]);
    match_selection_prompt_para = document.createElement("p");
    match_selection_prompt_para.appendChild(match_selection_prompt_node);
    insertionPoint.appendChild(match_selection_prompt_para);
  }
};

var message_properties = {
  "language_tag": "en",
  "type": "match_selection_prompt"
};

var message_data_to_request = message(message_properties).data();

put_request("/message_content", display_match_selection_prompt_text, message_data_to_request);

