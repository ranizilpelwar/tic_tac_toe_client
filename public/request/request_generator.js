var request_generator = function(){
  var xmlHttp = new XMLHttpRequest();
  var url = "http://localhost:4567/match_types";
  
  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      myFunction(data);
    }
  };

  xmlHttp.open("GET", url, true);
  
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  
  xmlHttp.send();
};

function myFunction(data) {
  console.log("myFunction contents");
  console.log("response data = " + data);
};