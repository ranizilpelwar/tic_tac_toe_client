describe("A Request Coordinator", function() {
  describe("get function", function() {
    it("should call open", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

    it("should return a resolve", function(done) {
      let promisedData = { "messages": "welcome" };
      let mockRequestCreator = new MockRequestCreator(promisedData, 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(requestCoordinator, 'get').and.returnValue(Promise.resolve(promisedData));

      requestCoordinator.get("/message_content")
      .then(function(result) {
        expect(requestCoordinator.get).toHaveBeenCalledWith("/message_content");
        expect(result).toBe(promisedData);
      });
      done();
    });
  });

  describe("put function", function() {
    it("should call open", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

    it("should return a resolve", function(done) {
      let promisedData = { "messages": "welcome" };
      let mockRequestCreator = new MockRequestCreator(promisedData, 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(requestCoordinator, 'put').and.returnValue(Promise.resolve(promisedData));

      requestCoordinator.put("/message_content")
      .then(function(result) {
        expect(requestCoordinator.put).toHaveBeenCalledWith("/message_content");
        expect(result).toBe(promisedData);
      });
      done();
    });
  });

  describe("post function", function() {
    it("should call open", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send when post request is made", function() {
      let mockRequestCreator = new MockRequestCreator("", 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

    it("should call resolve when the request is successful", function(done) {
      let promisedData = { "messages": "welcome" };
      let mockRequestCreator = new MockRequestCreator(promisedData, 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.post("/message_content", promisedData)
      .then(function(result) {
        expect(result).toBe(promisedData);
      });
      done();
    });

    it("should reject when there is an error in the request", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreator(promisedData, 400);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.post("/message_content", promisedData)
      .then(
        function(result) {}, 
        function(error) {
          expect(error).toEqual(jasmine.any(Error));
        });
      done();
    });

  });
});