document.title = 'Form Tic Tac Toe';

var applicationMessages;

let requestCoordinator = new RequestCoordinator;
requestCoordinator.get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  let requestCoordinator = new RequestCoordinator;
  let gameStart = new GameStartFormPresenter(requestCoordinator);
  gameStart.render();
}, function(error){console.error("Get message_content: Failed");})

