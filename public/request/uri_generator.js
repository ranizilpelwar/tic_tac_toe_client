var uri_generator = function(route_string) {
  var site = "http://localhost:4567";
  return {
    uri: function() {
      var uri = site + route_string;
      return uri;
    }
  }
};