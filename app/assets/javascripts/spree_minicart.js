//= require store/jquery.hoverintent

// This prevents the cart from sliding up/down when deleting an item. It is referenced in uapp/views/spree/orders/update.js.erb so needs to be global
var minicartPreventUpdateSlides = false;

// stop click event from firing twice (calling minicart() on populate.js.erb and update.js.erb)
var minicart = function (hasToggled) {
    var cartOpen = false,
        isMobile = false,
        clickEvent = hasToggled,
        qtyOpen = false,
        $body = $('body'),
        winW,
        winH;

    var config = function () {
        winW = $(window).width();
        isMobile = (winW <= 768);
    }

    var toggleCart = function () {
        if (!clickEvent) {
            $('#cart-wrapper, #cart-wrapper a').off('click tap').on('click tap', function (e) {
                var scrollTop = $(window).scrollTop(),
                    $minicart = $('#minicart');

                e.preventDefault();

                if (cartOpen && !isMobile) {
                    $minicart.slideUp();
                    cartOpen = false;
                    $body.removeClass('cart-open');

                }
                else if (cartOpen && isMobile) {
                    $('.page-content').css({'position': 'relative', 'top': '70px'});
                    $minicart.slideUp();
                    cartOpen = false;
                    $body.removeClass('cart-open');
                }
                else if (!cartOpen && !isMobile) {
                    $minicart.slideDown();
                    cartOpen = true;
                    $body.addClass('cart-open');
                }
                else if (!cartOpen && isMobile) {
                    $('.page-content').css({'position': 'fixed', 'top': -scrollTop});
                    $minicart.slideDown();
                    cartOpen = true;
                    $body.addClass('cart-open');
                }

                clickEvent = true;
            });
        }
    };

    var setupCloseCart = function () {
        // if not mobile, scroll to close
        if (!isMobile) {
            $(window).on('DOMMouseScroll mousewheel', function (e) {
                if (cartOpen) {
                    scrollCloseCart(e);
                }
            });
            // Close mini cart when clicking outside of cart content and cart control areas
            $(document).on('click tap', function (e) {
                if (cartOpen) {
                    clickCloseCart(e);
                }

            });
        }
        // if mobile, click button to close
        else if (isMobile) {
            $(window).off('DOMMouseScroll mousewheel');
            $('.close-cart').off('click tap').on('click tap', function () {
                $('#minicart').slideUp();
                $('.page-content').css({'position': 'relative', 'top': '70px'});
                cartOpen = false;
                $body.removeClass('cart-open');
            })
        }
    }

    var clickCloseCart = function (e) {
        var $target = $(e.target);
        if ($target.parents('#minicart').length == 0 && $target.parents('#cart-wrapper').length == 0 && !$target.is("#cart-wrapper")) {
            $("#minicart").slideUp();
            cartOpen = false;
            $body.removeClass('cart-open');
        }

    }

    var scrollCloseCart = function (e) {
        var target = $(e.target);

        // check if scroll is outside of minicart, and if they've scrolled more than 15px in either direction
        if ((!target.parents('#minicart')[0]) && ((e.originalEvent.wheelDelta > 15 || e.originalEvent.wheelDelta < -15))) {

            $('#minicart').slideUp();
            cartOpen = false;
            $body.removeClass('cart-open');

            // if qty is open, close after the scroll so that when you reopen the cart, the qty thing will be closed
            setTimeout(function () {
                closeQty();
            }, 300);
        }
        else {
            return false;
        }
    }

    var cartHeight = function () {
        winH = $(window).innerHeight();
        if (!isMobile) {
            $('#minicart').css('max-height', (winH * .5));
            $('#update-minicart').css('height', '');
        }
        else {
            $('#minicart').css('max-height', '');
            $('#minicart-details').css('top', winH - 120);
            $('#update-minicart').css('height', winH);
        }
    }

    var deleteItem = function () {
        if (!clickEvent) {
            $(document).off('click tap', 'form#update-minicart a.delete').on('click tap', 'form#update-minicart a.delete', function (e) {
                $(this).parents('.minicart-actions').siblings('div[data-hook="minicart_item_quantity"]').find("input.line_item_quantity").val(0);
                minicartPreventUpdateSlides = true;
                $(this).parents('form').first().submit();
                e.preventDefault();

                trackItemRemoval(this)
            });
        }
    }

    var setupToggleQty = function () {
        $(document).off('click', 'span.line-item-quantity').on('click', 'span.line-item-quantity, .change-qty', function (e) {
            toggleQty(e.target);
        })
    }

    var toggleQty = function (button) {
        setQty();
        var $content = $(button).parents('.minicart-content'),
            $qty = $content.siblings('.qty-wrapper');

        if (!qtyOpen) {
            $content.addClass('open');
            $qty.addClass('open');
            qtyOpen = true;
        }
        else if (qtyOpen) {
            $content.removeClass('open');
            $qty.removeClass('open');
            qtyOpen = false;
        }
    }

    var setupCloseQty = function () {
        $(document).on('click', '#minicart-items .close', function () {
            if (qtyOpen) {
                wrapper = $(this).parents('.qty-wrapper'),
                    content = wrapper.siblings('.minicart-content');

                wrapper.removeClass('open');
                content.removeClass('open');
                qtyOpen = false;
            }
        });
    }

    var closeQty = function () {
        $('.minicart-content, .qty-wrapper').removeClass('open');
        qtyOpen = false;
    }

    var setQty = function () {
        $('#minicart-items').find('li').each(function (index) {
            var qty = $(this).find('input.line_item_quantity').val(),
                $content = $(this).find('.minicart-content')
            $(this).find('.qty-field').text(qty);
            $content.data('position', index);
            $content.data('quantity', qty);
        })
    }

    var changeQty = function () {
        // on 'plus' or 'minus' click, update quantity
        $(document).off('click', 'form#update-minicart .qty-change').on('click', 'form#update-minicart .qty-change', function (e) {
            var $button = $(this),
                $form = $button.parents('form').first(),
                $lineItemQty = $button.siblings("input.line_item_quantity"),
                $qty = $button.parent(),
                $qtyField = $button.siblings('.qty-field-wrapper').find('.qty-field'),
                oldValue = $lineItemQty.val(),
                newVal;


            if ($button.hasClass('qtyplus')) {
                newVal = parseFloat(oldValue) + 1;
            }

            else if ($button.hasClass('qtyminus')) {
                // Don't allow quantities less than 0
                if (oldValue > 0) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }

            // display updated qty in form
            $qtyField.text(newVal);

            // update hidden qty input to be submitted
            $lineItemQty.val(newVal);

        });
    }

    var saveQty = function () {
        // submit form to update quantity (update.js)
        $(document).off('click', '#qty-submit').on('click', '#qty-submit', function (e) {
            var $button = $(this),
                $form = $button.parents('form').first(),
                $content = $(this).find('.minicart-content'),
                qty = $(this).find('input.line_item_quantity').val();

            e.preventDefault();
            minicartPreventUpdateSlides = true;

            setTimeout(function () {
                $('.minicart-content, .qty-wrapper').removeClass('open');
                qtyOpen = false;
                $form.submit();
            }, 300)

        })

    }

    /**
     * Google Analytics
     */

    function trackItemRemoval(element) {
        var miniCartItemContent = $(element).parents('li').find('.minicart-content');

        ga('ec:addProduct', {
            'name': miniCartItemContent.data('product-name'),
            'variant': miniCartItemContent.data('variant-name'),
            'price': miniCartItemContent.data('price'),
            'quantity': miniCartItemContent.data('quantity')
        });
        ga('ec:setAction', 'remove');
        ga('send', 'event', 'UX', 'click', 'remove from cart');
    }

    /**
     * Initialization
     */

    $(document).ready(function () {
        config();
        toggleCart();
        setupCloseCart();
        cartHeight();
        deleteItem();
        setupToggleQty();
        setupCloseQty();
        setQty();
        changeQty();
        saveQty();

    });

    $(window).resize(function () {
        config();
        setupCloseCart();
        cartHeight();
    });
}

$(document).ready(function () {
    minicart(false);
})
