class URIGenerator {
  constructor() {
    let site = "https://murmuring-coast-64789.herokuapp.com";
    this.getSite = site;
    this.uri = function(route_string) {
      let uri = this.getSite + route_string;
      return uri;
    }
  }
}
