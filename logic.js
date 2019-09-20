// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCxjNYwXcDGfKKuSeYtKjF6zvRayWYUJdQ",
    authDomain: "my-awesome-project-9a403.firebaseapp.com",
    databaseURL: "https://my-awesome-project-9a403.firebaseio.com",
    projectId: "my-awesome-project-9a403",
    storageBucket: "",
    messagingSenderId: "888538717903",
    appId: "1:888538717903:web:81be1c46c70d214e4fe1ba"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var newTrain = {
    name: "",
    destination: "",
    start: "",
    frequency: "",
  };


  var database = firebase.database();
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var userName = $("#train-name-input").val().trim();
    var userDestination = $("#destination-input").val().trim();
    var userFrequency = $("#frequency-input").val().trim();
    var userStart = $("#start-input").val().trim();

    console.log(userStart)
    console.log("userstart: " + userStart)
    
    // Creates local "temporary" object for holding employee data
    newTrain = {
      name: userName,
      destination: userDestination,
      start: userStart,
      frequency: userFrequency
    };
    
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    console.log("train: " + newTrain)
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#start-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFrequency);
  
    // Prettify thetrain start
    
    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //difference term time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    // module difference
    var tRemainder = diffTime % trainFrequency;

    // minute until train
    var tMinutesTillTrain = trainFrequency - tRemainder;

    // arrival time
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),

    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  