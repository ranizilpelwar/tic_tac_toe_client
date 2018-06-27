require "bundler/capistrano"

set :application, "tic_tac_toe_client"
set :repo_url, "https://github.com/ranizilpelwar/tic_tac_toe_client.git"
set :deploy_to, "/var/www/tic_tac_toe_client"

# namespace :deploy do

#   desc "Restart application"
#   task :restart do
#     on roles(:app), in: :sequence, wait: 5 do
#       execute :touch, release_path.join("tmp/restart.txt")
#     end
#   end

#   after :finishing, "deploy:cleanup"

# end