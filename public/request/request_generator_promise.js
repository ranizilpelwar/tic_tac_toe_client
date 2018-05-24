function get(route_string){
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
        reject(Error(request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send();
  });
};