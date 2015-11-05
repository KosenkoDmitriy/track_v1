module AnalyticsTrackingHelper
  def product_trackable_properties
    @order.line_items.reduce([]) do |array, line_item|
      array.push ({product_name: line_item.name, variant_name: line_item.variant.options_text, price: line_item.price, quantity: line_item.quantity, variant_sku: line_item.variant.sku}.to_json);
    end
  end

  def promotion_codes
    @order.promotions.reduce([]) do |array, promotions|
      array.push (promotions.code)
    end
  end 
end