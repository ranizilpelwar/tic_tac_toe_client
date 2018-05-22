var request_generator = function(){
  var xmlHttp = new XMLHttpRequest();
  var url = "http://localhost:4567/match_types";
  var data = "";
  
  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = this.response;
      get_data(data);
    }
  };

  xmlHttp.open("GET", url, true);
  xmlHttp.responseType = "json";
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  
  xmlHttp.send();
};

function get_data(data) {
  console.log("myFunction contents");
  console.log("response data = " + data);
  console.log("response length = " + data.length);
  console.log(data);
  return data;
};