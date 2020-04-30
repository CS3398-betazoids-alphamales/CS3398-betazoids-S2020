



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

  //   $(document).ready(function() {


  //     $('.scrollable-panel').scroll(function() {
  //       //console.log("scroll height: " + $('.scrollable-panel').scrollTop());
  //       //console.log("scroll panel height: " + $('.scrollable-panel').height());
  //       if ($(window).scrollTop() + $(window).height() == $('.scrollable-panel').offset().top + $('.scrollable-panel').height()) { 
  

  //         //var element = document.getElementById("lm-container");
  //         //element.parentNode.removeChild(element);
  //         lmNamePage++;
  //         //console.log("The page # is: " + lmNamePage);
  //         // var currentButton = $('.current');

  //         // for(i in currentButton){
  //         //   if(i.prop("name").equals("homelink")){
  //         //     console.log("executed get random on scroll");
  //         //     getRandom();
  //         //   }
  //         // }
            
          
  //         getByName(lastSearch, lmNamePage);
  //       }
  //     });

  //     // working as is dont touch
  //     $('.nav-link').click( function() {

  //         $('a.current').removeClass('current');
  //         $(this).addClass('current');
    
  //     });

  // });



  // experimenting with changing scrollbar styling during scroll
  // $('.scrollable-panel').scroll(function() {

  //   var first =  $('.scrollable-panel').scrollTop();
    
  //   var second = $('.scrollable-panel').scrollTop()+1;
  //   document.getElementById('main-panel').style.cssText= "::-webkit-scrollbar{ display: none;}";
  //   while(first != second){
  //     console.log("in the freaking function");
      
  //     first =  $('.scrollable-panel').scrollTop();
  //     second = $('.scrollable-panel').scrollTop();
  //   }
  //   document.getElementById('main-panel').style.cssText= "::-webkit-scrollbar{ display: block;}";
    

    
  // });

  
    