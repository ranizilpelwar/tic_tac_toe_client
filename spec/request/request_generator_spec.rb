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
end