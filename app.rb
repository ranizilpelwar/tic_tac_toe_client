require 'sinatra'
require 'sinatra/reloader'
require 'json'
require_relative './tic_tac_toe_client.rb'
require_relative './helpers/response/response_parser.rb'


set :port, 8080

get '/' do
  @title = "Tic Tac Toe"
  response = TicTacToeClient.new.message("en", "welcome")
  @intro_text = ResponseParser.parse(response, "message", "text")

  response = TicTacToeClient.new.message("en", "match_selection_prompt")
  @match_selection_prompt = ResponseParser.parse(response, "message", "text")

  response = TicTacToeClient.new.match_types
  @match_types = ResponseParser.parse(response, nil, "matches")
  erb :intro, :layout => :layout
end

