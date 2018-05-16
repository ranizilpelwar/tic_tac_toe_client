require 'rspec'
require 'json'
require './request/request_generator.rb'

RSpec.describe "A RequestGenerator" do
  context "method called url" do
    it "returns a uri with provided route string" do
      request = RequestGenerator.new
      actual_uri = request.uri("/match_types")
      expected_uri = URI("http://localhost:4567/match_types")
      expect(actual_uri).to eq(expected_uri)
    end
  end

  context "method called put" do
    it "returns the expected json response when requesting the welcome message" do
      expected_result = {"message"=>{
                            "language_tag"=>"en", 
                            "type"=>"welcome", 
                            "text"=>["Welcome to Tic Tac Toe! Let's play a game!"]}, 
                          "errors"=>{
                            "error_message"=>""}}
      request_data = { "message": {
                 "language_tag": "en",
                 "type": "welcome"}}
      actual_result = JSON.parse(RequestGenerator.new.put("/message_content", request_data))
      expect(actual_result).to eq(expected_result)
    end
  end
end