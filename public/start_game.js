document.title = 'Tic Tac Toe';

var applicationMessages;

get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  displayGameInitializationContent();
}, function(error){console.error("Get message_content: Failed");})

