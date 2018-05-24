var display_message = function(element_id, message_properties) {
  var display_match_selection_prompt_text = function(response_data){
    var insertionPoint = document.getElementById(element_id);
    var text_array = response_data["message"]["text"];
    insert_text(insertionPoint, text_array);
  };

  var message_data_to_request = message(message_properties).data();

  put_request("/message_content", display_match_selection_prompt_text, message_data_to_request);
};

// var display_match_types = function(element_id) {
//   var display_matches = function(response_data){
//     var insertionPoint = document.getElementById(element_id);
//     var matches = response_data["matches"];

//     var table = document.createElement('table');
//     for (var index = 0; index < matches.length; index++){
//         var tr = document.createElement('tr');   
//         var td = document.createElement('td');
//         var radio_button = document.createElement("input");
//         radio_button.setAttribute("type", "radio");
//         radio_button.setAttribute("name", "match_number");
//         radio_button.setAttribute("value", index+1);
//         var text = matches[index]["player1_type"] + " vs " + matches[index]["player2_type"];
//         var textNode = document.createTextNode(text);
//         td.appendChild(radio_button);
//         td.appendChild(textNode);
//         tr.appendChild(td);
//         table.appendChild(tr);
//     }
//     insertionPoint.appendChild(table);
//   };
//   get_request("/match_types", display_matches);
// };

var display_player_input_boxes = function(element_id) {
  // var callback = function(response_data){
    var insertionPoint = document.getElementById(element_id);
    
    var table = document.createElement('table');
    for (var index = 1; index < 3; index++){
        var tr = document.createElement('tr');   
        var td = document.createElement('td');
        
        var text = "Symbol for Player " + index + ":";
        var textNode = document.createTextNode(text);
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        var id = "player" + index + "_symbol"
        input.setAttribute("id", id);
        td.appendChild(textNode);
        td.appendChild(input);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    insertionPoint.appendChild(table);
  // };
  // var message_properties = {
  //   "language_tag": "en",
  //   "type": "player_symbol_prompt"
  // };
  // var message_data_to_request = message(message_properties).data();

  // put_request("/message_content", callback, message_data_to_request);
};