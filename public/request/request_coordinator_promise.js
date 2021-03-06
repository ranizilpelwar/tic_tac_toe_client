class RequestCoordinator {

  constructor(requestCreator) {
    this.requestCreator = requestCreator;
  }

  get(route_string) {
    let request = this.requestCreator.getRequest();
    return new Promise (
        function(resolve, reject) {
          request.responseType = "json";
          var url = new URIGenerator().uri(route_string);
          request.open("GET", url);
          request.onload = function() {
            if(request.status == 200) {
              resolve(request.response);
            }
            else {
              reject(new Error(request.statusText + request.response["errors"]["error_message"]));
            }
          };
          request.onerror = function() {
            reject(new Error("Network Error"));
          };
          request.send();
        }
    );
  }

  put(route_string, json_data_to_send) {
    let request = this.requestCreator.getRequest();
    return new Promise (
      function(resolve, reject) {
        request.responseType = "json";
        var url = new URIGenerator().uri(route_string);
        request.open("PUT", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function() {
          if(request.status == 200) {
            resolve(request.response);
          }
          else {
            reject(new Error(request.statusText + request.response["errors"]["error_message"]));
          }
        };
        request.onerror = function() {
          reject(new Error("Network Error"));
        };
        request.send(json_data_to_send);
      }
    );
  }

  post(route_string, json_data_to_send) {
    let request = this.requestCreator.getRequest();
    return new Promise(
      function(resolve, reject) {
        request.responseType = "json";
        var url = new URIGenerator().uri(route_string);
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function() {
          if(request.status == 200) {
            resolve(request.response);
          }
          else {
            reject(new Error(request.statusText + request.response["errors"]["error_message"]));
          }
        };
        request.onerror = function() {
          reject(new Error("Network Error"));
        };
        request.send(json_data_to_send);
      }
    );
  }
}
