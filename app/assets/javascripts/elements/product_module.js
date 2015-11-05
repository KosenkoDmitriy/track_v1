function ProductModule() {

    var $groups = $('.variant-option-values'),
        $thumbs = $('#product-thumbnails').find('li'),
        $main_image = $('#main-image'),
        variant_matrix = [],
        $variant_input = $('#variant_id'),
        $noStockMsg = $('.no-stock'),
        $addToCart = $('#add-to-cart-button'),
        $backorderedMsg = $('.backordered-message'),
        $quantityControls = $('.qty-wrapper'),
        selectedVariant = parseInt($variant_input.val());

    // check in stock or out of stock for pre-selected variant
    function checkStock(variant) {
        var backorder = $variant_input.data('backorder'),
            nostock = $variant_input.data('nostock'),
            isBackorder = $.inArray(variant, backorder),
            isNostock = $.inArray(variant, nostock);

        // if its backordered, add class backorder (remove other classes)
        if (isBackorder != -1 && isNostock == -1) {
            $variant_input.addClass('backorder').removeClass('out-of-stock').removeClass('in-stock');
            hideNoMore();
            showBackordered();
            showQuantity();
        }
        // if its out of stock, add class out-of-stock (remove other classes)
        else if (isBackorder == -1 && isNostock != -1) {
            $variant_input.addClass('out-of-stock').removeClass('backorder').removeClass('in-stock');
            hideBackordered();
            showNoMore();
            hideQuantity();
        }
        // if neither (in stock), remove all classes
        else if (isBackorder == -1 && isNostock == -1) {
            $variant_input.addClass('in-stock').removeClass('out-of-stock').removeClass('backorder');
            hideBackordered();
            hideNoMore();
            showQuantity();
        }
    }

    function selectOptionForGroup($target) {
        var variant = $target.data('products'),
            group_index = $target.data('group');

        if (!$target.closest('li').hasClass('size')) {
            findPhoto(variant[0])
        }

        // See if the button was already 'active'
        if ($target.hasClass('active')) {
            // Deactivate the clicked button
            deactivateButton($target);
            // Remove from the variant_matrix
            removeFromMatrix(group_index);
        } else {
            // Deactivate all buttons in the group
            deactivateButton($groups[group_index].$options);
            // Activate only the button that was clicked
            activateButton($target);
            // Add to the variant_matrix
            addToMatrix($target, group_index);
        }

        // On every option value click, we checkout to see if all the options
        // have been clicked.
        // If so, add the common variant_id to the hidden input, and
        // enable the add to cart button.
        // If not, disable the add to cart button, and remove the
        // hidden input value.

        if (variantMatrixSize() === $groups.length) {
            var common_id = getCommonMatrixId(variant_matrix);

            checkStock(common_id[0]);
            updateVariantInput(common_id);
            findPhoto(common_id);
            enableButton($addToCart);
        } else {
            updateVariantInput('');
            disableButton($addToCart);
        }

        setVariant();
    }

    function getCommonMatrixId(array_ids) {
        var first_common = null,
            common = [];

        if (array_ids.length >= 2) {
            for (var i = 1; i < array_ids.length; i++) {
                if (first_common !== null) {
                    common = intersection(array_ids[i], common);
                } else {
                    first_common = intersection(array_ids[i], array_ids[i - 1]);
                    common = first_common;
                }
            }
        } else common = array_ids[0];

        return common;
    }

    function addToMatrix($elem, index) {
        variant_matrix[index] = $elem.data('products');
    }

    function removeFromMatrix(index) {
        variant_matrix[index] = undefined;
    }

    function variantMatrixSize() {
        return variant_matrix.filter(function (value) {
            return value !== undefined
        }).length;
    }

    function activateButton($elem) {
        $elem.addClass('active');
        $elem.parent().addClass('active');
    }

    function deactivateButton($elem) {
        $elem.removeClass('active');
        $elem.parent().removeClass('active');
    }

    function enableButton($elem) {
        $elem.prop('disabled', false);
    }

    function disableButton($elem) {
        $elem.prop('disabled', true);
    }

    function updateVariantInput(variant_id) {
        $variant_input.val(variant_id);
    }

    /**
     * Image Management
     */

    function changeMainImage(url) {
        $main_image.find('img').attr('src', url);
    }

    function changeSelectedThumbnail($tmb) {
        $thumbs.removeClass('selected');
        $tmb.addClass('selected');
    }

    function findPhoto(variant_id) {
        var $current,
            url = "";

        $current = $thumbs.filter('.tmb-' + variant_id).eq(0);
        if ($current.length) {
            url = $current.find('a').attr('href');
            changeMainImage(url);
            changeSelectedThumbnail($current);
        }
    }


    // Utils

    // Find the intersection of two arrays
    // Adopted from the following jsperf
    // http://jsperf.com/array-intersection-unsorted
    function intersection(a, b) {
        var intersection = [];
        if (a == undefined || b == undefined)
            return intersection;
        var as = a.slice(0).sort(compareNumbers);
        var bs = b.slice(0).sort(compareNumbers);

        var i = 0,
            j = 0;

        while (i < as.length && j < bs.length) {
            if (as[i] === bs[j]) {
                intersection.push(as[i]);
                i++;
                j++;
            } else if (as[i] > bs[j]) {
                j++;
            } else {
                i++;
            }
        }

        return intersection;
    }

    // for the sorting
    function compareNumbers(a, b) {
        return a - b;
    }


    /**
     * Stock Management
     */

    function setVariant() {
        // setting up hidden field for mailchimp list merge vars - variants
        // product name is set on page landing
        var $activeOption = $('.option-value.active'),
            chosenVariants = "";

        $activeOption.each(function (i) {
            chosenVariants += $(this).data('variant');
            if (i < ($activeOption.length - 1)) {
                chosenVariants += ", ";
            }
        });

        $('#variant').val(chosenVariants);
        $('.product-info-wrapper').data("variant", chosenVariants);
    }

    function showNoMore() {
        $noStockMsg.show();
        $addToCart.hide();
    }

    function hideNoMore() {
        $noStockMsg.hide();
        $addToCart.show();
    }

    function showBackordered() {
        $backorderedMsg.show();
    }

    function hideBackordered() {
        $backorderedMsg.hide();
    }

    function hideQuantity() {
        $quantityControls.hide();
    }

    function showQuantity() {
        $quantityControls.show();
    }

    /**
     * Google Analytics
     */

    function trackProductDetailsView() {
        var productInfoWrapper = $('.product-info-wrapper');

        ga('ec:addProduct', {
            'name': productInfoWrapper.data("product-name"),
            'price': productInfoWrapper.data("price")
        });

        ga('ec:setAction', "detail");
    }

    function trackProductAddToCart() {
        var productInfoWrapper = $('.product-info-wrapper');

        ga('ec:addProduct', {
            'name': productInfoWrapper.data("product-name"),
            'variant': productInfoWrapper.data("variant"),
            'price': productInfoWrapper.data("price"),
            'quantity': $('input.qty-field').val()
        });

        ga('ec:setAction', "add");
        ga('send', 'event', 'UX', 'click', 'add to cart button');
    }

    /**
     * Initialization
     */

    function init() {
        if ($groups.length > 0) {
            $groups.each(function (i, group) {
                var option = $(group).find('.option-value');
                group.$options = option;

                // Select The Only Option
                if (group.$options.length == 1) {
                    selectOptionForGroup(option);
                } else {
                    group.$options.on('click tap', function () {
                        checkStock(selectedVariant);
                        selectOptionForGroup($(this))
                    });
                }
            });
        } else {
            enableButton($addToCart)
        }

        // This is being used to resize the text on mobile for long names.
        // I think we can do better for this fix
        function bigText() {
            if ($(window).width() < 768) {
                var productInfoWrapper = $(".product-info-wrapper");
                if (productInfoWrapper.length) {
                    productInfoWrapper.find(".name").fitText();
                }
            }
        }

        bigText();
        trackProductDetailsView();
    }

    /**
     * Responders
     */

    $(document).on('click tap', '#add-to-cart-button', function () {
        trackProductAddToCart();
    });

    $(document).on('click tap', '.qty-btn', function () {
        var $button = $(this),
            $oldValue = $('input.qty-field'),
            $valueDisplay = $('div.qty-field'),
            oldVal = $oldValue.val() || 1,
            newVal = 0;

        if ($button.hasClass('qtyplus')) {
            newVal = parseInt(oldVal, 10) + 1;
        }
        else {
            // Don't allow decrementing below 1
            if (oldVal > 1) {
                newVal = parseInt(oldVal, 10) - 1;
            } else {
                newVal = 1;
            }
        }
        $oldValue.val(newVal);
        $valueDisplay.text(newVal);
    });

    window.addEventListener('load', function () {
        FastClick.attach(document.body);
    }, false);

    init();
}