require_relative './application_controller.rb'

class WebsiteController < ApplicationController

  get '/' do
    puts "Hello Tic TAC Toe!!!!"
  end

end