(function ($) {
  $(function() {
    var referralForm = $('form#referral_form');
    var completeRefForm = $('form#referral_acceptance');
    var response = $('#referral_steps');

    function successMsg() {
      response.removeClass('is-processing');
      response.addClass('is-submitted');
    }

    if (referralForm) {
      referralForm.on('ajax:send', function(xhr) {
        response.addClass('is-processing');
        window.setTimeout(successMsg, 2000);
      });
    }

    if (completeRefForm) {
      completeRefForm.submit();
    }
  });
})(jQuery);
