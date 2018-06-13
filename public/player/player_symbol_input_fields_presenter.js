class PlayerSymbolInputFieldsPresenter {
  render(parentElement) {
    let input = new InputFieldPresenter;
    let table = document.createElement("table");
    for (var index = 1; index < 3; index++){
        let tr = document.createElement("tr");   
        let td = document.createElement("td");
        let text = applicationMessages["messages"]["player_symbol_prompt"];
        text = text.replace("[1]", index);
        let id = "player" + index + "_symbol";
        input.render(td, text, id);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    input.render(td, applicationMessages["messages"]["first_player_of_game_prompt"], "first_player_symbol_input");
    tr.appendChild(td);
    table.appendChild(tr);
    parentElement.appendChild(table);
  }
}
