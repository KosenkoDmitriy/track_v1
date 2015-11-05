module Spree
  module CheckoutHelper
    def checkout_states
      @order.checkout_steps
    end

    def checkout_progress
      states = checkout_states
      items = states.map do |state|
        text = Spree.t("order_state.#{state}").titleize

        css_classes = []
        current_index = states.index(@order.state)
        state_index = states.index(state)
        state_number = state_index+1

        if state_index < current_index
          css_classes << 'completed'
          text = link_to text, checkout_state_path(state)
        end

        css_classes << 'next' if state_index == current_index + 1
        css_classes << 'current' if state == @order.state
        css_classes << 'first' if state_index == 0
        css_classes << 'last' if state_index == states.length - 1
        css_classes << 'disabled' if state_index > current_index

        # It'd be nice to have separate classes but combining them with a dash helps out for IE6 which only sees the last class
        content_tag :li, class: css_classes.join('-') do
          content_tag('span', state_number, class: 'number') + content_tag('span', text, class: 'state') 
        end

      end
      content_tag('ol', raw(items.join("\n")), class: 'checkout-breadcrumbs progress-steps', id: "checkout-step-#{@order.state}")
    end
  end
end
