$(document).ready(function(){

  $('form#email-capture-modal')
    .bind("ajax:beforeSend", function(evt, xhr, settings){
      var $divResponse = $('div#response');

      // Update the text of the submit button to let the user know stuff is happening.
      // But first, store the original text of the submit button, so it can be restored when the request is finished.
      $divResponse.data( 'origText', $divResponse.text() );
      $divResponse.text( "Adding Email...." );

    })
    .bind("ajax:success", function(evt, data, status, xhr){
      var $form = $(this);
       var $divResponse = $('div#response');

       ga('send', 'event', { eventCategory: 'email', eventAction: 'capture', eventLabel: google_analytics_event_label, eventValue: 1});

      // Reset fields and any validation errors, so form can be used again, but leave hidden_field values intact.
      $form.find('input[type="email"]').val("");
      $('#email-capture-modal').hide();
      $divResponse.html("Thank you!");

			// modal email capture handling
			$('.email_capture_modal').each(function(){
				setTimeout(function(){
					$('.modal-container, .modal-overlay').removeClass('in');
					setTimeout(function(){
						$('.modal-wrapper').removeClass('visible');
					}, 250);
					saveModalCookie();
				}, 1500);
			});
    })
    .bind('ajax:complete', function(evt, xhr, status){
      var $divResponse = $('div#response');
    })
    .bind("ajax:error", function(evt, xhr, status, error){
       var $divResponse = $('div#response'),
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


	  // Email Capture Modal
		// Email Capture Modal methods

		function saveModalCookie(){
			// save a cookie to prevent modal display in the future
			$.cookie('tracksmithModalEmail','dismissed');

		}
		function getModalCookie(){

			// return a cookie if one is found, or false
			var cookieValue = $.cookie('tracksmithModalEmail');
			if(!cookieValue){
				return false;
			} else {
				return cookieValue;
			}
		}

		function displayEmailModal(){
			ga('send', 'event', { eventCategory: 'email', eventAction: 'view', eventLabel: google_analytics_event_label, eventValue: 1});

			$('.modal-wrapper').addClass('visible');
			setTimeout(function(){
				$('.modal-overlay, .modal-container').addClass('in');
			}, 500);
		}

		function recenterEmailModal(){
			var $w = $(window).width(),
				$h = $(window).height(),
				$m = $('.modal-container'),
				l = Math.floor(($w-$m.width())/2) > 0 ? Math.floor(($w-$m.width())/2) : 0,
				t = Math.floor(($h-$m.height())/2) > 0 ? Math.floor(($h-$m.height())/2) : 0;

			$m.css({left: l, top: t});
		}

		$('.email_capture_modal').each(function(){

			$('.modal-dismiss').on('click', function(e){
				ga('send', 'event', { eventCategory: 'email', eventAction: 'capture lost', eventLabel: google_analytics_event_label, eventValue: 1});

				e.preventDefault();
				$('.modal-container, .modal-overlay').removeClass('in');
				setTimeout(function(){
					$('.modal-wrapper').removeClass('visible');
				}, 250);
				saveModalCookie();
			});
			if(!getModalCookie()){
				setTimeout(function(){
					displayEmailModal();

				}, 10000);
			}

		});
});

