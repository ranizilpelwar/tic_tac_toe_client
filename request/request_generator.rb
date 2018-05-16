require 'uri'
require 'net/http'
require 'json'

class RequestGenerator

  SITE = "http://localhost:4567"

  def uri(route_string)
    URI(SITE + route_string)
  end
end