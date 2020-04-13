


function getAllIngredients(searchText) {

    var xhttp = new XMLHttpRequest();
    

    var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/getAllIngrs?' + searchText;
    xhttp.open('POST', targetUrl);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("getAll").innerHTML =
          this.responseText;
        }else if (this.status){
            document.getElementById("getAll").innerHTML = "Can not access: " + targetUrl 
                + " <br /> Response: " + this.status + " " + this.responseText;
        }else{
            document.getElementById("getAll").innerHTML = "Loading... ";
        }
      };
      
      
      xhttp.send();
    }

    