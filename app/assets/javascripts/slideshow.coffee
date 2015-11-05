initSlideshow = ->
  $('#slideshow-intro').slick
    arrows: false
    dots: true

  $('#slideshow-no-days-off').slick
    arrows: false
    dots: true

  $('.product-slider').slick
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1


$ ->
  initSlideshow()