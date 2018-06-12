var get = function(route_string){
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    var url = uri_generator(route_string).uri();
    request.open("GET", url);
    request.onload = function() {
      if(request.status == 200){
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText + request.response["errors"]["error_message"]));
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send();
  });
};

var put = function(route_string, json_data_to_send) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    var url = uri_generator(route_string).uri();
    request.open("PUT", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if(request.status == 200){
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText + request.response["errors"]["error_message"]));
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send(json_data_to_send);
  });
};

var post = function(route_string, json_data_to_send) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.responseType = "json";
    var url = uri_generator(route_string).uri();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
      if(request.status == 200){
        resolve(request.response);
      }
      else {
        reject(Error(request.statusText + request.response["errors"]["error_message"]));
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send(json_data_to_send);
  });
};