document.title = 'Tic Tac Toe';
var message_properties;

message_properties = {
  "language_tag": "en",
  "type": "welcome"
};
display_message("start_game", message_properties);

message_properties = {
  "language_tag": "en",
  "type": "match_selection_prompt"
};
display_message("start_game", message_properties);

display_match_types("start_game");

message_properties = {
  "language_tag": "en",
  "type": "player_setup_prompt"
};
display_message("start_game", message_properties);

message_properties = {
  "language_tag": "en",
  "type": "player_symbol_option"
};
display_message("start_game", message_properties);

display_player_input_boxes("start_game");
