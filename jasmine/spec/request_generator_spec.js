var results = "initial value";

var get_results = function(data){
  results = data;
  console.log("inside test callback function:");
  console.log(data);
  console.log(data["matches"][0]["player1_type"]);
  console.log("results:");
  console.log(results);
};

var post_results = function(data){
  results = data;
  console.log("inside post_results callback function:");
  console.log(data);
  console.log("board:");
  console.log(data["game"]["board"]);
};

// Code under test
var flag = false;
console.log("initial flag value:");
console.log(flag);

function testGet(done) {
    // Wait two seconds, then set the flag to true
    console.log("Default timeout = " + jasmine.DEFAULT_TIMEOUT_INTERVAL);
    setTimeout(function () {
        flag = true;
        console.log("inside testGet");
        get_request("/match_types", get_results);
        // Invoke the special done callback
        done();
        console.log("after testGet done");
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL);
};

function testPost(done) {
    // Wait two seconds, then set the flag to true
    console.log("Default timeout = " + jasmine.DEFAULT_TIMEOUT_INTERVAL);
    setTimeout(function () {
        flag = true;
        console.log("inside testPost");
        var data = JSON.stringify({
          "match_number": 2,
          "first_player_symbol": "X",
          "second_player_symbol": "Y"
        }); 
        post_request("/game", post_results, data);
        // Invoke the special done callback
        done();
        console.log("after testPost done");
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL);
};

// Specs
describe("TestGET: Testing async calls with beforeEach and passing the special done callback around", function () {
    console.log("beforeeach start:");
    beforeEach(function (done) {
      console.log("beforeeach 1");
        // Make an async call, passing the special done callback        
        testGet(done);
      console.log("beforeeach end");
      console.log("flag value = " + flag)
      console.log("results:");
      console.log(results);
    });

    it("TestGET: Should be true if the async call has completed", function () {
        console.log("before expect, flag value = " + flag);
        console.log("before expect, results value = ");
        console.log(results);
        expect(flag).toEqual(true);
    });
});

describe("TestPost: Post request for /game returns a game object", function() {
  console.log("beforeeach start:");
    beforeEach(function (done) {
      console.log("beforeeach 1");
        // Make an async call, passing the special done callback        
        testPost(done);
      console.log("beforeeach end");
    });

    it("TestPost: Should be true if the async call has completed", function () {
        expect(flag).toEqual(true);
    });
});
