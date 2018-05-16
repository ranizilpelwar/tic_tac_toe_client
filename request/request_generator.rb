require 'uri'
require 'net/http'
require 'json'
require_relative 'uri_generator.rb'

class RequestGenerator

  def request(route_string)
    
  end

  def put(route_string, request_content)
    uri = URIGenerator.new.uri(route_string)
    http = Net::HTTP.new(uri.host, uri.port)

    request = Net::HTTP::Put.new(uri)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'
    request.body = request_content.to_json
    response = http.request(request)
    response.read_body
  end
end