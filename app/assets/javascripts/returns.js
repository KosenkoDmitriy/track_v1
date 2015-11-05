$(document).ready(function(){

// show or hide exchange fields
$('input[name=type]').on('click', function(){
  if ($(this).val() == 'exchange') {
    $('.exchange-input').show();
    window.ts_return_state = 'exchange';
  }
  else {
    $('.exchange-input').hide();
    window.ts_return_state = 'return';
  }
})

$(document).ready(function() {
  $('#ts-return-form').submit(function(e) {
    e.preventDefault();
    if(validate()) {
      $(this).submit();
    }
    return false;
  });
});

// send return form via email to tracksmtih
$('form#ts-return-form')
  .bind("ajax:beforeSend", function(evt, xhr, settings){
      var $divResponse = $('.return-submitted');

      // Update the text of the submit button to let the user know stuff is happening.
      // But first, store the original text of the submit button, so it can be restored when the request is finished.
      $divResponse.text( "Sending...." );

    })
    .bind("ajax:success", function(evt, data, status, xhr){
      var $form = $(this);
       var $divResponse = $('.return-submitted');

      // Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
      $form.find('input[type="email"]').val("");
      $form.hide();
      $('.returns-text').hide();
      $divResponse.text("Thank you! Your form has been submitted. You will receive an email shortly from the Tracksmith team with further information.");
    })
    .bind('ajax:complete', function(evt, xhr, status){
      var $divResponse = $('.return-submitted');
    })
    .bind("ajax:error", function(evt, xhr, status, error){
       var $divResponse = $('.return-submitted');
          errors,
          errorText,
      errorList;

      try {
        // Populate errorText with the comment errors
        errors = $.parseJSON(xhr.responseText);
      } catch(err) {
        // If the responseText is not valid JSON (like if a 500 exception was thrown), populate errors with a generic error message.
        errors = {message: "Please reload the page and try again"};
      }

      // Build an unordered list from the list of errors
      errorText = "There were errors with the submission. Please reload the page and try again.";
      errorList = "<ul>"
      for ( error in errors ) {
        errorList += "<li>" + error + ': ' + errors[error] + "</li> ";
      }

      errorList += "</ul>";

      // Insert error list into form
      $divResponse.html(errorText);
    });
  });

function validate() {
  var valid = true;

  var form         = $('form#ts-return-form');
  var name         = form.find('#name');
  var email        = form.find('#email');
  var order_number = form.find('#order_number');
  var replacing    = form.find('#replacing');
  var desired      = form.find('#desired');

  if(name.val() === "") {
    valid = false;
    name.addClass('error');
  } else {
    valid = true;
    name.removeClass('error');
  }

  if(email.val() === "") {
    email.addClass('error');
    valid = false;
  } else {
    email.removeClass('error');
    valid = true;
  }

  if(order_number.val() === "") {
    order_number.addClass('error');
    valid = false;
  } else {
    order_number.removeClass('error');
    valid = true;
  }

  if(window.ts_return_state === 'exchange') {
    if(replacing.val() === "") {
      replacing.addClass('error');
      valid = false;
    } else {
      replacing.removeClass('error');
      valid = true;
    }

    if(desired.val() === "") {
      desired.addClass('error');
      valid = false;
    } else {
      desired.removeClass('error');
      valid = true;
    }
  }

  return valid;
}