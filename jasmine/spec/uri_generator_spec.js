describe("A URI Generator", function() {
  describe("method called uri", function() {
    it("should return a string containing the predefined site and provided route string", function() {
      let result = new URIGenerator;
      expect(result.uri("/message_content")).toEqual("http://localhost:4567/message_content");
    });
  });

  describe("method called getSite", function() {
    it("should return the predefined site", function() {
      let result = new URIGenerator;
      result.site = "ensure site doesnt change";
      expect(result.getSite).toEqual("http://localhost:4567");
    });
  });
});