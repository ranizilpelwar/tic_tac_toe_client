require 'uri'
require 'net/http'

class URIGenerator
  SITE = "http://localhost:4567"

  def uri(route_string)
    URI(SITE + route_string)
  end

end