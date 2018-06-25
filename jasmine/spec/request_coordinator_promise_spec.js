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

 
    it("should call resolve when the request is successful", function(done) {
      let promisedData = { "messages": "welcome" };
      let mockRequestCreator = new MockRequestCreator(promisedData, 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.get("/message_content", promisedData)
      .then(function(result) {
        expect(result).toBe(promisedData);
      });
      done();
    });

    it("should reject when the response status comes back with an error code", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreator(promisedData, 400);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.get("/message_content", promisedData)
      .then(
        function(result) {}, 
        function(error) {
          expect(error).toEqual(jasmine.any(Error));
        });
      done();
    });

    it("should reject when there is an error in the request", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreatorFailure(promisedData, 400);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.get("/message_content", promisedData)
      .then(
        function(result) {}, 
        function(error) {
          expect(error).toEqual(jasmine.any(Error));
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

    it("should call resolve when the request is successful", function(done) {
      let promisedData = { "messages": "welcome" };
      let mockRequestCreator = new MockRequestCreator(promisedData, 200);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.put("/message_content", promisedData)
      .then(function(result) {
        expect(result).toBe(promisedData);
      });
      done();
    });

    it("should reject when the response status comes back with an error code", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreator(promisedData, 400);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.put("/message_content", promisedData)
      .then(
        function(result) {}, 
        function(error) {
          expect(error).toEqual(jasmine.any(Error));
        });
      done();
    });

    it("should reject when there is an error in the request", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreatorFailure(promisedData, 400);
      let requestCoordinator = new RequestCoordinator(mockRequestCreator);
      requestCoordinator.put("/message_content", promisedData)
      .then(
        function(result) {}, 
        function(error) {
          expect(error).toEqual(jasmine.any(Error));
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

    it("should reject when the response status comes back with an error code", function(done) {
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

    it("should reject when there is an error in the request", function(done) {
      let promisedData = { "errors": {
                              "error_message": "error" 
                            }
      };
      let mockRequestCreator = new MockRequestCreatorFailure(promisedData, 400);
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