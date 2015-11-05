$(function() {
  // Smooth scrolling

  var $productsIndexPageAnchors  = $('.products-nav a[href^="#"]');

    $productsIndexPageAnchors.pageScroll({
      offset: 175,
      speed: 1400,
      easing: 'easeInOutExpo',
      event: 'click',
      writeHash: false
    });
});