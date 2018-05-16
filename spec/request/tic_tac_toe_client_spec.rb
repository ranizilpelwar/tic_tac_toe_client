require 'rspec'
require 'json'
require_relative '../../tic_tac_toe_client.rb'

RSpec.describe "A TicTacToeClient" do

  context "method called welcome_message" do
    it "returns the expected json response when requesting the welcome message" do
      expected_result = {"message"=>{
                            "language_tag"=>"en", 
                            "type"=>"welcome", 
                            "text"=>["Welcome to Tic Tac Toe! Let's play a game!"]}, 
                          "errors"=>{
                            "error_message"=>""}}
      actual_result = JSON.parse(TicTacToeClient.new.welcome_message)
      expect(actual_result).to eq(expected_result)
    end
  end

  context "method called match_types" do
    it "returns the expected json response when requesting the match_types" do
      expected_result = {"matches"=>
        [{"player1_type"=>"Human", "player2_type"=>"Human"}, 
          {"player1_type"=>"Human", "player2_type"=>"Computer"}, 
          {"player1_type"=>"Computer", "player2_type"=>"Computer"}], 
          "errors"=>{"error_message"=>""}}
      actual_result = JSON.parse(TicTacToeClient.new.match_types)
      expect(actual_result).to eq(expected_result)
    end
  end
end