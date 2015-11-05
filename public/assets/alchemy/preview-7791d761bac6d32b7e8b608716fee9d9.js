if (typeof(Alchemy) === 'undefined') {
  var Alchemy = {};
}

// Load jQuery on demand. Use this if jQuery is not present.
// Found on http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
Alchemy.loadjQuery = function(callback) {

  var thisPageUsingOtherJSLibrary = false;

  if (typeof($) === 'function') {
    thisPageUsingOtherJSLibrary = true;
  }

  function getScript(url, success) {
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0],
      done = false;
    script.src = url;
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        // callback function provided as param
        success();
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
      };
    };
    head.appendChild(script);
  }

  getScript('//code.jquery.com/jquery.min.js', function() {
    if (typeof(jQuery) !== 'undefined') {
      if (thisPageUsingOtherJSLibrary) {
        jQuery.noConflict();
      }
      callback(jQuery);
    }
  });

}
;
(function() {
  if (typeof Alchemy === "undefined") {
    window.Alchemy = {};
  }

  Alchemy.Browser = {
    isiPhone: navigator.userAgent.match(/iPhone/i) !== null,
    isiPad: navigator.userAgent.match(/iPad/i) !== null,
    isiPod: navigator.userAgent.match(/iPod/i) !== null,
    isiOS: navigator.userAgent.match(/iPad|iPhone|iPod/i) !== null,
    isFirefox: navigator.userAgent.match(/Firefox/i) !== null,
    isChrome: navigator.userAgent.match(/Chrome/i) !== null,
    isSafari: navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match(/Chrome/),
    isIE: navigator.userAgent.match(/MSIE/i) !== null,
    getVersion: function(browser) {
      if (Alchemy.Browser["is" + browser]) {
        return parseInt(navigator.userAgent.match(new RegExp(browser + ".[0-9]+", "i"))[0].replace(new RegExp(browser + "."), ""), 10);
      } else {
        return null;
      }
    }
  };

  Alchemy.Browser.ChromeVersion = Alchemy.Browser.getVersion("Chrome");

  Alchemy.Browser.FirefoxVersion = Alchemy.Browser.getVersion("Firefox");

  Alchemy.Browser.SafariVersion = Alchemy.Browser.getVersion("Safari");

  Alchemy.Browser.IEVersion = Alchemy.Browser.getVersion("MSIE");

  Alchemy.Browser.isWebKit = Alchemy.Browser.isChrome || Alchemy.Browser.isSafari;

}).call(this);
(function() {
  if (typeof window.Alchemy === 'undefined') {
    window.Alchemy = {};
  }

  Alchemy.translations = {
    de: {
      allowed_chars: 'von %{count} Zeichen',
      cancel: 'Abbrechen',
      cancelled: 'Abgebrochen',
      click_to_edit: 'Klicken zum Bearbeiten',
      complete: 'Abgeschlossen',
      element_dirty_notice: 'Dieses Element hat nicht gespeicherte Änderungen. Möchten Sie es wirklich einklappen?',
      help: 'Hilfe',
      ok: 'Ok',
      page_dirty_notice: 'Sie haben ungesicherte Änderungen auf der Seite. Diese gehen verloren, wenn Sie fortfahren.',
      page_found: 'Seite gefunden',
      pages_found: 'Seiten gefunden',
      url_validation_failed: 'Die URL hat kein gültiges Format.',
      warning: 'Achtung!',
      'File is too large': 'Datei ist zu groß.',
      'File is too small': 'Datei ist zu klein.',
      'File type not allowed': 'Dateityp nicht erlaubt.',
      'Maximum number of files exceeded': 'Maximale Anzahl an Dateien erreicht.',
      'Uploaded bytes exceed file size': 'Maximal erlaubte Dateigröße erreicht.'
    },
    en: {
      allowed_chars: 'of %{count} chars',
      cancel: 'Cancel',
      cancelled: 'Cancelled',
      click_to_edit: 'click to edit',
      complete: 'Complete',
      element_dirty_notice: 'This element has unsaved changes. Do you really want to fold it?',
      help: 'Help',
      ok: 'Ok',
      page_dirty_notice: 'You have unsaved changes on this page. They will be lost if you continue.',
      page_found: 'Page found',
      pages_found: 'Pages found',
      url_validation_failed: 'The url has no valid format.',
      warning: 'Warning!',
      'File is too large': 'File is too large',
      'File is too small': 'File is too small',
      'File type not allowed': 'File type not allowed',
      'Maximum number of files exceeded': 'Maximum number of files exceeded.',
      'Uploaded bytes exceed file size': 'Uploaded bytes exceed file size'
    },
    nl: {
      allowed_chars: 'of %{count} chars',
      cancel: 'Annuleren',
      cancelled: 'Afgebroken',
      click_to_edit: 'klik om aan te passen',
      complete: 'Klaar',
      element_dirty_notice: 'Dit element bevat niet opgeslagen wijzigingen. Wilt u dit echt inklappen?',
      help: 'Hulp',
      ok: 'Ok',
      page_found: 'Page found',
      pages_found: 'Pages found',
      page_dirty_notice: 'Er zijn wijzigingen op deze pagina aangebracht. Deze gaan verloren als u doorgaat.',
      url_validation_failed: 'De url heeft geen geldig formaat.',
      warning: 'Waarschuwing!',
      'File is too large': 'File is too large',
      'File is too small': 'File is too small',
      'File type not allowed': 'File type not allowed',
      'Maximum number of files exceeded': 'Uploadlimiet bereikt.',
      'Uploaded bytes exceed file size': 'Uploaded bytes exceed file size'
    },
    fr: {
      allowed_chars: 'von %{count} signes',
      cancel: 'abandonner',
      cancelled: 'annulé',
      click_to_edit: 'Cliquez pour modifier',
      complete: 'terminé',
      element_dirty_notice: 'Cet élément a des modifications non enregistrées. Souhaitez-vous vraiment plier?',
      help: 'Aide',
      ok: 'Ok',
      page_dirty_notice: 'Vous avez des modifications non enregistrées sur la page. Ce sera perdue si vous continuez.',
      page_found: 'page trouvée',
      pages_found: 'pages trouvées',
      url_validation_failed: "L'URL n'est pas correctement formatée.",
      warning: 'Attention!',
      'File is too large': 'Le fichier est trop grand.',
      'File is too small': 'Le fichier est trop petit.',
      'File type not allowed': 'Type de document non autorisé.',
      'Maximum number of files exceeded': 'Le nombre maximum de fichiers est atteint.',
      'Uploaded bytes exceed file size': 'Taille de fichier maximale autorisée atteint.'
    }
  };

}).call(this);
(function() {
  if (typeof window.Alchemy === 'undefined') {
    window.Alchemy = {};
  }

  Alchemy.I18n = {
    translate: function(key, replacement) {
      var translation, translations;
      if (Alchemy.locale == null) {
        throw 'Alchemy.locale is not set! Please set Alchemy.locale to a locale string in order to translate something.';
      }
      translations = Alchemy.translations[Alchemy.locale];
      if (translations) {
        translation = translations[key] || key;
        if (replacement) {
          return translation.replace(/%\{.+\}/, replacement);
        } else {
          return translation;
        }
      } else {
        Alchemy.debug("Translations for locale " + Alchemy.locale + " not found!");
        return key;
      }
    }
  };

  Alchemy._t = function(key, replacement) {
    return Alchemy.I18n.translate(key, replacement);
  };

}).call(this);
(function() {
  if (typeof Alchemy === 'undefined') {
    window.Alchemy = {};
  }

  Alchemy.initAlchemyPreviewMode = function($) {
    $.fx.speeds._default = 400;
    $.extend(Alchemy, {
      ElementSelector: {
        scrollOffset: 20,
        styles: {
          reset: {
            outline: "",
            "outline-offset": "",
            "-moz-outline-radius": ""
          },
          default_hover: {
            outline: "3px solid #F0B437",
            "outline-offset": "4px",
            cursor: "pointer"
          },
          webkit_hover: {
            outline: "4px auto #F0B437"
          },
          moz_hover: {
            "-moz-outline-radius": "3px"
          },
          default_selected: {
            outline: "3px solid #90B9D0",
            "outline-offset": "4px"
          },
          webkit_selected: {
            outline: "4px auto #90B9D0"
          },
          moz_selected: {
            "-moz-outline-radius": "3px"
          }
        },
        init: function() {
          var $elements;
          $elements = $("[data-alchemy-element]");
          this.$previewElements = $elements;
          $elements.mouseover((function(_this) {
            return function(e) {
              var $el;
              $el = $(e.delegateTarget);
              $el.attr("title", Alchemy._t('click_to_edit'));
              if (!$el.hasClass("selected")) {
                return $el.css(_this.getStyle("hover"));
              }
            };
          })(this));
          $elements.mouseout((function(_this) {
            return function(e) {
              var $el;
              $el = $(e.delegateTarget);
              $el.removeAttr("title");
              if (!$el.hasClass("selected")) {
                return $el.css(_this.getStyle("reset"));
              }
            };
          })(this));
          $elements.on("Alchemy.SelectElement", (function(_this) {
            return function(e) {
              return _this.selectElement(e);
            };
          })(this));
          return $elements.click((function(_this) {
            return function(e) {
              return _this.clickElement(e);
            };
          })(this));
        },
        selectElement: function(e) {
          var $el, $elements, offset;
          $el = $(e.delegateTarget);
          $elements = this.$previewElements;
          offset = this.scrollOffset;
          e.preventDefault();
          $elements.removeClass("selected").css(this.getStyle("reset"));
          $el.addClass("selected").css(this.getStyle("selected"));
          $("html, body").animate({
            scrollTop: $el.offset().top - offset,
            scrollLeft: $el.offset().left - offset
          }, 400);
        },
        clickElement: function(e) {
          var $el, $element_editor, elementsWindow, parent$, target_id;
          $el = $(e.delegateTarget);
          parent$ = window.parent.jQuery;
          target_id = $el.data("alchemy-element");
          $element_editor = parent$("#element_area .element_editor").closest("[id=\"element_" + target_id + "\"]");
          elementsWindow = window.parent.Alchemy.ElementsWindow;
          e.preventDefault();
          $element_editor.trigger("Alchemy.SelectElementEditor", target_id);
          if (elementsWindow.hidden) {
            elementsWindow.show();
          }
          $el.trigger("Alchemy.SelectElement");
        },
        getStyle: function(state) {
          var browser, default_state_style;
          if (state === "reset") {
            return this.styles["reset"];
          } else {
            default_state_style = this.styles["default_" + state];
            if (Alchemy.Browser.isWebKit) {
              browser = "webkit";
            }
            if (Alchemy.Browser.isFirefox) {
              browser = "moz";
            }
            if (browser) {
              return $.extend(default_state_style, this.styles["" + browser + "_" + state]);
            } else {
              return default_state_style;
            }
          }
        }
      }
    });
    return Alchemy.ElementSelector.init();
  };

  if (typeof jQuery === 'undefined') {
    Alchemy.loadjQuery(Alchemy.initAlchemyPreviewMode);
  } else {
    Alchemy.initAlchemyPreviewMode(jQuery);
  }

}).call(this);
