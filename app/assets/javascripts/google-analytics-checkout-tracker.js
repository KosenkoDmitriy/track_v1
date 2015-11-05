function GoogleAnalyticsCheckoutTracker() {
    var checkout_section = $('section#checkout-step')

    this.trackCheckoutStage = function () {
        checkout_section.data('products').forEach(function (productJSON) {
            var product = JSON.parse(productJSON);

            ga('ec:addProduct', {
                'id': product.variant_sku,
                'name': product.product_name,
                'variant': product.variant_name,
                'price': product.price,
                'quantity': product.quantity
            });
        });

        ga('ec:setAction', 'checkout', {
            'step': checkout_section.data('step')
        });
    }

    this.trackCheckoutTransaction = function trackCheckoutTransaction() {
        var order_number = checkout_section.data("order-number"),
            order_revenue = checkout_section.data("order-revenue");
            promotion_codes = checkout_section.data("promotion-codes")

        checkout_section.data('products').forEach(function (productJSON) {
            var product = JSON.parse(productJSON);

            ga('ec:addProduct', {
                'id': product.variant_sku,
                'name': product.product_name,
                'variant': product.variant_name,
                'price': product.price,
                'quantity': product.quantity
            });
        });

        ga('ec:setAction', 'purchase', {
            'id': order_number,
            'affiliation': 'Tracksmith',
            'revenue': order_revenue,
            'coupon' : promotion_codes
        });
    }
}
