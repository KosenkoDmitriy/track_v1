
$(document).ready(function(){

  var $radio = $('input[type=radio]'),
      $checkedRadio = $('input[type=radio]:checked'),
      $cardSelect = $('div.card-select'),
      $cardSelectInput = $('input[name=existing_card]');

  $radio.closest('label').addClass('radio');
  $checkedRadio.closest('label').addClass('checked');
  $radio.on('click', function(){
    $(this).closest('label').addClass('checked');
    $radio.not(':checked').closest('label').removeClass('checked');
  })



  // check if hash exists, if so, show that tab and make cooresponsing link active. default tab is dashboard
  if (window.location.hash) {
    var $currentTab = $(window.location.hash),
        $currentLink = $('.account-link[href = ' + window.location.hash + ']');
    $currentTab.addClass('active');
    $currentLink.addClass('active');
    $('.account-section').not($currentTab).removeClass('active');
    $('.account-link').not($currentLink).removeClass('active');
  };

})

$(document).on('click tap', '.account-main .account-link, .account-dropdown .account-link a, .mobile-links .account-link a', function(e){
  e.preventDefault();

  // on click, show that tab, update the URL hash, and add .active to link

  var $this = $(this),
      $target = $(e.target.hash),
      hash = e.target.hash;

  window.location = "/shop/account" + hash;

    $('html, body').animate({
      scrollTop: 0
    }, 0);


  $this.addClass('active');
  $target.addClass('active');
  $('.account-section').not($target).removeClass('active');
  $('.account-link').not($this).removeClass('active');

})
