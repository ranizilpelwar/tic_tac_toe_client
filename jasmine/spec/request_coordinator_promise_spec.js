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

  //   it("should return a Promise", function(done) {
  //     let callback = function() {return new MockXHR("", 200)};
  //     let requestCoordinator = new RequestCoordinator(callback);
  //     spyOn(requestCoordinator, 'get').and.callThrough();

  //     // requestCoordinator.get("/message_content")
  //     //   .then(function(result){
  //     //     expect(result).toBe(true);
  //     //     done();
  //     //  });

  //     let output = requestCoordinator.get("/message_content");
  //     expect(output).toEqual(jasmine.any(Promise));

  //   });
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
  });
});