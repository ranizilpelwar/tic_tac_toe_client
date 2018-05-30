function displayGameDetails(elementNameOfInsertionPoint, allMessages){
  console.log("displayGameDetails" + Date.now());
  
  //clear div contents
  var wrapper = document.getElementById("initialization_content");
  var parent = wrapper.parentElement;
  wrapper.remove();
  //Player vs Player

  var fragment = document.createDocumentFragment();

  //containing element
  var wrapper = document.createElement("div");
  wrapper.setAttribute("id", "initialization_content");
  insertText(wrapper, allMessages["messages"]["players_intro"]);

  fragment.appendChild(wrapper);
  parent.appendChild(fragment);

  //player value label or "" if first time

  //Board label

  //Display board

  //current player prompt

  //submit button
}

