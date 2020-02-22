// Authors: Andrew Saenz, Benjamin Bond
// Notes: all "dev" tagged functions are intended for closed debugging. Please create seperate functions for front-end usage.
//
//
//

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const path = require('path');
const os = require('os');
const fs = require('fs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
 response.send("Hello from the Betazoids!");
});


exports.devGetAllIngrs = functions.https.onRequest(async (request, response) => { //this function is working atm. please consult before edits are made
//this function will respond with a (json) list of all ingredients from every entry

    admin.database().ref("data").once('value')
        .then(function(snapshot) {

            const listOfIngrs = [];

            snapshot.forEach(function(entrySnapshot) {

                listOfIngrs.push( entrySnapshot.child('ingredients') );
            });


            response.json(listOfIngrs);
            return null;
        }).catch(e => { console.log(e) });

});


exports.devGetByIngredient = functions.https.onRequest(async (request, response) => { //this function is working atm. please consult before edits are made
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?findthis=rum
    
    const thingToFind = " " + request.query.findthis.toUpperCase();

    admin.database().ref("data").once('value')
        .then(function(dataSnapshot) {

            const allMatches = [];

            dataSnapshot.forEach(function(eachDrinkSnapshot) {

                var hasIngredient = false;

                var ingrsObject = eachDrinkSnapshot.child('ingredients');

                ingrsObject.forEach(function(eachIngrSnapshot) {

                    var ingrStr = eachIngrSnapshot.val().toUpperCase();

                    if ( ingrStr.includes(thingToFind) )
                        hasIngredient = true;
                });

                if (hasIngredient)
                    allMatches.push(eachDrinkSnapshot);

                hasIngredient = false;
            });

            response.json(allMatches);
            return null;
        }).catch(e => { console.log(e) });

});


exports.devGetByIngredientMultiStrict = functions.https.onRequest(async (request, response) => { //SEEMS TO BE WORKING ATM. although, using .contains() is returning true for "cola" in "pinacolada" atc
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?total=2&findthis1=rum&findthis2=gin 
    
        //const incomingAurgument = request.query.variableName; // supplimental example
        
        var totalIngrs = request.query.total; //max = 5, min = 2 , atm
        var find1 = " " + request.query.findthis1.toUpperCase();
        var find2 = " " + request.query.findthis2.toUpperCase();
        var find3;
        var find4;
        var find5;
        
        do {
            if (totalIngrs === "2")
                break;
            
            find3 = " " + request.query.findthis3.toUpperCase();
            if (totalIngrs === "3")
                break;
            
            find4 = " " + request.query.findthis4.toUpperCase();
            if (totalIngrs === "4")
                break;
            
            find5 = " " + request.query.findthis5.toUpperCase();
        } while (once)
    
        admin.database().ref("data").once('value')
            .then(function(dataSnapshot) {
    
                const allMatches = [];
    
                dataSnapshot.forEach(function(eachDrinkSnapshot) {
    
                    var hasIngr1 = false;
                    var hasIngr2 = false;
                    var hasIngr3 = false;
                    var hasIngr4 = false;
                    var hasIngr5 = false;
    
                    var ingrsObject = eachDrinkSnapshot.child('ingredients');
    
                    ingrsObject.forEach(function(eachIngrSnapshot) {
    
                        var ingrStr = eachIngrSnapshot.val().toUpperCase();

                        if ( ingrStr.includes(find1) )
                            hasIngr1 = true;
                        if ( ingrStr.includes(find2) )
                            hasIngr2 = true;
                        if ( ingrStr.includes(find3) )
                            hasIngr3 = true;
                        if ( ingrStr.includes(find4) )
                            hasIngr4 = true;
                        if ( ingrStr.includes(find5) )
                            hasIngr5 = true;
                    });

                    switch( totalIngrs ) {
                        case "2":
                            if (hasIngr1 && hasIngr2)
                                allMatches.push(eachDrinkSnapshot);
                            break;
                        case "3":
                            if (hasIngr1 && hasIngr2 && hasIngr3)
                            allMatches.push(eachDrinkSnapshot);
                            break;
                        case "4":
                            if (hasIngr1 && hasIngr2 && hasIngr3 && hasIngr4)
                            allMatches.push(eachDrinkSnapshot);
                            break;
                        case "5":
                            if (hasIngr1 && hasIngr2 && hasIngr3 && hasIngr4 && hasIngr5)
                            allMatches.push(eachDrinkSnapshot);
                    }
    
                    hasIngr1 = false;
                    hasIngr2 = false;
                    hasIngr3 = false;
                    hasIngr4 = false;
                    hasIngr5 = false;
                });
    
                response.json(allMatches);
                return null;
            }).catch(e => { console.log(e) });
    
    });


// exports.testDatabase = functions.https.onRequest(async (request, response) => {
////no direct intention for this function atm.

//     admin.database().ref("data").once('value')
//         .then(function(dataSnapshot) {

//             for (var i = 1; i < 10; ++i) {
//                 var test = "00"+i+"/name";
//                 console.log( dataSnapshot.child(test).val() );
//             }
            
            

//             //console.log( dataSnapshot.child(test).val() );

//             return null;
//         }).catch(e => { console.log(e);
//     });

//     response.send("Check the log!");
// });