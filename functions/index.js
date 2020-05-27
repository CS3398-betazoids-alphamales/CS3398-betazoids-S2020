// Authors: Andrew Saenz, Benjamin Bond
// Notes: all "dev" tagged functions are intended for closed debugging. Please create seperate functions for front-end usage.

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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
    var testingObjects;

    try {
        testingObjects = request.query.myObject;
        console.log(testingObjects[1].drink);
    } catch (err) {
        console.log("object unrecieved")
    }
    

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


exports.getByName = functions.https.onRequest(async (request, response) => { // REQUIRED: findthis, page

    response.set('Access-Control-Allow-Origin', '*');

    var strToFind = "";
    const matchList = [];
    var iter = 0;
    var match_count = 0;

    try {
        strToFind = request.query.findthis.toUpperCase();
        iter = request.query.page;
    } catch (e) {
        console.log("invalid query");
    }

    iter = iter * 24;

    if (strToFind.length === 0 || iter === 0)
        response.json(STOCK_FAIL_RESPONSE);

    else {
        admin.database().ref("data").once('value')
        .then((dataSnapshot) => {

            var dataObject = dataSnapshot.val();

            dataObject.every((eachDrink) => {

                if (eachDrink.name !== null) {

                    var drinkName = eachDrink.name.toUpperCase();

                    if ( drinkName.includes(strToFind) ) {

                        if ( match_count >= (iter-24) && match_count < iter )
                            matchList.push(eachDrink);
                        ++match_count;
                    }  
                }
                return (match_count < iter);
            });

            if (matchList.length > 0)
                response.json(matchList);
            else
                response.json(STOCK_FAIL_RESPONSE);
            return null;
            }).catch(e => {console.log(e) });
    }
});


exports.getRandomList = functions.https.onRequest(async (request, response) => { // REQUIRED: howmany
//  note: this function now expects an argument, "howmany" specifying how many to return
//
//  EXAMPLE: full_address?howmany=10

    response.set('Access-Control-Allow-Origin', '*');

    // const conserveData = [{"form":{"glass":"Collins","type":"Mixed Cocktail"},"garnish":{"1":"None"},"ingredients":{"1":"1 1/4 oz. Vodka","2":"3 oz. Orange juice"},"name":"Harvey Wallbanger","occasion":"Orange","procedure":{"1":"Float 1/2 oz. Galliano","2":"Pour ingredients as listed over ice"},"rating":2},{"form":{"glass":"Short Glass","type":"Mixed Cocktail"},"garnish":{"1":"None"},"ingredients":{"1":"1 oz. Korbel Spiced Brandy","2":"1/4 oz. Chambord Liqueur","3":"1/2 oz. Citrus Vodka"},"name":"Spiced Snakebite","occasion":"Any","procedure":{"1":"Mix ingredients as listed"},"rating":0},{"form":{"glass":"Stemmed Glass","type":"Frozen Drink"},"garnish":{"1":"Whipped cream and a cherry"},"ingredients":{"1":"3 oz. Southern Comfort","2":"1 Banana","3":"4 Ice Cubes","4":"1 oz. Sweetened Lime juice"},"name":"Southern Banana Daiquiri","occasion":"Any","procedure":{"1":"Blend all ingredients in blender until slushy"},"rating":2.5},{"form":{"glass":"Short Glass","type":"Mixed Cocktail"},"garnish":{"1":"None"},"ingredients":{"1":"1 1/4 oz. Pepe Lopez Tequila","2":"1 oz. Lime juice","3":"dash White Creme de Menthe"},"name":"Mockingbird","occasion":"Any","procedure":{"1":"Mix ingredients as listed"},"rating":0},{"form":{"glass":"Short Glass","type":"Mixed Cocktail"},"garnish":{"1":"None"},"ingredients":{"1":"12 oz. Canadian Mist","2":"1 can Condensed Milk","3":"2 Tbsp Chocolate Flavored Syrup","4":"1 tsp Almond Extract","5":"3 Eggs","6":"1/2 c Whipping Cream"},"name":"Mistical Eggnog","occasion":"Any","procedure":{"1":"Chill and serve with cinnamon stick or cherry garnish and sprinkle of nutmeg"},"rating":0},{"form":{"glass":"Cocktail Glass","type":"Mixed Cocktail"},"garnish":{"1":"None"},"ingredients":{"1":"1 1/2 oz. Early Times","2":"1 oz. Noilly Prat Dry Vermouth","3":"1 oz. Pineapple juice"},"name":"Algonquin","occasion":"Any","procedure":{"1":"Mix ingredients as listed"},"rating":0}];
    // response.json(conserveData);

    var howMany = -1;
    const randList = [];
    var randIntStr = "init";
    var iter = 0;
    const MIN = 1;
    const MAX = 1072;

    try {
        howMany = request.query.howmany;
    } catch (e) {
        console.log("/'howMany/' was invalid")
    }

    iter = iter * 24;

    if (howMany.length === -1 || iter === 0)
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


exports.getByIngredientSlack = functions.https.onRequest(async (request, response) => { // REQUIRED: page, total, findthis1, (findthis#, depending on total w/max of 5)
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?page=1&total=2&findthis1=rum&findthis2=gin 

    response.set('Access-Control-Allow-Origin', '*');

    var totalIngrs = 1;
    var find1 = " ";
    var find2;
    var find3;
    var find4;
    var find5;
    var iter = 0;
    var match_count = 0;

    try {
        totalIngrs = request.query.total; // MIN = 1, MAX = 5
        find1 += request.query.findthis1.toUpperCase();
        iter = request.query.page;
    } catch (e) {
        console.log("invalid query");
    }

    iter = iter * 24;

    if (find1.length === 1 || iter === 0)
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
    
            var dataObject = dataSnapshot.val();
            const allMatches = [];
    
            dataObject.every((eachDrink) => {
    
                var hasIngr1 = false;
                var hasIngr2 = false;
                var hasIngr3 = false;
                var hasIngr4 = false;
                var hasIngr5 = false;
    
                var ingrsObject = eachDrink.ingredients;
    
                ingrsObject.forEach((eachIngr) => {
    
                    var ingrStr = eachIngr.toUpperCase();

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

                if ( hasIngr1 || hasIngr2 || hasIngr3 || hasIngr4 || hasIngr5 ) {

                    if ( match_count >= (iter-24) && match_count < iter )
                        allMatches.push( eachDrink );
                    ++match_count;
                }
                
                hasIngr1 = false;
                hasIngr2 = false;
                hasIngr3 = false;
                hasIngr4 = false;
                hasIngr5 = false;

                return (match_count < iter);
            });
    
            if (allMatches.length > 0)
                response.json(allMatches);
            else
                response.json(STOCK_FAIL_RESPONSE);
            return null;
        }).catch(e => { console.log(e) });
    }
});


exports.getByIngredientStrict = functions.https.onRequest(async (request, response) => { // REQUIRED: page, total, findthis1, (findthis#, depending on total w/max of 5)
//  note: Please add ?variableName=value to end of https calls for passing aurguments.
//  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
//
//  EXAMPLE: full_address?page=1&total=2&findthis1=rum&findthis2=gin 
        
    response.set('Access-Control-Allow-Origin', '*');

    var totalIngrs = 1;
    var find1 = " ";
    var find2;
    var find3;
    var find4;
    var find5;
    var iter = 0;
    var match_count = 0;
    var blacklist = [];

    try {
        totalIngrs = request.query.total; // MIN = 1, MAX = 5
        find1 += request.query.findthis1.toUpperCase();
        iter = request.query.page;
    } catch (e) {
        console.log("invalid query");
    }

    iter = iter * 24;

    if (find1.length === 1 || iter === 0)
        response.json(STOCK_FAIL_RESPONSE);

    else {

        do {
            blacklist[0] = request.query.not1;
            blacklist[1] = request.query.not2;
            blacklist[2] = request.query.not3;
            blacklist[3] = request.query.not4;
            blacklist[4] = request.query.not5;
            blacklist[5] = request.query.not6;
            
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
    
            var dataObject = dataSnapshot.val();
            const allMatches = [];
    
            dataObject.every((eachDrink) => {
    
                var hasIngr1 = false;
                var hasIngr2 = false;
                var hasIngr3 = false;
                var hasIngr4 = false;
                var hasIngr5 = false;
                var blacklisted = false;
    
                var ingrsObject = eachDrink.ingredients;
    
                ingrsObject.forEach((eachIngr) => {
    
                    var ingrStr = eachIngr.toUpperCase();

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
                    blacklist.forEach((item) => {
                        if (item !== undefined)
                            if( ingrStr.includes( item.toUpperCase() ) )
                                blacklisted = true;
                    });
                });

                switch( totalIngrs ) {

                    case "1":
                        if (hasIngr1 && !blacklisted) {
                            if ( match_count >= (iter-24) && match_count < iter )
                                allMatches.push(eachDrink);
                            ++match_count;
                        } break;    
                    case "2":
                        if (hasIngr1 && hasIngr2 && !blacklisted) {
                            if ( match_count >= (iter-24) && match_count < iter )
                                allMatches.push(eachDrink);
                            ++match_count;
                        } break;
                    case "3":
                        if (hasIngr1 && hasIngr2 && hasIngr3 && !blacklisted) {
                            if ( match_count >= (iter-24) && match_count < iter )
                                allMatches.push(eachDrink);
                            ++match_count;
                        } break;
                    case "4":
                        if (hasIngr1 && hasIngr2 && hasIngr3 && hasIngr4 && !blacklisted) {
                            if ( match_count >= (iter-24) && match_count < iter )
                                allMatches.push(eachDrink);
                            ++match_count;
                        } break;
                    case "5":
                        if (hasIngr1 && hasIngr2 && hasIngr3 && hasIngr4 && hasIngr5 && !blacklisted) {
                            if ( match_count >= (iter-24) && match_count < iter )
                                allMatches.push(eachDrink);
                            ++match_count;
                        }
                }
    
                hasIngr1 = false;
                hasIngr2 = false;
                hasIngr3 = false;
                hasIngr4 = false;
                hasIngr5 = false;
                blacklisted = false;

                return (match_count < iter);
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
    
    const thingToFind = request.query.recipeName.toUpperCase();
    const rating = parseFloat(request.query.rating);
    response.set('Access-Control-Allow-Origin', '*');
    admin.database().ref("data").once('value')
        .then((dataSnapshot) => {
    
        admin.database().ref("data").once('value')
            .then((dataSnapshot) => {
    
                var match = false;
    
    
                dataSnapshot.forEach((currentDrinkSnapshotIndex) => {
                    if(currentDrinkSnapshotIndex.child("name").val() !== null) {
    
                    
    
                    var nameString = currentDrinkSnapshotIndex.child("name").val().toUpperCase();
                    // var ratingString = currentDrinkSnapshotIndex.child("rating").val();
                    if ( nameString.includes(thingToFind) ){
                        match = true;
                        const dbRef = currentDrinkSnapshotIndex.ref;
    
                        if(currentDrinkSnapshotIndex.hasChild("rating")) {
                             let ratingNumber = currentDrinkSnapshotIndex.child("rating").val();
                             var updatedRating = (parseFloat(ratingNumber) + parseFloat(rating))/(2.0);
                             dbRef.update({"rating": updatedRating});
                         }else {
                             dbRef.update({"rating" : rating });
                         }
                        
                    }
                }
                     
                });
    
                response.json(match);
                return null;
            }).catch(e => { console.log(e) });

        return null;
    }).catch(e => {console.log(e) });
});


exports.getRecipeRating = functions.https.onRequest(async (request, response) => { 
    //  note: Please add ?variableName=value to end of https calls for passing aurguments.
        //  Subsequent aurguments can be passed by adding &variableName2=value directly after the first.
        //
        //  EXAMPLE: full_address?recipeName=Cactus Kicker - 4
        response.set('Access-Control-Allow-Origin', '*');
        const thingToFind = request.query.recipeName.toUpperCase();
        admin.database().ref("data").once('value')
            .then((dataSnapshot) => {
                dataSnapshot.forEach((currentDrinkSnapshotIndex) => {
                    if(currentDrinkSnapshotIndex.child("name").val() !== null) {
                    var nameString = currentDrinkSnapshotIndex.child("name").val().toUpperCase();
                    // var ratingString = currentDrinkSnapshotIndex.child("rating").val();
                    if ( nameString.includes(thingToFind) ){
                        if(currentDrinkSnapshotIndex.hasChild("rating")) {
                             let ratingNumber = currentDrinkSnapshotIndex.child("rating").val();
                             response.send(ratingNumber);
                         }else {
                             response.send(0);
                         }           
                    }
                }
                });
                response.send(0);
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

exports.addDrink = functions.https.onRequest(async (request, response) => {

    // {+"form":{"glass":"Collins","type":"Mixed+Cocktail"},+"garnish":{"1":"none"},+"ingredients":{"1":"4+oz.+Sake"},+"name":"The+Coolio",+"occasion":"Any",+"procedure":{"1":"Pour+then+drink"},+"rating":0.0}
    response.set('Access-Control-Allow-Origin', '*');

    var newDrinkObj = request.query.newDrink;
    var location;
    var newTotal;

    admin.database().ref("data").once('value')
        .then(dataSnapshot => {

            location = dataSnapshot.child("1/totalDrinks").val();
            newTotal = ++location;

           const dataRef = dataSnapshot.ref;
        dataRef.child(location).set( JSON.parse(newDrinkObj) );
        dataRef.update({"1/totalDrinks":newTotal});

            return null;
        }).catch(e => { console.log(e) });
    
    response.status(200).send("Ryoukai!");
});

/*
var glassForm;
var typeForm;
var garnish = [];
var ingredients = [];
var drinkName;
var occasion;
var procedure = [];
var newDrinkURL = "https://us-central1-rvrslkupdb.cloudfunctions.net/addDrink?newDrink=";
var drinkObjectFormatter = "{+\"form\":{\"glass\":" + glassForm + ",\"type\":" + typeForm +
                            "},+\"garnish\":{\"1\":" + garnish[0] + ",\"2\":" + garnish[1] + ",\"3\":" + garnish[2] + ",\"4\":" + garnish[3] +
                            "},+\"ingredients\":{\"1\":" + ingredients[0] + ",\"2\":" + ingredients[1] + ",\"3\":" + ingredients[2] + ",\"4\":" + ingredients[3] +
                            "},+\"name\":" + drinkName + 
                            ",+\"occasion\":" + occasion + 
                            ",+\"procedure\":{\"1\":" + procedure[0] + ",\"2\":" + procedure[1] + ",\"3\":" + procedure[2] + ",\"4\":" + procedure[3] + 
                            "},+\"rating\":0.0}";
newDrinkURL = newDrinkURL + drinkObjectFormatter;
*/

exports.devAddRatingKeyToAll = functions.https.onRequest(async (request, response) => { //under-construction

    //var rootRef = admin.database().ref("data");


    // rootRef.child("1").update({"ratingRunningTotal" : 0});
    // rootRef.child("1").update({"ratingCount" : 0});

    admin.database().ref("data").once('value')
        .then((dataSnapshot) => {

            // for (var i = 1; i < 1074; ++i) {

            //     dataSnapshot.child("i").update({"rating":0});
            // }
            dataSnapshot.forEach((eachEntry) => {

                const drinkRef = eachEntry.ref;

                drinkRef.update({"rating" : 0});
            })

            return null;
        }).catch(e => { console.log(e) });
    
    response.status(200).send("ryoukaishimashita");
    // rootRef.forEach(function(eachEntry) { //pre-arrow-callback style

      
    //     return null;  
    // }).catch(e => { console.log(e) });
});