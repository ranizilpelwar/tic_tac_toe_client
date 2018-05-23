document.title = 'Tic Tac Toe';

var display_match_selection_prompt_text = function(response_data){
  var match_selection_prompt_para = document.createElement("p");
  var match_selection_prompt_text = response_data["message"]["text"][0];
  var match_selection_prompt_node = document.createTextNode(match_selection_prompt_text);
  match_selection_prompt_para.appendChild(match_selection_prompt_node);
  var insertionPoint = document.getElementById("start_game");
  insertionPoint.appendChild(match_selection_prompt_para);
};

var message_properties = {
  "language_tag": "en",
  "type": "match_selection_prompt"
};

var message_data_to_request = message(message_properties).data();

put_request("/message_content", display_match_selection_prompt_text, message_data_to_request );
