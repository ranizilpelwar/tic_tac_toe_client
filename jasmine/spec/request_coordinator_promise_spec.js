describe("A Request Coordinator", function() {
  describe("get function", function() {
    it("should call open", function() {
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

      requestCoordinator.get("/message_content");
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });
  });

  describe("put function", function() {
    it("should call open", function() {
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

      requestCoordinator.put("/message_content", "");
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });
  });

  describe("post function", function() {
    it("should call open", function() {
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    });

    it("should call send", function() {
      
      let requestCoordinator = new RequestCoordinator;
      spyOn(XMLHttpRequest.prototype, 'send').and.callThrough();

      requestCoordinator.post("/message_content", "");
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });
  });
});