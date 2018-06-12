var languageSetupRequest = function(language_tag){
  requested_language = { "language_tag": language_tag };
  return DataConverter.makeRequestable(requested_language);
};