/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("side-navigation").style.width = "250px";
  document.getElementById("content-window").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("side-navigation").style.width = "0";
  document.getElementById("content-window").style.marginLeft = "0";
}