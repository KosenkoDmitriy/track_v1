module Spree
  module BaseHelper

    # overriding the Spree default to make the number of items in cart style-able

    def link_to_cart(text = nil)
      text = text ? h(text) : Spree.t('cart')
      css_class = nil

      if simple_current_order.nil? or simple_current_order.item_count.zero?
        text = "#{text}"
        css_class = 'empty'
      else
        text = "<span class='cart-text'>#{text}</span><span class='item-count notification'><span>#{simple_current_order.item_count}</span></span>"
        css_class = 'full'
      end

      link_to text.html_safe, spree.cart_path, :class => "cart-info #{css_class}"
    end
  end
end
