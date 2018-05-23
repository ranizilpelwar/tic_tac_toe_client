var results = "initial value";
var get_results = function(data){
  results = data;
  console.log("inside test callback function:");
  console.log(data);
  console.log(data["matches"][0]["player1_type"]);
  console.log("results:");
  console.log(results);
};

// Code under test
var flag = false;
console.log("initial flag value:");
console.log(flag);

function testAsync(done) {
    // Wait two seconds, then set the flag to true
    console.log("Default timeout = " + jasmine.DEFAULT_TIMEOUT_INTERVAL);
    setTimeout(function () {
        flag = true;
        console.log("inside testAsync");
        request_generator(get_results);
        // Invoke the special done callback
        done();
        console.log("after testAsync done");
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL);
}

// Specs
describe("Testing async calls with beforeEach and passing the special done callback around", function () {
    console.log("beforeeach start:")
    beforeEach(function (done) {
      console.log("beforeeach 1");
        // Make an async call, passing the special done callback        
        testAsync(done);
      console.log("beforeeach end");
      console.log("flag value = " + flag)
      console.log("results:");
      console.log(results);
    });

    it("Should be true if the async call has completed", function () {
        console.log("before expect, flag value = " + flag);
        console.log("before expect, results value = ");
        console.log(results);
        expect(flag).toEqual(true);
    });

});
