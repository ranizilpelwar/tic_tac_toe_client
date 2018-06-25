class MockRequestCreator {

  constructor(expectedResult, statusCode) {
    this.expectedResult = expectedResult;
    this.statusCode = statusCode;
  }
  getRequest() {
    return new MockXHR(this.expectedResult, this.statusCode);
  }
}