describe("Request Generator", function() {
  it("should create a get request for match_types", function() {
    var result = request_generator();
    console.log("result = " + result);
    //var request = result.get("/match_types");
    //var content = request.body;
    var expected_result_for_matches = '{\"matches\":[{\"player1_type\":\"Human\",\"player2_type\":\"Human\"},{\"player1_type\":\"Human\",\"player2_type\":\"Computer\"},{\"player1_type\":\"Computer\",\"player2_type\":\"Computer\"}],\"errors\":{\"error_message\":\"\"}}';
    expect(result).toEqual(expected_result_for_matches);
  });
});