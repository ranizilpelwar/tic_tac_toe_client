document.title = 'Form Tic Tac Toe';

var applicationMessages;


get("/message_content")
.then(function(responseData){
  applicationMessages = responseData;
  displayGameInitializationForm();
}, function(error){console.error("Get message_content: Failed");})
.then(function(){
  return get("/match_types");
}, function(error){console.error("Get match_types: Failed");})
.then(function(responseData){
  var div = document.getElementById("match_types");
  displayMatchTypes(div, responseData);
}, function(error){console.error("Display match_types: Failed");})
