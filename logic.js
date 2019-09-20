// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCxjNYwXcDGfKKuSeYtKjF6zvRayWYUJdQ",
    authDomain: "my-awesome-project-9a403.firebaseapp.com",
    databaseURL: "https://my-awesome-project-9a403.firebaseio.com",
    projectId: "my-awesome-project-9a403",
    storageBucket: "",
    messagingSenderId: "888538717903",
    appId: "1:888538717903:web:509804196bd139824fe1ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Add ourselves to presence list when online.

var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.

var connectedRef = database.ref(".info/connected");

var connected = 0;
// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        if (connected < 2) {

            // Add user to the connections list.
            var con = connectionsRef.push(true);
            connected++;

            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();

            //no way this can be right. how do i add when they connect, and remove when they disconnect?
            con.onDisconnect(connected--);

        }
    }
});


$("#r1").on("click", function (event) {
    if (snapshot.val().player1 != "") {
        database.ref("/choices").set({
            player1: "r"
        })
    }
})
// $("#p1").on("click", function (event) {
//     if (snapshot.player1 != "") {
//         database.ref("/choices").set({
//             player1: "p"
//         })
//     }
// })
// $("#s1").on("click", function (event) {
//     if (snapshot.player1 != "") {
//         database.ref("/choices").set({
//             player1: "s"
//         })
//     }
// })


// $("#r2").on("click", function (event) {
//     if (snapshot.player2 != "") {
//         database.ref("/choices").set({
//             player2: "r"
//         })
//     }
// })
// $("#p2").on("click", function (event) {
//     if (snapshot.player2 != "") {
//         database.ref("/choices").set({
//             player2: "p"
//         })
//     }
// })
$("#s2").on("click", function (event) {
    if (snapshot.val().player2 != "") {
        database.ref("/choices").set({
            player2: "s"
        })
    }
})

var wins = 0;
var ties = 0;
var losses = 0;

database.ref("choices").on("value", function(snapshot) {
    console.log(snapshot);
    if ((player1choice === "r") || (player1choice === "p") || (player1choice === "s") || (player2choice != "")) {

        if ((player1choice === "r" && player2choice === "s") ||
            (player1choice === "s" && player2choice === "p") ||
            (player1choice === "p" && player2choice === "r")) {
            wins++;
            
        } else if (player1choice === player2choice) {
            ties++;
        } else {
            losses++;
        }
    }
})

