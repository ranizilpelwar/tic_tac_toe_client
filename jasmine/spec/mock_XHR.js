class MockXHR {
  constructor(expectedResult, statusCode) {
    this.result = expectedResult;
    this.status = statusCode;
    this.onload = function() {};
    this.responseType = "json";
  }

  getXHR() {
    let httpClient = new MockXHR();
    return httpClient;
  }

  open(httpVerb, url) {

  }

  send() {

  }
}