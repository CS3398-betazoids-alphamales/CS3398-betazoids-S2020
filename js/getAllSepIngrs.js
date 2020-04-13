$(document).ready(function() {

    var xhttp = new XMLHttpRequest();

      var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/getAllSepIngrs?;
      xhttp.open('POST', targetUrl);
      xhttp.send();

      xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            sessionStorage.setItem('ingredientCategoryObject', JSON.stringify(data));
            
          }
        }
    $('#alcohollink').on('click', function() {

        var alcoholArray = sessionStorage.getItem('ingredientCategoryObject')

    });

    $('#juiceslink').on('click', function() {

    });

    $('#fruitlink').on('click', function() {

    });

    $('#otherlink').on('click', function() {

    });

    $('#favlink').on('click', function() {

    });
});