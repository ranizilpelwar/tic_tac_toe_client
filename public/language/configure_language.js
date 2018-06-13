var configureLanguage = function(){
  let inputElements = document.getElementsByTagName("input");
  let languages = Array.from(inputElements);
  let checkedLanguages = languages.filter(x => x.type === "radio" && x.checked === true);
  languageValue = checkedLanguages[0].value;
  let index = languageValue - 1;
  let languagesArray = applicationMessages["languages"];
  let languageTag = languagesArray[index]["language_tag"];
  refreshApplicationMessages(languageTag);
};