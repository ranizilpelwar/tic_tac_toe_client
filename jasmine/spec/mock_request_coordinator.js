class MockRequestCoordinator {
  constructor(requestCreator) {
    this.requestCreator = requestCreator;
  }

  get(route_string) {

  }

  put(route_string, json_data_to_send) {
    let gameDetails = {
        "game": {
          "language_tag": "en",
          "record_moves": false,
          "match_number": 2,
          "board": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
          "last_move_for_player1": 4,
          "last_move_for_player2": 5
        }, 
        "errors": {
          "error_message": ""
        }
      };
    var promiseHelper;
    var newPromise = new Promise(function(resolve, reject) {
      promiseHelper = {
        resolve: resolve
      };
    });
    return newPromise;
  }

  post(route_string, json_data_to_send) {

  }
}