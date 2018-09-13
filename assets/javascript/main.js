var config = {
  apiKey: "AIzaSyB4Ip9eODIq0g1VDyZFmKlgEAyw2hsuUBo",
  authDomain: "train-scheduler-9cc5c.firebaseapp.com",
  databaseURL: "https://train-scheduler-9cc5c.firebaseio.com",
  projectId: "train-scheduler-9cc5c",
  storageBucket: "train-scheduler-9cc5c.appspot.com",
  messagingSenderId: "994161058922"
};
firebase.initializeApp(config);

database = firebase.database();

var time = moment().format('LTS');
var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$(document).ready(function() {
    console.log("ready");
    clock();
});

function clock(){
    $('#currentTime').html(time);
    setTimeout(clock, 1000);
};

$("button").click(function(event){
    event.preventDefault();
    name = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    firstTrainTime = $('#firstTrain').val().trim();
    frequency = $('#frequency').val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: moment().format("X")
    })
   
})

database.ref().on("child_added", function(snapshot) {
      
    // Log everything that's coming out of snapshot
    trainName = snapshot.val().name;
    trainDest = snapshot.val().destination;
    firstTrain = snapshot.val().firstTrainTime;
    freq = snapshot.val().frequency;
   
   
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(freq);
    
    $('#trains').append('<tr><td id="name">' + trainName + '</td><td id="dest">' 
    + trainDest + '</td><td id="firstTrain">' + firstTrain + '</td><td id="freq">'
    + freq + '</td><tr>')


});
    







