require 'uri'
require 'net/http'
require 'json'
require_relative '../request/uri_generator.rb'

class ResponseRetriever
  
  def http(route_string)
    site = URIGenerator.new.uri(route_string)
    Net::HTTP.new(site.host, site.port)
  end

  def response(route_string, request)
    http = http(route_string)
    response = http.request(request)
    response.read_body
  end
end