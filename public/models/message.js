var message = function(message_properties){

  var message_data = {
        "message": {
          "language_tag": message_properties["language_tag"],
          "type": message_properties["type"],
          "parameters": message_properties["parameters"]
        }
      };

  return {
    data: function() {
      return data_converter().convert(message_data);
    }
  }
};