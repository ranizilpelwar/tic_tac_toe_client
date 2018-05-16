require 'uri'
require 'net/http'
require 'json'
require_relative 'uri_generator.rb'

class RequestGenerator

  def put(route_string, request_content)
    uri = URIGenerator.new.uri(route_string)
    request = Net::HTTP::Put.new(uri)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'
    request.body = request_content.to_json

    http = http(route_string)
    response = http.request(request)
    response.read_body
  end


  
  def http(route_string)
    site = URIGenerator.new.uri(route_string)
    Net::HTTP.new(site.host, site.port)
  end


  def responsetest(route_string, request_content)
    http = URIGenerator.new.http(route_string)
    response = http.request(request)
    response.read_body
  end


end