document.title = 'Tic Tac Toe';

var display_match_selection_prompt_text = function(response_data){
  var insertionPoint = document.getElementById("start_game");
  var text_array = response_data["message"]["text"];
  insert_text(insertionPoint, text_array);
};

var message_properties = {
  "language_tag": "en",
  "type": "match_selection_prompt"
};

var message_data_to_request = message(message_properties).data();

put_request("/message_content", display_match_selection_prompt_text, message_data_to_request);

