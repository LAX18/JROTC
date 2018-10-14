// JROTC Firebase Interaction Script

// Key Handles (allows enter key to be pressed to send)
function writePageLoad() {
  document.getElementById("date").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      formationSend();
    }
  });
  document.getElementById("uniformtype").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      formationSend();
    }
  });
  document.getElementById("alpha").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
     cupSend();
    }
  });
  document.getElementById("bravo").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
     cupSend();
    }
  });
}
 
// Key handle sending functions

function formationSend() {
  var array = {
        Date: document.getElementById("date").value,
        Uniform: document.getElementById("uniformtype").value
      }
      sendData("nextformation/", array);
  document.getElementById('date').value = '';
  document.getElementById('uniformtype').value = '';
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
