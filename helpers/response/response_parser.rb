require 'json'
require 'tic_tac_toe_rz'

module ResponseParser
  def self.parse(response_data, category, property)
    response_data = JSON.parse(response_data)
    if !category.nil?
      raise TicTacToeRZ::NilReferenceError, "category: #{category}, property: #{property}" if response_data[category].nil? 
      raise TicTacToeRZ::NilReferenceError, "category: #{category}, property: #{property}" if !response_data[category].include?(property)
      response_data[category][property]
    else
      raise TicTacToeRZ::NilReferenceError, "property: #{property}" if !response_data.include?(property)
      response_data[property]
    end
  end
end