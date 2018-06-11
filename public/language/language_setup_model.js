var languageSetupRequest = function(language_tag){
  requested_language = { "language_tag": language_tag };
  return makeRequestable(requested_language);
};