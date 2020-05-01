$(document).ready(function() {
    

    $('.sev_check').click(function() {
      $('.sev_check').not(this).prop('checked', false);
    });
    
    $('.type_check').click(function() {

        
        var image1;

        if($(this).is(":checked")){
            console.log($(this).prop("value"));
            image1 = $(this).prop("value").split('+').join(' ');
        }
        else if($(this).is(":not(:checked)")){
            console.log("Checkbox is unchecked.");
        }

        image1 = getImage(image1);

        let change = document.getElementById('addadrinkimagedisplay');

        change.src = image1;
      $('.type_check').not(this).prop('checked', false);
    });


    
    
    var max_fields  = 10; //maximum input boxes allowed
        var wrapper1 = $(".input_fields_wrap"); //Fields wrapper
        var add_button  = $(".add_field_button"); //Add button ID
        
        var x = 1; //initlal text box count
        $(add_button).click(function(e){ //on add input button click
            e.preventDefault();
            if(x < max_fields){ //max input box allowed
            let add = document.getElementById("inputField1").value;
            
                x++; //text box increment
                
                $(wrapper1).append('<div><input type="text" id="inputField'+ x +'" name="ingredients" value="' + add + '"/><button href="#" class="remove_field">-</button></div>'); //add input box

                document.getElementById("inputField1").value = "";
            }
        });
        
        $(wrapper1).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;
        })
        
        
        // START PROCEDURE CODE
        
        var wrapper2   		= $(".procedure_fields_wrap"); //Fields wrapper
        var add_procedure_button      = $(".add_procedure_button"); //Add button ID
        
        var y = 1; //initlal text box count
        
        $(add_procedure_button).click(function(e){ //on add input button click
            e.preventDefault();
            if(y < max_fields){ //max input box allowed
                let add = document.getElementById("procedureField1").value;
                y++; //text box increment
                
                $(wrapper2).append('<div><input type="text" id="procedureField'+ y +'" name="procedure" value="' + add + '"/><button href="#" class="remove_field">-</button></div>'); //add input 
                document.getElementById("procedureField1").value = "";       
            }
        });
        
        $(wrapper2).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); y--;
        })
    
    });