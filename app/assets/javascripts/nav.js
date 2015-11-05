var footerScroll = function() {
  $('.top-bar a').on('click', function(event) {
      $('html, body').stop().animate({
          scrollTop: 0
      }, 500, 'swing');
      event.preventDefault();
  });
}


var mobileNav = function(){
  var winH,
      $mobileLinks  = $('.mobile-links'),
      $pageContent = $('.page-content'),
      menuOpen      = false;

  var navHeight = function(){
    winH = $(window).height(),
    $mobileLinks.innerHeight(winH);
  };

  var toggleMobileMenu = function(){
    if (!menuOpen){
      $mobileLinks.addClass('open');
      menuOpen = true;
      $pageContent.css('position', 'fixed');
    }
    else {
    $mobileLinks.removeClass('open');
      menuOpen = false;
      $pageContent.css('position', 'relative');
    }
  }

  $('.hamburger-nav, .close-nav, .mobile-nav .account-link').on("click",toggleMobileMenu);

  $(window).resize(navHeight);
  navHeight();



};

var accountDropdown = function(){
  var dropdownOpen = false,
      dropdownMenu = $('.account-dropdown'),
      dropdownArrow = $('.arrow-up');

  var toggleDropdown = function() {
    if (!dropdownOpen) {
      openDropDown();
    }
    else {
      closeDropDown();
    }
  }
  var closeDropDown = function() {
    $(window).off('scroll', closeDropDown);
    dropdownMenu.removeClass('open');
    setTimeout(function() { dropdownArrow.hide() }, 180)
    dropdownOpen = false;
  }
  var openDropDown = function() {
    $(window).on('scroll', closeDropDown);
    dropdownMenu.addClass('open');
    dropdownArrow.show();
    dropdownOpen = true;
  }

  $('#header .account').on("click",function(e){
      toggleDropdown();
  });
  $('#header .account > a').on("click", function(e){
     e.preventDefault();
  });

  // Close mini cart when clicking outside of cart content and cart control areas
  $(document).on('click tap', function(e) {
    var $target = $(e.target);
    if( $target.parents('#header .account').length == 0) {
      closeDropDown();
    }
  });
}

$(document).ready(function(){
  mobileNav();
  accountDropdown();
  footerScroll();
})



