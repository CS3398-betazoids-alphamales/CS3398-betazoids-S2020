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
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
    origin: true,
  });

const REGEX = new RegExp(/\.|-|`|75|0|1|2|3|4|5|6|7 |8|9|\/|GLASS|PARTS|PART|FROZEN|CRACKED|SHAVED|SQUEEZE|OZ.| OZ| C | T | L | CUPS|CUP |LITERS|LITER|LADLE| EACH|QUART| GAL |ML| CANS | CAN |DASH OF|PACKET|INSTANT|\(RAW\)|DASHES|DASH OF|DASH|EQUAL|LARGE | ONE |ONE |DOUBLE BREWED|UNSWEETEND|STRONG |MUG |USHERS |NOILLY PRAT|SCOOPS|SCOOP|SPLASH OF|SPLASH|PREPARED|RINGS|HALF A|JUICE FROM|JUICE OF| CUBES|CUBED|\(CUBED\)|CUBE|\(BOILING\)|\(TO TASTE\)|TO TASTE|\(CHILLED\)|\(STEMMED\)|\(SEEDLESS\)| RIM|ENVELOPE|TBPS|TBSP.|TBSP|TBS.|TBS|TSP.|TSP|\(SEEDED\)|FRESH|CINZANO|PROOF|SUPERFINE|FLAVORED |SLICED|SLICES|SLICE OF|SLICE|SMALL|WITH SYRUP|CHILLED|TEASPOON|WHOLE|BOTTLE|DROPS|QTS|QT|PINT|SEVERAL|PACKAGE|HULLED|PREMIUM|BUSHMILLS|BACARDI|\(KAHLUA\)|\(PREMIUM\)|\(2 DRINKS\)|JIGGERS|JIGGER|\(WHOLE\)|MINCED|RIPE|CHOPPED|CRUSHED|\(OR\)|IMPORTED/, "g");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');
    response.send("Hello from the Betazoids!");
});


exports.getAllIngrs = functions.https.onRequest(async (request, response) => {
    //this function will respond with a (json) list of all ingredients from every entry
    
    response.set('Access-Control-Allow-Origin', '*');

    admin.database().ref("data").once('value')
        .then(function(snapshot) { 
            var totalIngrs = 0;
            var totalRefined = 1;
            var refinedList = {};
            var hasIngr = false;
    
            snapshot.forEach(function(entrySnapshot) {
    
                entrySnapshot.child('ingredients').forEach(function(eachIngr) {
                        
                    var tempStr = eachIngr.val().toUpperCase();
                    tempStr = tempStr.replace(REGEX, '').trim();
                    tempStr = tempStr.replace(/ AND | N /g, '&');
    
                    for (var i = 0; i < totalIngrs; ++i)
                        if ( refinedList["ingr" + (i+1)] === tempStr)
                            hasIngr = true;
    
                    if ( !hasIngr )
                        refinedList["ingr" + totalRefined++] = tempStr;
                            
                    hasIngr = false;
                    ++totalIngrs;
                }); 
            });
    
            response.json(refinedList);
            return null;
        }).catch(e => { console.log(e) });
    
    });


exports.devGetAllIngrs = functions.https.onRequest(async (request, response) => {
//this function will respond with a (json) list of all ingredients from every entry

    response.set('Access-Control-Allow-Origin', '*');

    admin.database().ref("data").once('value')
        .then(function(snapshot) {

        var totalIngrs = 0;
        var totalRefined = 1;       
        var drinkID = 1; //for debugging
        var refinedList = {};
        var hasIngr = false;

        snapshot.forEach(function(entrySnapshot) {

            entrySnapshot.child('ingredients').forEach(function(eachIngr) {
                    
                var tempStr = eachIngr.val().toUpperCase();
                tempStr = tempStr.replace(REGEX, '').trim();
                tempStr = tempStr.replace(/ AND | N /g, '&');

                for (var i = 0; i < totalIngrs; ++i)
                    if ( refinedList["ingr" + (i+1)] === tempStr)
                        hasIngr = true;

                if ( !hasIngr ) {

                    refinedList["drinkID" + drinkID] = drinkID; //for debugging
                    refinedList["ingr" + totalRefined++] = tempStr;
                }
                        

                hasIngr = false;
                ++totalIngrs;
            }); 
            ++drinkID; //for debugging
        });

        response.json(refinedList);
        return null;
    }).catch(e => { console.log(e) });

});


exports.getRandomList = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    const randList = [];
    var randIntStr = "init";
    const MIN = 1;
    const MAX = 1072;
    const howMany = 10;

    admin.database().ref("data").once('value')
        .then(function(dataSnapshot) {

            for ( var i = 0; i < howMany; ++i) {
                
                randIntStr = Math.floor(Math.random() * (MAX - MIN + 1) + MIN).toString();
                randList.push( dataSnapshot.child(randIntStr) );
            }
            
            response.json(randList);
            return null;
        }).catch(e => { console.log(e) });
});


exports.devGetByIngredient = functions.https.onRequest(async (request, response) => {
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?findthis=rum
    
    response.set('Access-Control-Allow-Origin', '*');

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


exports.getByIngredientMulti = functions.https.onRequest(async (request, response) => { // currently, using .contains() is returning true for " cola" in "pina colada" etc
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?total=2&findthis1=rum&findthis2=gin 

    response.set('Access-Control-Allow-Origin', '*');    

    var totalIngrs = request.query.total; // MIN = 2, MAX = 5
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

                if ( hasIngr1 || hasIngr2 || hasIngr3 || hasIngr4 || hasIngr5 )
                    allMatches.push( eachDrinkSnapshot );
    
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


exports.getByIngredientMultiStrict = functions.https.onRequest(async (request, response) => { // currently, using .contains() is returning true for " cola" in "pina colada" etc
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?total=2&findthis1=rum&findthis2=gin 
        
    response.set('Access-Control-Allow-Origin', '*');

    var totalIngrs = request.query.total; // MIN = 2, MAX = 5
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


exports.setRecipeRating = functions.https.onRequest(async (request, response) => {
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?recipeName=Cactus Kicker - 4&rating=5
response.set('Access-Control-Allow-Origin', '*');

const thingToFind = request.query.recipeName.toUpperCase();
const rating = request.query.rating;
response.set('Access-Control-Allow-Origin', '*');
admin.database().ref("data").once('value')
    .then(function(dataSnapshot) {

        var match = false;

        dataSnapshot.forEach(function(currentDrinkSnapshotIndex) {
            if(currentDrinkSnapshotIndex.child("name").val() !== null){

                var nameString = currentDrinkSnapshotIndex.child("name").val().toUpperCase();
        
                if ( nameString.includes(thingToFind) ){
                    match = true;
                    const dbRef = currentDrinkSnapshotIndex.ref;
                    dbRef.update({"rating" : rating });
                }
        }
            
        });

        response.json(match);
        return null;
        }).catch(e => { console.log(e);
        });
});

// exports.testDatabase = functions.https.onRequest(async (request, response) => {
//
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

// exports.devAddRatingKeyToAll = functions.https.onRequest(async (request, response) => { //under-construction

//     var rootRef = admin.database().ref("data");

//     rootRef.child("1").update({"ratingRunningTotal" : 0});
//     rootRef.child("1").update({"ratingCount" : 0});


//     response.send("success");
//     // rootRef.forEach(function(eachEntry) {

//     //     eachEntry.push({"rating" : 0});
//     //     return null;
//     // }).catch(e => { console.log(e) });
// });