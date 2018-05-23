var request_generator = function(route_string, callback){
  var xmlHttp = new XMLHttpRequest();
  var url = uri_generator(route_string).uri();

  var request = function(){
    xmlHttp.responseType = "json";
    
    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.response);
      }
    };
  };
  return {
    get: function() {
      xmlHttp.open("GET", url, true);
      request();
      xmlHttp.send();
    },
    post: function(data_to_send){
      xmlHttp.open("POST", url, true);
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      request();
      xmlHttp.send(data_to_send);
    },
    put: function(data_to_send){
      xmlHttp.open("PUT", url, true);
      xmlHttp.setRequestHeader("Content-Type", "application/json");
      request();
      xmlHttp.send(data_to_send);
    }
  }
};

var get_request = function(route_string, callback){
  request_generator(route_string, callback).get();
};

var post_request = function(route_string, callback, data_to_send){
  request_generator(route_string, callback).post(data_to_send);
};

var put_request = function(route_string, callback, data_to_send){
  request_generator(route_string, callback).put(data_to_send);
};