document.title = 'Form Tic Tac Toe';

var applicationMessages;

get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  displayGameInitializationForm();
}, function(error){console.error("Get message_content: Failed");})

