 $(document).ready(function(){
        $('#send_message').click(function(e){
            
            //Stop form submission & check the validation
            e.preventDefault();
            
            // Variable declaration
            var error = false;
            var ccr_name = $('#ccr_name').val();
            var ccr_email = $('#ccr_email').val();
            var ccr_subject = $('#ccr_subject').val();
            var ccr_message = $('#ccr_message').val();
            
         	// Form field validation
            if(ccr_name.length == 0){
                var error = true;
                $('#name_error').fadeIn(500);
            }else{
                $('#name_error').fadeOut(500);
            }
            if(ccr_email.length == 0 || ccr_email.indexOf('@') == '-1'){
                var error = true;
                $('#email_error').fadeIn(500);
            }else{
                $('#email_error').fadeOut(500);
            }
            if(ccr_subject.length == 0){
                var error = true;
                $('#subject_error').fadeIn(500);
            }else{
                $('#subject_error').fadeOut(500);
            }
            if(ccr_message.length == 0){
                var error = true;
                $('#message_error').fadeIn(500);
            }else{
                $('#message_error').fadeOut(500);
            }
            
            // If there is no validation error, next to process the mail function
            if(error == false){
               // Disable submit button just after the form processed 1st time successfully.
                $('#send_message').attr({'disabled' : 'true', 'value' : 'Sending...' });
                
				/* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
                $.post("email.php", $("#contact-form").serialize(),function(result){
                    //Check the result set from email.php file.
                    if(result == 'sent'){
                        //If the email is sent successfully, remove the submit button
                         $('#ccr_name').remove();
                         $('#ccr_email').remove();
                         $('#ccr_subject').remove();
                         $('#ccr_message').remove();
                         $('#submit').remove();
                        //Display the success message
                        $('#mail_success').fadeIn(500);
                    }else{
                        //Display the error message
                        $('#mail_fail').fadeIn(500);
                        // Enable the submit button again
                        $('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                });
            }
        });    
    });