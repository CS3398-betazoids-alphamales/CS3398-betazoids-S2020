

$('#example-search-input-0').on('keyup', function(event) {
    var inner = document.getElementById("example-search-input-0").value;
    console.log(inner);

    var sanitize = inner.toUpperCase();
    console.log(sanitize);
   
    if(event.keyCode == 13){
        var xhttp = new XMLHttpRequest();


        var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/helloWorld?';
        xhttp.open('POST', targetUrl);

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("unique").innerHTML =
              this.responseText;
              //console.log(this.responseText);
            }else if (this.status){
                document.getElementById("unique").innerHTML = "Can not access: " + targetUrl 
                    + " <br /> Response: " + this.status + " " + this.responseText;
                    console.log(this.responseText);
            }else{
                document.getElementById("unique").innerHTML = "Loading... ";
            }
          };
        xhttp.send();

    }
})