require 'sinatra'

set :port, 8080

get '/' do
  File.read(File.join('public', 'index.html'))
end
