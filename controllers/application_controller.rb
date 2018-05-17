require 'sinatra/base'
require 'sinatra/reloader'

class ApplicationController < Sinatra::base
  set :views, File.expand_path('../views', __FILE__)

  get '/' do
    puts "HELLOOOOO!!!!"
  end
end
