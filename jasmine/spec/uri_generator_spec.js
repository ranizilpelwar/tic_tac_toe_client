describe("URI Generator", function() {
  it("should return a url containing the site and route_string", function() {
    var result = uri_generator("/message_content");
    result.site = "test"
    expect(result.uri()).toEqual("http://localhost:4567/message_content");
  });
});