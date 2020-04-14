# WitchesBrew
>  Witches Brew started out with a team of four versatile developers by the names of:
> 
> * Benjamin Bond
> * Jonathan Crouch
> * Evan Estrada
> * Andrew Saenz
>
> with a vision to create an application that helps prevent good ingredients from going to waste. We want to help individuals with limited mixing experience create recipes based on the ingredients they already have at home. 

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
![Cocktail](/style/cocktail.png). 

Hosted at: https://cs3398-betazoids-alphamales.github.io/CS3398-betazoids-S2020/

This is a best effort at creating a recipe recommendation program. For the moment, we are specializing in cocktail recipes. We hope to find a database full of a wide variety of recipes or make our own.

## Screenshots
![Example screenshot](/style/example-usage.png)

## Technologies
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Google Firebase](https://firebase.google.com/)



## Setup
Describe how to install / setup your local environement / add link to demo version.

## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of TODOs for future development:

* __Food Allergy Warning__: Warn the user if one of the recipes could trigger a food allergy. Casual users use this. Ben's first user story corresponds to this feature.
* __Database Creation__: Import a MySQL dump to reference when searching for recipes. All users indirectly use this. Ben's first user story corresponds to this feature. 
* __Recipe Recommendation__: Create an algorithm that takes a list of cocktail ingredients, searches a database for recipes with those ingredients, and returns a list of the top ten recipes that include those ingredients. Casual users use this. Ben's first user story corresponds to this feature. 
* __User Interface__: Create an UI on the web that provides an interface in which users interact with the program. Andrew's second user story corresponds to this feature.
#__Gamification__: Users can pass ingredients to the random command to pick random recipes instead of highly rated/first five recipes in database table. Evan's first story corresponds to this.

## Status

Please see the status for each team member below.

### Sprint 2

 - Benjamin Bond: Active and contributing
 
 - Andrew Saenz: Active and contributing

 - Evan Estrada: Active and contributing
 
 - Jonathan Crouch: Active and contributing


### Sprint 1
We have successfully built our database, built the front-end of the website, and have connected the two. We have also implemented a search of database recipes as well as a typehead for both the recipe and ingredient searches. 

* Benjamin Bond: Active and contributing

* Evan Estrada: Active and contributing

* Andrew Saenz: Active and contributing

* Jonathan Crouch: Active and contributing

## Next Steps

Please see the next steps for each team member below. 

### Sprint 2

#### Andrew

 - Discover new ways for handling the tasks of sprint three

 - Optimize database to more efficiently handle higher traffic
 
 - Collaberate with team to handle unique problems that persist
 
#### Evan
- Make the design of the app more modern and responsive, especially the top-nav

- Work on additional functionality to make the app more useful for users

- Refactor my code (delete old files, unnecessary comments, and random console logs)

### Benjamin 

- Refactor search functions to all use one base search function for populating drink cards.

- Link rating to userID so that users can save favorite drinks and rated drinks.

- Fix UI problems to make sure the app is ready for its first release.

### Jonathan

- Refactor index.html to utilize only one scroll panel

- Populate sidebar links with appropriate pages/functionalities

- Taylor website to Android wrapper.

### Sprint 1

#### Andrew
 
 - My current status is active and contributing.

 - The next step for me is to talk with my teammates and decide what the most important functions they would need from me

#### Benjamin

1. Add support for multiple ingredient search. 

2. Implement the side-bar navigation buttons that automatically search for drinks with fruit or juices. 

3. Implement and display a rating category for each drink when the drink list populates.


#### Evan

1: I would like to become more familiar with the database and its functionality

2: I would like to work on the front-end design to make it more modern. 

3: I would like to work on further functionality of the searching and filtering functionality. 


#### Jonathan

1: Begin building on my Firebase knowledge to better integrate back-end to front-end.

2: Clean up front-end code & work on scrollable panel responsiveness.

3: Optimize front-end-back-end connection/JavaScript to lower loading times. 


## Artifacts

Please see the artifacts for each team member below.

### Sprint 2

#### Andrew

 - My artifact for sprint 2 is the apk file created for use on Android devices. Anyone with developer options enabled on their Android 
   device can install and run this application.
 
   [WithesBrewApp.apk](https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/blob/android-dev/WitchesBrewAndroid/app/build/outputs/apk/debug/app-debug.apk)
   
 - And an image of the apks usage (click image to expand)
 
   <img src=https://raw.githubusercontent.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/master/artifact-apk-tablet.png width="400">


#### Evan

- Artifact 1: I added the ability to choose ingredients and have them populate in the form of tags below the sidebar search bar. 
An array of ingredients is created and is used to generate a HTTPS request URL.

    https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/2245d37a866cec140b7892babee21081d0c9e909 

- Artifact 2: I implemented a dark-mode toggle which changes the appearance of various components on the page to be easier on the eyes. 

    https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/e31434ad5a63784eb033c1ff89dc6b56352659ad

### Ben

- Artifact 1: I added a login in button that links to ones google account. When a user clicks login, a login modal pops up if the user is not already logged into their google account and is prompted to enter login information.

   https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/3701eac3b4877145e41233cb44fb196746747bcf

- Artifact 2: I created a rating system that allows users to rate a drink based on a five star rating. The rating system also pulls from rating from the database and display them when drinks load.

   https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/cbea832a599c9cbbb435632b53784e30eda87b9c

### Jonathan

- Artifact 1: I created a dynamic pop-up modal for all the individual drink cards.

  https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/b6b3c2e7b3b7a75581b602bf5f779ecd2e693e30

- Artifact 2: I linked the navigation search bar to the search by name function.

  https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/e2687608283a027d78044a0d3d7b625e29c6d33c

### Sprint 1

#### Andrew

 - My first artifact is the index.js file used for the backend functions that operate on our database.
   These functions are accessed through https requests, and wait for a response that includes
   a relavent list of objects.
   
   [functions/index.js](https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/blob/database-staging/functions/index.js)
   
 - My second artifact is an export json file of current database on the Firebase Realtime-Database.
   This export is a direct translation of our working database on the server.
   Since linking directly to it would do no good, this seems to be the best alternative.
   
   [public/data.json](https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/blob/master/public/data.json)

#### Benjamin

##### Linked the front end to the back using the search bar:

I added support for searching for one ingredient in our database to the search bar. 

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/b143f5cd05125beb0475f2c5aa58e6f0d86f1380

##### Temporarily fixed CORS backend settings so that we could access backend functions.

Allowed all CORS access to our backend function so that we could access the function without a unique key. This is a temporary fix and will need to be changed in the future.

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/5d3440d665aefe2e25f877f5505b7e47400b6915

##### Fixed styling issues and a list population bug

Fixed styling issues with the nav bar search button no properly positioning itself ontop of the search bar. Also removed previous searches from the bottom of the accordion div so that search functionality would work as expected. 

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/85c8a838eb5b271435946dccbccd8027ccab2eb0


#### Evan

##### Created a mockup for our site's front-end:

I created a mockup containing multiple images for the initial website design. We ended up using this for the site's initial design and functionality.  

Link to issue: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/issues/13

Link to mockup: https://docs.google.com/presentation/d/1H3nJWtqTiYMdaJfWLd7iGyKQ_eKWjSnrIqtsADG_00g/edit?usp=sharing

##### Added a typahead to the side navigation search:

After Benjamin, Jonathan, and I got the typehead working, I added the typeahead to the side navigation search. The typahead allows users to see ingredients that are available in the database by displaying them below the search bar as they type.

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/2cdb41fa513855d27cad351209eb67471c02cd21


#### Jonathan

##### Created a bootstrap website based on Evan's mockup:

I created an HTML/CSS/JavaScript website using bootstrap and prepped it for connecting to the backend. This includes the initial website navbar/sidebar, scrollable panel, responsive display, and card structure. 
Link to issue: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/issues/24

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/270aa38f8cef1b0a46027c3335607b557106186a

##### Created a basic icon/logo as an identifier:

I whipped up a quick logo/icon in Adobe Illustrator to give the site a more polished feel in these early stages. It's currently used as an image for the website header and possibly will be used as the Android app icon.

Link to commit: https://github.com/CS3398-betazoids-alphamales/CS3398-betazoids-S2020/commit/1f83d1307fa2d34baf4c80f47e0a61cb26f4c71d



## Inspiration
Project inspired by our team's weak mixing skills, based on the idea of backward searching.

## Contact
Created by [@CS3398-betazoids-alphamales](https://github.com/CS3398-betazoids-alphamales) - feel free to contact us!
