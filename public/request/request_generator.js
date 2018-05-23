var request_generator = function(route_string, callback){
  var xmlHttp = new XMLHttpRequest();
  var url = uri_generator(route_string).uri();
  
  xmlHttp.open("GET", url, true);
  xmlHttp.responseType = "json";
  xmlHttp.setRequestHeader("Content-Type", "application/json");
  
  xmlHttp.send();

  xmlHttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.response);
    }
  };
};
