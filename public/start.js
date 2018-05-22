document.title = 'Tic Tac Toe';
var match_selection_prompt_para = document.createElement("p");

var match_selection_prompt_node = document.createTextNode("match_selection_prompt");
match_selection_prompt_para.appendChild(match_selection_prompt_node);

var insertionPoint = document.getElementById("start_game");
insertionPoint.appendChild(match_selection_prompt_para);