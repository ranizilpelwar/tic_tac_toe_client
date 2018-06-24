document.title = 'Tic Tac Toe';

var applicationMessages;

let requestCreator = new RequestCreator;
let requestCoordinator = new RequestCoordinator(requestCreator);
requestCoordinator.get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  let gameStart = new GameStartPresenter(requestCoordinator);
  gameStart.render();
}, function(error){console.error("Get message_content: Failed");})

