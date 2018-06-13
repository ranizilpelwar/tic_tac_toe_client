document.title = 'Tic Tac Toe';

var applicationMessages;

let requestGenerator = new RequestGenerator;
requestGenerator.get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  let gameStart = new GameStartPresenter;
  gameStart.render();
}, function(error){console.error("Get message_content: Failed");})

