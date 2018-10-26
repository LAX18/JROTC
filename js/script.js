// JROTC Firebase Interaction Script
// Specific Webpage Scripts
function formationOnLoad() {
      var data = readData("nextEvent", function (data) {
       if (data.Event == "UNI") {
         console.log(data.Event)
         document.getElementById("box").innerHTML = 'The next uniform day is on <b><span id="date">loading...</span></b>. You are to wear the <b><span id="uniform">loading...</span></b> uniform.';
         setData("nextEvent","date","Date");
         setData("nextEvent","uniform","Uniform");
       } else {
         document.getElementById("box").innerHTML = 'The next formation is on <b><span id="date"> loading... </span></b> in the <b><span id="location">loading...</span></b> during <b><span id="time">loading...</span></b>. You are to wear the <b><span id="uniform"> loading... </span> uniform.</b>';
         setData("nextEvent","date","Date");
         setData("nextEvent","location","Location");
         setData("nextEvent","time","Time");
         setData("nextEvent","uniform","Uniform");
       }
                                                  })
    }
// Key Handles (allows enter key to be pressed to send)

 
// Key Handle Function
function setKeyHandle (element, name) {
  document.getElementById(element).addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      name();
    }
  });
}
// Key handle sending functions

function eventSend() {
  var array = {
        Event: document.getElementById("event").value,
        Date: document.getElementById("date").value,
        Uniform: document.getElementById("uniformtype").value,
        Location: document.getElementById('location').value,
        Time: document.getElementById('time').value
      }
      sendData("nextEvent/", array);
  document.getElementById('date').value = '';
  document.getElementById('uniformtype').value = '';
  document.getElementById('time').value = '';
  document.getElementById('location').value = '';
  document.getElementById('event').value = '';
}
function cupSend() {
  var array = {
        Alpha: document.getElementById("alpha").value,
        Bravo: document.getElementById("bravo").value
      }
      sendData("commanderscup/", array);
      document.getElementById('alpha').value = '';
      document.getElementById('bravo').value = '';
}


// global read data and place on page function
function setData(ref, element, read1) {
  var array = readData(ref, function (array) {
    document.getElementById(element).innerHTML = array[read1]
  });
}
 
// Firebase Interaction Scripts
function sendData(ref, data) {
  var database = firebase.database();
  firebase.database().ref(ref).set(data);
}
 
function readData(ref, callback) {
  var nextformation = firebase.database().ref(ref);
  nextformation.on("value", function(data) {
    var array = data.val();
    callback(array)
  });
}
