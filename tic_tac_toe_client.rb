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
    uri = URIGenerator.new.uri("/match_types")

    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Get.new(uri)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'

    response = http.request(request)
    response.read_body
    #puts "match_types response = #{response.read_body}"
  end
end
