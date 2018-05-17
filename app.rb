require 'sinatra'
require 'sinatra/reloader'
require 'json'
require_relative './tic_tac_toe_client.rb'
require_relative './helpers/response/response_parser.rb'


set :port, 8080

get '/' do
  response = TicTacToeClient.new.message("en", "welcome")
  @intro_text = ResponseParser.parse(response, "message", "text")
  @title = "Tic Tac Toe"
  erb :intro, :layout => :layout
end

