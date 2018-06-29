class URIGenerator {
  constructor() {
//  let site = "https://murmuring-coast-64789.herokuapp.com";
    let site = "http://ec2-18-191-247-154.us-east-2.compute.amazonaws.com/";
    this.getSite = site;
    this.uri = function(route_string) {
      let uri = this.getSite + route_string;
      return uri;
    }
  }
}
