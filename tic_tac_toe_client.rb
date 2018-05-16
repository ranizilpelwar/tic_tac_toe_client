require 'uri'
require 'net/http'
require 'json'
require_relative './helpers/request/request_generator.rb'
require_relative './helpers/request/uri_generator.rb'

class TicTacToeClient
  def message(language_tag, message_type)
    route_string = "/message_content"
    data = { "message": {
           "language_tag": language_tag,
           "type": message_type}}
    request = RequestGenerator.new.put(route_string, data)
    response = ResponseRetriever.new.response(route_string, request)
  end

  def match_types
    route_string = "/match_types"
    request = RequestGenerator.new.get(route_string)
    response = ResponseRetriever.new.response(route_string, request)
  end
end
