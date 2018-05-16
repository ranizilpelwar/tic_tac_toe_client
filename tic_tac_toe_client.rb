require 'uri'
require 'net/http'
require 'json'
require './request/request_generator.rb'

class TicTacToeClient
  def welcome_message
    uri = RequestGenerator.new.uri("/message_content")
    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Put.new(uri)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'
    data = { "message": {
           "language_tag": "en",
           "type": "welcome"}}
    request.body = data.to_json
    response = http.request(request)
    puts "welcome_message response = #{response.read_body}"
  end

  def match_types
    uri = RequestGenerator.new.uri("/match_types")

    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Get.new(uri)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'

    response = http.request(request)
    puts "match_types response = #{response.read_body}"
  end
end
