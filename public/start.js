document.title = 'Tic Tac Toe';

// get("/match_types").then(function(responseData) {
//   console.log("GET match_types Success");
//   displayMatchTypes(responseData, "start_game");
// }, function(error) {
//   console.error("GET match_types Failed");
// })



var message_properties;

message_properties = {
  "language_tag": "en",
  "type": "welcome", 
  "parameters": []
};

var convertedData = message(message_properties).data();

put("/message_content", convertedData).then(function(responseData){
  displayMessage(responseData, "start_game");
}, function(error){console.error("PUT message_content welcome Failed");})
.then(function(){
  return get("/match_types");
}, function(error) {console.error("GET match_types Failed");})
.then(function(responseData){
  console.log("GET match_types Success");
  displayMatchTypes(responseData, "start_game");
}, function(error) {console.error("GET match_types Failed");}
);










// display_message("start_game", message_properties);

// message_properties = {
//   "language_tag": "en",
//   "type": "match_selection_prompt", 
//   "parameters": []
// };
// display_message("start_game", message_properties);

// display_match_types("start_game");

// message_properties = {
//   "language_tag": "en",
//   "type": "player_setup_prompt", 
//   "parameters": []
// };
// display_message("start_game", message_properties);

// message_properties = {
//   "language_tag": "en",
//   "type": "player_symbol_option", 
//   "parameters": []
// };
// display_message("start_game", message_properties);

// display_player_input_boxes("start_game");
