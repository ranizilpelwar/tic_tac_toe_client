var message = function(message_properties){

  var message_data = {
        "message": {
          "language_tag": message_properties["language_tag"],
          "type": message_properties["type"]
        }
      };

  return {
    data: function() {
      return JSON.stringify(message_data);
    }
  }
};