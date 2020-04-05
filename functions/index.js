// Authors: Andrew Saenz, Benjamin Bond
// Notes: all "dev" tagged functions are intended for closed debugging. Please create seperate functions for front-end usage.

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//const path = require('path');
//const os = require('os');
//const fs = require('fs');

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
    origin: true,
});
//REG, ALC, JUICE, OTHER, FRUIT, (ALL)OTHER [pattern to catch ingredients most effectively....]
const REGEX = new RegExp(/\.|-|`|75|0|1|2|3|4|5|6|7 |8|9|\/|GLASS|PARTS|PART|FROZEN|CRACKED|SHAVED|SQUEEZE|OZ.| OZ| C | T | L | CUPS|CUP |LITERS|LITER|LADLE| EACH|QUART| GAL |ML| CANS | CAN |DASH OF|PACKET|INSTANT|\(RAW\)|DASHES|DASH OF|DASH|EQUAL|LARGE | ONE |ONE |DOUBLE BREWED|UNSWEETEND|STRONG |MUG |USHERS |NOILLY PRAT|SCOOPS|SCOOP|SPLASH OF|SPLASH|PREPARED|RINGS|HALF A|JUICE FROM|JUICE OF| CUBES|CUBED|\(CUBED\)|CUBE|\(BOILING\)|\(TO TASTE\)|TO TASTE|\(CHILLED\)|\(STEMMED\)|\(SEEDLESS\)| RIM|ENVELOPE|TBPS|TBSP.|TBSP|TBS.|TBS|TSP.|TSP|\(SEEDED\)|FRESH|CINZANO|PROOF|SUPERFINE|FLAVORED |SLICED|SLICES|SLICE OF|SLICE|SMALL|WITH SYRUP|CHILLED|TEASPOON|WHOLE|BOTTLE|DROPS|QTS|QT|PINT|SEVERAL|PACKAGE|HULLED|PREMIUM|BUSHMILLS|BACARDI|\(KAHLUA\)|\(PREMIUM\)|\(2 DRINKS\)|JIGGERS|JIGGER|\(WHOLE\)|MINCED|RIPE|CHOPPED|CRUSHED|\(OR\)|IMPORTED/, "g");
const ALL_ALCOHOL = new RegExp(/GRENADINE|RUM|LIQUEUR|EARLY|BRANDY|SCOTCH|AMARETTO|VODKA|SOUTHERN|MARNIER|GIN|VERMOUTH|CREME|CURACAO|JACK|GALLIANO|HARVEYS|DUBONNET|TEQUILA|TRIPLE|IRISH|SCHNAPPS|WINE|BOURBON|TIA MARIA|BRANDY|WHISKY|CAMPARI|MIDORI|KIRSCH|BEER|LILLE|SKYY|SAMBUCA|TUACA|METAXA|CHABLIS|PICON|CHAMPAGNE|BITTER|COINTREAU|GALLIANO|KIRSCHWASSER|HEERING|COGNAC|CHARTREUSE|ANISETTE|PERNOD|JAEGERMEISTER|FRANGELICO|OUZO|STOLICHNAYA|CUERVO|BEEFEATER|PUCKER|STREGA|MADEIRA|PIMMS|BURGUNDY|DRAMBUIE|RYE|SAKE|BOMBAY|LICOR|AQUAVIT|TURKEY|SLIVOVITZ|EVERCLEAR|B & B/,"g");
const ALL_JUICE = new RegExp(/JUICE|CIDER|SWEAT & SOUR|CREAM OF COCONUT|LEMONADE|SOUR MIX|LIMEADE|BLOODY|PASSION|DAIQUIRI MIX|BAR SOUR|PEACH NECTAR/,"g");
const ALL_OTHER = new RegExp(/SYRUP|PEEL|SAUCE/,"g");
const ALL_FRUIT = new RegExp(/BANANA|STRAWBERR|LEMON|LIME|PEACH|BLUEBERR|RASPBERR|BLACKBERR|CHERR|APPLE|ORANGE|CRANBERR/,"g");
const STOCK_FAIL_RESPONSE = [{"form":{"glass":"Glass of Absence","type":"Lonely Drink"},"garnish":{"1":"Tears"},"ingredients":{"1":"1 1/4 oz. Denial","2":"5 oz. Anger","3":"1 Scoop Depression"},"name":"Invalid Query","occasion":"Any","procedure":{"1":"Combine ingredients in blender","2":"blend into eternity...."}}];

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');
    response.send("Hello from the Betazoids!");
});


exports.getAllSepIngrs = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');
    var refinedList = {};
    var counter = 0;
    var otherCounter = 0;

    admin.database().ref("data").once('value')
        .then((dataSnapshot) => {
        
            var totalIngrs = 0;
            var totalUnref = 0;
            let unrefinedList = {};
            var hasIngr = false;
    
            unrefinedList['all'] = [];
            dataSnapshot.forEach((entrySnapshot) => {
    
                entrySnapshot.child('ingredients').forEach((eachIngr) => {
                        
                    var tempStr = eachIngr.val().toUpperCase();
                    tempStr = tempStr.replace(REGEX, '').trim();
                    tempStr = tempStr.replace(/ AND | N /g, '&');
    
                    for (var i = 0; i < totalIngrs; ++i)
                        if ( unrefinedList.all[i] === tempStr)
                            hasIngr = true;
    
                    if ( !hasIngr )
                        unrefinedList.all[totalUnref++] = tempStr;
                            
                    hasIngr = false;
                    ++totalIngrs;
                }); 
            });

            refinedList['alcohol'] = [];
            unrefinedList.all.forEach((maybeAlc, index, object) => {

                var tempStr = maybeAlc.toUpperCase();
                if (tempStr.match(ALL_ALCOHOL) !== null) {

                    refinedList.alcohol[counter++] = tempStr.toLowerCase();
                    object[index] = 'X';
                }
            });
    
            counter = 0;
            refinedList['juice'] = [];
            unrefinedList.all.forEach((maybeJuice, index, object) => {

                var tempStr = maybeJuice.toUpperCase();
                if (tempStr.match(ALL_JUICE) !== null) {

                    refinedList.juice[counter++] = tempStr.toLowerCase();
                    object[index] = 'X';
                }
            });

            refinedList['other'] = [];
            unrefinedList.all.forEach((maybeOther, index, object) => {

                var tempStr = maybeOther.toUpperCase();
                if (tempStr.match(ALL_OTHER) !== null) {

                    refinedList.other[otherCounter++] = tempStr.toLowerCase();
                    object[index] = 'X';
                }
            });

            counter = 0;
            refinedList['fruit'] = [];
            unrefinedList.all.forEach((maybeFruit, index, object) => {

                var tempStr = maybeFruit.toUpperCase();
                if (tempStr.match(ALL_FRUIT) !== null) {

                    refinedList.fruit[counter++] = tempStr.toLowerCase();
                    object[index] = 'X';
                }
            });

            unrefinedList.all.forEach((remaining, index, object) => {

                if (remaining !== 'X') {
                    var tempStr = remaining.toUpperCase();
                    refinedList.other[otherCounter++] = tempStr.toLowerCase();
                }
                
            });

            response.json(refinedList);
            return null;
        }).catch(e => { console.log(e) });

});


exports.getAllIngrs = functions.https.onRequest(async (request, response) => {
//this function will respond with a (json) list of all ingredients from every entry
    
    response.set('Access-Control-Allow-Origin', '*');

    admin.database().ref("data").once('value')
        .then((snapshot) => {
		
            var totalIngrs = 0;
            var totalUnref = 0;
            var unrefinedList = {};
            var hasIngr = false;
    
            unrefinedList['all'] = [];
            snapshot.forEach((entrySnapshot) => {
    
                entrySnapshot.child('ingredients').forEach((eachIngr) => {
                        
                    var tempStr = eachIngr.val().toUpperCase();
                    tempStr = tempStr.replace(REGEX, '').trim();
                    tempStr = tempStr.replace(/ AND | N /g, '&');
                    tempStr = tempStr.toLowerCase();
    
                    for (var i = 0; i < totalIngrs; ++i)
                        if ( unrefinedList.all[i] === tempStr)
                            hasIngr = true;
    
                    if ( !hasIngr )
                        unrefinedList.all[totalUnref++] = tempStr;
                            
                    hasIngr = false;
                    ++totalIngrs;
                }); 
            });
    
            response.json(unrefinedList);
            return null;
        }).catch(e => { console.log(e) });
    
});


exports.getByName = functions.https.onRequest(async (request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    var strToFind = "";
    const matchList = [];

    try {
        strToFind = request.query.findThis.toUpperCase();
    } catch (e) {
        console.log("invalid query");
    }

    if (strToFind.length === 0)
        response.json(STOCK_FAIL_RESPONSE);

    else {
        admin.database().ref("data").once('value')
        .then((dataSnapshot) => {

        dataSnapshot.forEach((eachDrink) => {

            if (eachDrink.child('name').val() !== null) {

                var drinkName = eachDrink.child('name').val().toUpperCase();

                if ( drinkName.includes(strToFind) )
                    matchList.push(eachDrink);
            }
        });

        if (matchList.length > 0)
            response.json(matchList);
        else
            response.json(STOCK_FAIL_RESPONSE);
        return null;
        }).catch(e => {console.log(e) });
    }
});


exports.getRandomList = functions.https.onRequest(async (request, response) => {
//  note: this function now expects an argument, "howmany" specifying how many to return
//
//  EXAMPLE: full_address?howmany=10

    response.set('Access-Control-Allow-Origin', '*');

    var howMany = -1;
    const randList = [];
    var randIntStr = "init";
    const MIN = 1;
    const MAX = 1072;

    try {
        howMany = request.query.howmany;
    } catch (e) {
        console.log("/'howMany/' was invalid")
    }

    if (howMany.length === -1)
        response.json(STOCK_FAIL_RESPONSE);

    else {
        admin.database().ref("data").once('value')
        .then((dataSnapshot) => {

            for ( var i = 0; i < howMany; ++i) {
                
                randIntStr = Math.floor(Math.random() * (MAX - MIN + 1) + MIN).toString();
                randList.push( dataSnapshot.child(randIntStr) );
            }
            
            response.json(randList);
            return null;
        }).catch(e => { console.log(e) });
    }
});


exports.getByIngredientSlack = functions.https.onRequest(async (request, response) => { // currently, using .contains() is returning true for " cola" in "pina colada" etc
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?total=2&findthis1=rum&findthis2=gin 

    response.set('Access-Control-Allow-Origin', '*');

    var totalIngrs = 1;
    var find1 = " ";
    var find2;
    var find3;
    var find4;
    var find5;

    try {
        totalIngrs = request.query.total; // MIN = 1, MAX = 5
        find1 += request.query.findthis1.toUpperCase();
    } catch (e) {
        console.log("invalid query");
    }

    if (find1.length === 1)
        response.json(STOCK_FAIL_RESPONSE);

    else {

        do {
            if (totalIngrs === "1")
                break;

            find2 = " " + request.query.findthis2.toUpperCase();
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
        .then((dataSnapshot) => {
    
            const allMatches = [];
    
            dataSnapshot.forEach((eachDrinkSnapshot) => {
    
                var hasIngr1 = false;
                var hasIngr2 = false;
                var hasIngr3 = false;
                var hasIngr4 = false;
                var hasIngr5 = false;
    
                var ingrsObject = eachDrinkSnapshot.child('ingredients');
    
                ingrsObject.forEach((eachIngrSnapshot) => {
    
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
    
            if (allMatches.length > 0)
                response.json(allMatches);
            else
                response.json(STOCK_FAIL_RESPONSE);
            return null;
        }).catch(e => { console.log(e) });
    }
});


exports.getByIngredientStrict = functions.https.onRequest(async (request, response) => { // currently, using .contains() is returning true for " cola" in "pina colada" etc
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?total=2&findthis1=rum&findthis2=gin 
        
    response.set('Access-Control-Allow-Origin', '*');

    var totalIngrs = 1;
    var find1 = " ";
    var find2;
    var find3;
    var find4;
    var find5;

    try {
        totalIngrs = request.query.total; // MIN = 1, MAX = 5
        find1 += request.query.findthis1.toUpperCase();
    } catch (e) {
        console.log("invalid query");
    }

    if (find1.length === 1)
        response.json(STOCK_FAIL_RESPONSE);

    else {

        do {
            if (totalIngrs === "1")
                break;

            find2 = " " + request.query.findthis2.toUpperCase();
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
        .then((dataSnapshot) => {
    
            const allMatches = [];
    
            dataSnapshot.forEach((eachDrinkSnapshot) => {
    
                var hasIngr1 = false;
                var hasIngr2 = false;
                var hasIngr3 = false;
                var hasIngr4 = false;
                var hasIngr5 = false;
    
                var ingrsObject = eachDrinkSnapshot.child('ingredients');
    
                ingrsObject.forEach((eachIngrSnapshot) => {
    
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

                    case "1":
                        if (hasIngr1)
                            allMatches.push(eachDrinkSnapshot);
                        break;    
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
    
            if (allMatches.length > 0)
                response.json(allMatches);
            else
                response.json(STOCK_FAIL_RESPONSE);
            return null;
        }).catch(e => { console.log(e) });
    }
});


exports.setRecipeRating = functions.https.onRequest(async (request, response) => {
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?recipeName=Cactus Kicker - 4&rating=5

    response.set('Access-Control-Allow-Origin', '*');

    const thingToFind = request.query.recipeName.toUpperCase();
    const rating = request.query.rating;

    admin.database().ref("data").once('value')
        .then((dataSnapshot) => {

            var match = false;

            dataSnapshot.forEach((currentDrinkSnapshotIndex) => {
                if(currentDrinkSnapshotIndex.child("name").val() !== null) {

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
        }).catch(e => { console.log(e) });

});


exports.devGetAllIngrs = functions.https.onRequest(async (request, response) => {
    //this function will respond with a (json) list of all ingredients from every entry
    
    response.set('Access-Control-Allow-Origin', '*');
    
    admin.database().ref("data").once('value')
        .then((snapshot) => {
    
        var totalIngrs = 0;
        var totalUnref = 1;       
        var drinkID = 1; //for debugging
        var unrefinedList = {};
        var hasIngr = false;
    
        snapshot.forEach((entrySnapshot) => {
    
            entrySnapshot.child('ingredients').forEach((eachIngr) => {
                        
                var tempStr = eachIngr.val().toUpperCase();
                tempStr = tempStr.replace(REGEX, '').trim();
                tempStr = tempStr.replace(/ AND | N /g, '&');
    
                for (var i = 0; i < totalIngrs; ++i)
                    if ( unrefinedList["ingr" + (i+1)] === tempStr)
                        hasIngr = true;
    
                if ( !hasIngr ) {
    
                    unrefinedList["drinkID" + drinkID] = drinkID; //for debugging
                    unrefinedList["ingr" + totalUnref++] = tempStr;
                }
                            
    
                hasIngr = false;
                ++totalIngrs;
            }); 
            ++drinkID; //for debugging
        });
    
        response.json(unrefinedList);
        return null;
    }).catch(e => { console.log(e) });
    
});


exports.devGetByIngredient = functions.https.onRequest(async (request, response) => {
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
    //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
    //
    //  EXAMPLE: full_address?findthis=rum
        
    response.set('Access-Control-Allow-Origin', '*');

    var thingToFind = " ";

    try {
        thingToFind += request.query.findthis.toUpperCase();
    } catch (e) {
        console.log("empty query");
    }
    
    if (thingToFind.length === 1)
        response.json(STOCK_FAIL_RESPONSE);
    
    else {
        admin.database().ref("data").once('value')
        .then((dataSnapshot) => {
    
            const allMatches = [];
    
            dataSnapshot.forEach((eachDrinkSnapshot) => {
    
                var hasIngredient = false;
    
                var ingrsObject = eachDrinkSnapshot.child('ingredients');
    
                ingrsObject.forEach((eachIngrSnapshot) => {
    
                    var ingrStr = eachIngrSnapshot.val().toUpperCase();
    
                    if ( ingrStr.includes(thingToFind) )
                        hasIngredient = true;
                });
    
                if (hasIngredient)
                        allMatches.push(eachDrinkSnapshot);
    
                hasIngredient = false;
            });
    

            if (allMatches.length > 0)
                response.json(allMatches);
            else
                response.json(STOCK_FAIL_RESPONSE);
            return null;
        }).catch(e => { console.log(e) });
    }
});


// exports.testDatabase = functions.https.onRequest(async (request, response) => {
//
//     admin.database().ref("data").once('value')
//         .then(function(dataSnapshot) { //pre-arrow-callback style

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
//     // rootRef.forEach(function(eachEntry) { //pre-arrow-callback style

//     //     eachEntry.push({"rating" : 0});
//     //     return null;
//     // }).catch(e => { console.log(e) });
// });