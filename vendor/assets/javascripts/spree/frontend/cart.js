var width;

  var winWidth = function(){
    width = $(window).width();
  }
  

  Spree.fetch_cart = function() {
    return $.ajax({
      url: '/shop/cart_link',
      success: function(data) {
        return $('#link-to-cart').html(data);
      }
    });
  };

  Spree.fetch_mobile_cart = function() {
    return $.ajax({
      url: '/shop/cart_link',
      success: function(data) {
        return $('#mobile-link-to-cart').html(data);
      }
    });
  };

  $(document).ready(function(){
    winWidth();
    Spree.fetch_cart();
    if (width < 768) {
      Spree.fetch_mobile_cart();
    }
  })

  $(window).resize(function(){
    winWidth();
    if (width < 768) {
      Spree.fetch_mobile_cart();
      }

  });
