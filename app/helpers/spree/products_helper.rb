module Spree
  module ProductsHelper

    def product_path(product)
      alchemy.root_url + "products/#{product.slug}"
    end

    def cache_key_for_products
      max_updated_at = @products.maximum(:updated_at).to_s(:number)
      "#{current_currency}/spree/products/all-#{params[:page]}-#{max_updated_at}"
    end

    def line_item_description_text (var)
      ""
    end
  end
end