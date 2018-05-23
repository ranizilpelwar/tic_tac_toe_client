document.title = 'Tic Tac Toe';

//get the text from the web server
//display the text when the response is received asynchronously
//which means display it in the callback function

var display_match_selection_prompt_text = function(response_data){
  var match_selection_prompt_para = document.createElement("p");
  var match_selection_prompt_text = response_data["message"]["text"][0];
  var match_selection_prompt_node = document.createTextNode(match_selection_prompt_text);
  match_selection_prompt_para.appendChild(match_selection_prompt_node);
  var insertionPoint = document.getElementById("start_game");
  insertionPoint.appendChild(match_selection_prompt_para);
};

var requested_message_type = JSON.stringify({
  "message": {
    "language_tag": "en",
    "type": "match_selection_prompt"
  }
});

put_request("/message_content", display_match_selection_prompt_text, requested_message_type);