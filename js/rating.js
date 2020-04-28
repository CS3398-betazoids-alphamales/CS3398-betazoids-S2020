
$(document).ready(function() {


    var $star_rating = $('.star-rating .fa');
  
  var SetRatingStar = function(sep, ratingN, ratingO) {

    if(!rating0){
      rating0=0;
    }
  
    var xhttp = new XMLHttpRequest();
        
   
        var targetUrl = 'https://us-central1-rvrslkupdb.cloudfunctions.net/setRecipeRating?recipeName=' + ratingN + '&rating=' + ratingO.value;
        xhttp.open('POST', targetUrl);
        xhttp.send();
        console.log("This is the rating ID passed to the function")
        //console.log(ratingO.value);
    return $star_rating.each(function() {
      // console.log("in the function $(this): ");
      // console.log($(this));
      // console.log("in the function this.parentElement: ");
      // console.log($(this.parentElement));
      if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating')) && this.parentElement == sep) 
      {
        return $(this).removeClass('fa-star-o').addClass('fa-star');
      } else {
        return $(this).removeClass('fa-star').addClass('fa-star-o');
      }
    });
  };
  
  $star_rating.on('click', function() {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    var ratingName = $(this).siblings("input.rating-value")[0].name;
    var ratingID= $(this).siblings("input.rating-value")[0];
    var sepObj = this.parentElement;
    console.log($(this).siblings('input.rating-value'));
    console.log(ratingName);
    return SetRatingStar(sepObj,ratingName,ratingID);
  });
  
  SetRatingStar();
  });
