//var stateDictionary = require('/data/states.js');

function paintVisibleMembers(members, stateFilter){
  console.log("paintVisibleMembers:");
  var leftColumn = document.getElementById("left-member-container");
  var rightColumn = document.getElementById("right-member-container");
  var filteredMembers = filterMembersByState(members, stateFilter);

  var addedItems = 0;
  for(var i = 0; i < filteredMembers.length; i++) {
      if(i <= Math.floor(filteredMembers.length / 2)){
        leftColumn.appendChild(createMemberNode(filteredMembers[i]));
        addedItems++;
      } else {
        rightColumn.appendChild(createMemberNode(filteredMembers[i]));
        addedItems++;
      }
  }
  console.log("added items");
  console.log(addedItems);
}

function createMemberNode(member){
  //<a class="hvr-grow" href=<%= `/members/${members[i].id}` %> >
  var div = document.createElement("div");
  div.setAttribute("class", "member-info");
  var a = document.createElement("a");
  a.setAttribute("class", "hvr-grow");
  a.setAttribute("href", `/members/${member.id}`);
  div.appendChild(a);
  //<span class="member-info" state='<%= members[i].state %>'><%= members[i].first_name + " " + members[i].last_name + ": " + members[i].state  %></span>
  var childSpan = document.createElement("span");
  childSpan.setAttribute("state", `${member.state}`);
  childSpan.innerText = `${member.first_name} ${member.last_name}: ${member.state}`;
  a.appendChild(childSpan);
  var stateFlagImg = document.createElement("img");
  stateFlagImg.setAttribute("class", "member-state-flag");
  //TODO: add ability to import states.js file in client side code
  //stateFlagImg.setAttribute("src", `flags/${states[member.state].toLowerCase()}-flag.jpg`);
  div.appendChild(stateFlagImg);
  return div;
}

function filterMembersByState(members, stateFilter){
  console.log("in filterMembersByState");
  console.log("stateFilter:");
  console.log(stateFilter);
  if(stateFilter == ""){
    console.log("returning basic memebrs list");
    return members;
  }
  var filteredMembers = [];
  for(var i = 0; i < members.length; i++){
    if(members[i].state == stateFilter){
      console.log(`pushing a new filtered member`);
      console.log(members[i])
      filteredMembers.push(members[i]);
    }
  }
  return filteredMembers;
}

function stateFilterFunction(allMembers, state){
  console.log("called stateFilter function:");
  console.log(state);
  clearCurrentMembers();
  console.log("called clearCurrentMembers");
  paintVisibleMembers(allMembers, state)
}

function clearCurrentMembers(){
  console.log("clearCurrentMembers:");
  var leftMemberContainer = document.getElementById("left-member-container");
  var clearedMembers = 0;
  while(leftMemberContainer.firstChild){
    leftMemberContainer.removeChild(leftMemberContainer.firstChild);
    clearedMembers++;
  }
  var rightMemberContainer = document.getElementById("right-member-container");
  while(rightMemberContainer.firstChild){
    rightMemberContainer.removeChild(rightMemberContainer.firstChild);
    clearedMembers++;
  }
  console.log(clearedMembers);
}

function initListView(members){
  $(document).ready(function() {
    $('#nav-container').load('../navbar.html');
  });
  paintVisibleMembers(members, "");
}
