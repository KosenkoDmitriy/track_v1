function ProductsPage() {
    function trackProductImpressions() {
        var variants = $(".variant");

        var visibleVariants = $($.grep(variants, function (variant, i) {
            var imageVariant = $(variant).children(".image")[0];
            return $(imageVariant).withinViewport().length > 0;
        }));


        var hiddenVariants = $(variants).not(visibleVariants);

        hiddenVariants.each(function () {
            $(this).removeClass("impression")
        });

        visibleVariants.each(function () {
            // Impression Already Tracked
            if (!$(this).hasClass("impression")) {
                $(this).addClass("impression")
                ga('ec:addImpression', {
                    'name': $(this).data("product-name"),
                    'variant': $(this).data("variant-name"),
                    'position': $(this).data("position"),
                    'price': $(this).data("price"),
                    'list': 'product_page'
                });

                ga('send', 'event', 'product_row_view', 'impression', {'nonInteraction': true});
            }
        });
    }

    window.addEventListener('load', function () {
        trackProductImpressions();
    }, false);

    $(window).bind("scroll", function () {
        trackProductImpressions();
    });
}