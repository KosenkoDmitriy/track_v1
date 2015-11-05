(function() {
  if (typeof window.Alchemy === 'undefined') {
    window.Alchemy = {};
  }

  Alchemy.showMenubar = function() {
    var menubar;
    menubar = document.getElementById('alchemy_menubar');
    if (typeof menubar !== 'undefined' && menubar !== null) {
      return menubar.style.display = "block";
    }
  };

  Alchemy.showMenubar();

}).call(this);
