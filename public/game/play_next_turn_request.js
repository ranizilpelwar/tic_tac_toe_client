class PlayNextTurnRequest {
  getRequest(gameDetails, currentPlayerInputForNextMove) {
    request = {};
      nextTurn = {
        "actions": {
           "tile_on_board": currentPlayerInputForNextMove
        }
      };
      for(var key in gameDetails){
        if(gameDetails.hasOwnProperty(key)){
          request[key]=gameDetails[key];
        }
      }
      for(var key in nextTurn){
        if(nextTurn.hasOwnProperty(key)){
          request[key]=nextTurn[key];
        }
      }
      return request;
  }
}