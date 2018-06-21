describe("A Request Coordinator", function() {
  describe("get function", function() {
    it("should call open", function() {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

 it("should return a Promise", function(done) {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(requestCoordinator, 'get').and.callThrough();
      let output = requestCoordinator.get("/message_content");
      expect(output).toEqual(jasmine.any(Promise));
      done();
    });

    it("should return a resolve", function(done) {
      let promisedData = { "messages": "welcome" };
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
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
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

    it("should return a Promise", function(done) {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(requestCoordinator, 'put').and.callThrough();
      let output = requestCoordinator.put("/message_content");
      expect(output).toEqual(jasmine.any(Promise));
      done();
    });

    it("should return a resolve", function(done) {
      let promisedData = { "messages": "welcome" };
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
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
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'open').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(MockXHR.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(MockXHR.prototype, 'send').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(MockXHR.prototype.send).toHaveBeenCalled();
    });

    it("should return a Promise", function(done) {
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(requestCoordinator, 'post').and.callThrough();
      let output = requestCoordinator.post("/message_content");
      expect(output).toEqual(jasmine.any(Promise));
      done();
    });

    it("should return a resolve", function(done) {
      let promisedData = { "messages": "welcome" };
      let callback = function() {return new MockXHR("", 200)};
      let requestCoordinator = new RequestCoordinator(callback);
      spyOn(requestCoordinator, 'post').and.returnValue(Promise.resolve(promisedData));

      requestCoordinator.post("/message_content")
      .then(function(result) {
        expect(requestCoordinator.post).toHaveBeenCalledWith("/message_content");
        expect(result).toBe(promisedData);
      });
      done();
    });

    // it("should return a reject", function(done) {
    //   let promisedData = new Error("Failed");
    //   let callback = function() {return new MockXHR("", 200)};
    //   let requestCoordinator = new RequestCoordinator(callback);
    //   spyOn(requestCoordinator, 'post').and.returnValue(Promise.reject(promisedData));

    //   requestCoordinator.post("/message_content")
    //   .then(function(result) {
    //     expect(requestCoordinator.post).toHaveBeenCalledWith("/message_content");
    //     expect(result).toBe(promisedData);
    //   });
    //   done();
    // });
  });
});