// JROTC Firebase Interaction Script
function writePageLoad() {
  document.getElementById("date").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      getData();
    }
  });
  document.getElementById("uniformtype").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      getData();
    }
  });
}
 
function setData(ref, element, read1) {
  var array = readMessage(ref, function (array) {
    document.getElementById(element).innerHTML = array[read1]
  });
}
 
// Firebase Interaction Scripts
function sendData(ref, data) {
  var database = firebase.database();
  firebase.database().ref(ref).set(data);
}
 
function readMessage(ref, callback) {
  var nextformation = firebase.database().ref(ref);
  nextformation.on("value", function(data) {
    var array = data.val();
    callback(array)
  });
}
