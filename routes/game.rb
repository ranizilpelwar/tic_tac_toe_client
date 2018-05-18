require 'sinatra'
require 'sinatra/reloader'
require 'json'
require_relative '../tic_tac_toe_client.rb'
require_relative '../helpers/response/response_parser.rb'

post '/game' do
  

  erb :game, :layout => :layout
end