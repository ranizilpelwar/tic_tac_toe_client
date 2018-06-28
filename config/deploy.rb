
set :application, "tic_tac_toe_client"
set :repo_url, "git@github.com:ranizilpelwar/tic_tac_toe_client.git"
set :deploy_to, "/var/www/tic_tac_toe_client"
set :ssh_options, {
  forward_agent: true,
  auth_methods: %w[publickey],
  keys: %w[/Users/ranizilpelwar/documents/github/tic_tac_toe_client/Admin.pem]
  #keys: %w[/users/ranizilpelwar/.ssh/id_rsa.pub]
}
# namespace :deploy do

#   desc "Restart application"
#   task :restart do
#     on roles(:app), in: :sequence, wait: 5 do
#       execute :touch, release_path.join("tmp/restart.txt")
#     end
#   end

#   after :finishing, "deploy:cleanup"

# end