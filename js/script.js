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
 
function getData() {
  var date = document.getElementById("date").value;
  var uniformtype = document.getElementById("uniformtype").value;
  var datetag = document.getElementById("date");
  var uniformtag = document.getElementById("uniformtype");
  datetag.value = "";
  uniformtag.value = "";
  var data = {
    Date: date,
    Uniform: uniformtype
  }
  sendData("/nextformation", data);
}
 
function setData() {
  var array = readMessage("nextformation/", function (array) {
    document.getElementById("read").innerHTML = "<h3>The next formation is on " + array.Date + " in the Gym. You are to wear the " + array.Uniform + " uniform</h3>";
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
 
/* function readMessage() {
    var nextformation = firebase.database().ref("nextformation/");
    nextformation.on("value", function(data) {
        var array = data.val();
        var readtag = document.getElementById("read")
        readtag.innerHTML = "<h3>The next formation is on " + array.Date + " in the Gym. You are to wear the " + array.Uniform + " uniform</h3>";
    }, function (error) {
         console.log("Error: " + error.code);
});
} */
