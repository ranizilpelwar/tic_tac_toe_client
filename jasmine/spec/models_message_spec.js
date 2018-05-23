describe("A message model", function() {
  it ("returns a message json object", function() {
    var message_properties = {
      "language_tag": "en",
      "type": "match_selection_prompt"
    };
    var message_object = message(message_properties);
    var json = message_object.data();
    console.log("message object json:");
    console.log(json);
    expect(true).toEqual(false);
  });
});