require 'uri'
require 'net/http'
require 'json'
require_relative 'uri_generator.rb'
require_relative '../response/response_retriever.rb'

class RequestGenerator

  def put(route_string, request_content)
    uri = URIGenerator.new.uri(route_string)
    request = Net::HTTP::Put.new(uri)
    request.body = request_content.to_json
    request_headers!(request)
  end

  def get(route_string)
    uri = URIGenerator.new.uri(route_string)
    request = Net::HTTP::Get.new(uri)
    request_headers!(request)
  end

  def request_headers!(request)
    request["Content-Type"] = 'application/json'
    request["Cache-Control"] = 'no-cache'
    request
  end

end