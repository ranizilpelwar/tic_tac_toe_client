class URIGenerator {
  constructor() {
    let site = "http://localhost:4567";
    this.getSite = site;
    this.uri = function(route_string) {
      let uri = this.getSite + route_string;
      return uri;
    }
  }
}
