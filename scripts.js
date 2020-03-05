

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("side-navigation").style.width = "256px";
  document.getElementById("content-wrapper").style.marginLeft = "256px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("side-navigation").style.width = "0";
  document.getElementById("content-wrapper").style.marginLeft = "0";
  document.getElementById("content-wrapper").style.margin = "auto";
}

function sidebarSearch(){
	document.getElementById("home").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("ingredient-search").style.display = "block";
}

function homeDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("home").style.display = "block";
	}
function aboutDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("about").style.display = "block";
	}

function servicesDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("services").style.display = "block";
	}

function browseDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("browse").style.display = "block";
	}

function alcoholDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("alcohol").style.display = "block";
	}

function juicesDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("juices").style.display = "block";
	}

function fruitDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("fruit").style.display = "block";
	}

function otherDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("other").style.display = "block";
	}

function favDisplay(){
	document.getElementById("ingredient-search").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("services").style.display = "none";
	document.getElementById("name-search").style.display = "none";
	document.getElementById("browse").style.display = "none";
	document.getElementById("alcohol").style.display = "none";
	document.getElementById("home").style.display = "none";
	document.getElementById("fruit").style.display = "none";
	document.getElementById("other").style.display = "none";
	document.getElementById("juices").style.display = "none";
	document.getElementById("favorites").style.display = "block";
	}

	// Get the modal
	var modal = document.getElementById('loginpopup');

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
  		if (event.target == modal) {
   		 modal.style.display = "none";
 	 	}
	}
