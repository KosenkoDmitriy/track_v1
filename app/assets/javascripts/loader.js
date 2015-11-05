// Specify The Load Order Of Objects


function Loader() {

    var $body = $('body');

    this.loadProductPageIfApplicable = function () {
        if ($body.data('page-layout') == "products") {
            new ProductsPage();
        }
    };

    this.loadProductModuleIfApplicable = function () {
        var elements = $body.data('page-elements');
        if ($.inArray('product_module', elements) > -1) {
            new ProductModule();
        }

    };

    this.loadGoogleAnalyticsTrackerIfApplicable = function () {
        var checkoutTracker,
            checkout_section = $('section#checkout-step');

        if (checkout_section.length != 0) {
            checkoutTracker = new GoogleAnalyticsCheckoutTracker();

            if (checkout_section.data('orderState') != "complete") {
                checkoutTracker.trackCheckoutStage();
            } else {
                checkoutTracker.trackCheckoutTransaction()
            }

        } else if ($('section#checkout-completed').length != 0) {
            checkoutTracker = new GoogleAnalyticsCheckoutTracker();
            checkoutTracker.trackCheckoutTransaction();
        }
    };
};


$('document').ready(function () {
    var loader = new Loader();

    loader.loadProductPageIfApplicable();
    loader.loadProductModuleIfApplicable();
    loader.loadGoogleAnalyticsTrackerIfApplicable();

    // Must be placed last to allow other analytic events to be sent with the page view.
    ga('send', 'pageview');
});


