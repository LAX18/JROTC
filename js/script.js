// JROTC Firebase Interaction Script
// time Change Function (Global)
function timeConvert(timestring) {
  var year = timestring.substring(0,4)
  var month = timestring.substring(5,7)
  var day = timestring.substring(8,10)
  var fulldate = month+"-"+day+"-"+year
  return fulldate
}
// Specific Webpage Scripts
function timeChange() {
  var data = document.getElementById("time").value
  if (data == "RTI") {
    document.getElementById("customtimebox").style.display = 'none'
  } else {
    document.getElementById('customtimebox').style.display = 'block'
  }
}

function statusView() {
  var data = readData("nextEvent", function(data) {
    if (data.Event == "UNI") {
      document.getElementById("box").innerHTML = 'The next uniform day is on <b><span id="datevalue">loading...</span></b>. You are to wear the <b><span id="uniformvalue">loading...</span></b> uniform. There is no formation.';
      setData("nextEvent", "datevalue", "date");
      setData("nextEvent", "uniformvalue", "uniform");
    } else if (data.Event == "CUS") {
      setData("nextEvent", "box", "custom")
    } else if (data.Event == "FOR") {
      document.getElementById("box").innerHTML = 'The next formation is on <b><span id="datevalue"> loading... </span></b> in the <b><span id="locationvalue">loading...</span></b> during <b><span id="timevalue">loading...</span></b>. You are to wear the <b><span id="uniformvalue"> loading... </span> uniform.</b>';
      setData("nextEvent", "datevalue", "date");
      setData("nextEvent", "locationvalue", "location");
      setData("nextEvent", "timevalue", "time");
      setData("nextEvent", "uniformvalue", "uniform");
    }
  })
}

function formationOnLoad() {
  statusView();
  setInterval(statusView, 30000)
}
// Key Handles (allows enter key to be pressed to send)


// Key Handle Function(s)
function setKeyHandle(element, name) {
  document.getElementById(element).addEventListener("onchange", function(event) {
    if (event.key === "Enter") { // event.keyCode is deprecated
      name();
    }
  });
}

function updatePage() {
  var data = document.getElementById("event").value
  if (data == "UNI") {
    document.getElementById("locationbox").style.display = 'none'
    document.getElementById("timebox").style.display = 'none'
    document.getElementById("messagebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'block'
    document.getElementById("uniformbox").style.display = 'block'
  } else if (data == "FOR") {
    document.getElementById("locationbox").style.display = 'block'
    document.getElementById("timebox").style.display = 'block'
    document.getElementById("messagebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'block'
    document.getElementById("uniformbox").style.display = 'block'
  } else if (data == "CUS") {
    document.getElementById("locationbox").style.display = 'none'
    document.getElementById("timebox").style.display = 'none'
    document.getElementById("datebox").style.display = 'none'
    document.getElementById("uniformbox").style.display = 'none'
    document.getElementById("messagebox").style.display = 'block'
  }
}

// Key handle sending functions

function eventSend() {
  var array = {
    Event: document.getElementById("event").value,
    date: timeConvert(document.getElementById("date").value),
    uniform: document.getElementById("uniformtype").value,
    location: document.getElementById('location').value,
    time: document.getElementById('time').value,
    custom: document.getElementById('custommessage').value
  }
  sendData("nextEvent/", array);
  document.getElementById('date').value = '';
  document.getElementById('uniformtype').value = '';
  document.getElementById('time').value = '';
  document.getElementById('location').value = '';
  //document.getElementById('event').value = '';
  document.getElementById('custommessage').value = '';
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
  var array = readData(ref, function(array) {
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