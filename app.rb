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

  response = TicTacToeClient.new.message("en", "player_setup_prompt")
  @player_setup_prompt = ResponseParser.parse(response, "message", "text")

  response = TicTacToeClient.new.message("en", "player_symbol_option")
  @player_symbol_option = ResponseParser.parse(response, "message", "text")

  
  erb :intro, :layout => :layout
end

