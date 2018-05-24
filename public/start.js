document.title = 'Tic Tac Toe';

var message_properties;

message_properties = {
  "language_tag": "en",
  "type": "welcome", 
  "parameters": []
};

var convertedData = message(message_properties).data();

put("/message_content", convertedData)
.then(function(responseData){
  displayMessage(responseData, "start_game");
}, function(error){console.error("Display message_content: welcome Failed");})
.then(function(){
  message_properties["type"] = "match_selection_prompt";
  convertedData = message(message_properties).data();
  return put("/message_content", convertedData);
}, function(error) {console.error("PUT message_content: match_selection_prompt Failed");})
.then(function(responseData){
  displayMessage(responseData, "start_game");
}, function(error) {console.error("Display message_content: match_selection_prompt Failed");})
.then(function(){
  return get("/match_types");
}, function(error) {console.error("GET match_types Failed");})
.then(function(responseData){
  displayMatchTypes(responseData, "start_game");
}, function(error) {console.error("Display match_types Failed");})
.then(function(){
  message_properties["type"] = "player_setup_prompt";
  convertedData = message(message_properties).data();
  return put("/message_content", convertedData);
}, function(error) {console.error("PUT message_content: player_setup_prompt Failed");})
.then(function(responseData){
  displayMessage(responseData, "start_game");
}, function(error) {console.error("Display message_content: player_setup_prompt Failed");})
.then(function(){
  message_properties["type"] = "player_symbol_option";
  convertedData = message(message_properties).data();
  return put("/message_content", convertedData);
}, function(error) {console.error("PUT message_content: player_symbol_option Failed");})
.then(function(responseData){
  displayMessage(responseData, "start_game");
}, function(error) {console.error("Display message_content: player_symbol_option Failed");})
.then(function(){
  displayPlayerSymbolInputs("start_game");
}, function(error) {console.error("Display player_input_boxes Failed");});

