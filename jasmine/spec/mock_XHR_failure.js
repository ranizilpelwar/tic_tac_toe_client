class MockXHRFailure {
  constructor(expectedResult, statusCode) {
    this.result = expectedResult;
    this.status = statusCode;
    this.responseType = "json";
    this.statusText = statusCode;
  }

  open(httpVerb, url) {}

  send() { 
    this.response = this.result;
    this.onerror(); 
  }

  setRequestHeader(contentType, format) {}

}