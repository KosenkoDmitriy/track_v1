$(document).ready(function(){

  var pageContent = $('.page-content');

  if(pageContent.length) {
    var waypoint = new Waypoint({
      element: $('.page-content'),
      handler: function(direction) {
        $("body").toggleClass('isHeaderFixed');
      },
      offset: 70
    })
  }

});

