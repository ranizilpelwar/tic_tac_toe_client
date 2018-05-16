require 'uri'
require 'net/http'
require 'json'
require_relative './request/request_generator.rb'
require_relative './request/uri_generator.rb'

class TicTacToeClient
  def welcome_message
    route_string = "/message_content"
    data = { "message": {
           "language_tag": "en",
           "type": "welcome"}}
    request = RequestGenerator.new.put(route_string, data)
    response = ResponseRetriever.new.response(route_string, request)
  end

  def match_types
    route_string = "/match_types"
    request = RequestGenerator.new.put(route_string, data)
    response = ResponseRetriever.new.response(route_string, request)
  end
end
