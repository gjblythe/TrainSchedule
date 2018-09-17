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

$(document).ready(function() {
  console.log("ready");
  clock();

  function clock() {
    setTimeout(clock, 1000);
    $("#currentTime").html(moment().format("LTS"));
  }

  $("button").click(function(event) {
    var name = $("#trainName")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var firstTrainTime = $("#firstTrain")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();

    if (firstTrainTime === "") {
      firstTrainTime = moment().format("hh:mm");
    } else {
      firstTrainTime = moment(firstTrainTime, "hh:mm").format("hh:mm");
    }

    if (frequency === null) {
      console.error("Enter Frequency");
      return;
    } else {
      frequency = moment(frequency, "mm:ss").format("mm:ss");
    }
    database.ref().push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      dateAdded: moment().format("X")
    });
    name = "";
    destination = "";
    firstTrainTime = "";
    frequency = "";

    $("#trainName").val(name);
    $("#destination").val(destination);
    $("#firstTrain").val(firstTrainTime);
    $("#frequency").val(frequency);
    return false;
  });

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

    $("#trains").append(
      '<tr><td><i class="fas fa-subway"></i></td><td id="name">' +
        trainName +
        '</td><td id="dest">' +
        trainDest +
        '</td><td id="firstTrain">' +
        firstTrain +
        '</td><td id="freq">' +
        freq +
        "</td><tr>"
    );
  });

  // database.ref().orderByChild(INSERT LOGIC NEXT TRAIN).limitToLast(Look INTO THIS).on("child_added", function(snapshot){
  // $('#trains').append('<tr><td id="name">' + trainName + '</td><td id="dest">'
  // + trainDest + '</td><td id="firstTrain">' + firstTrain + '</td><td id="freq">'
  // + freq + '</td><tr>'))

 

  // function removeTrain(){
  //     $('.fas fa-subway').click(function(){
  //         ref.child(key).remove(this);
  //     })
  // }
});
