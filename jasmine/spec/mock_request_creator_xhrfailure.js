class MockRequestCreatorFailure {

  constructor(expectedResult, statusCode) {
    this.expectedResult = expectedResult;
    this.statusCode = statusCode;
  }
  getRequest() {
    return new MockXHRFailure(this.expectedResult, this.statusCode);
  }
}