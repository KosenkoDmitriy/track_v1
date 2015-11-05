Spree::Api::OrdersController.class_eval do

	def apply_coupon_code
    find_order
    authorize! :update, @order, order_token

    # Prelaunch Coupons
    prelaunch_coupons = PrelaunchCoupon.all.where(code: params[:coupon_code])
    unless prelaunch_coupons.empty?
    	prelaunch_coupon = prelaunch_coupons.first
    	if prelaunch_coupon[:applied] == 'f'
	    	params[:coupon_code] = "prelaunch-#{prelaunch_coupon[:level]}"
		    prelaunch_coupon[:applied] = 't'
		    prelaunch_coupon[:order_id] = @order[:id]
		    prelaunch_coupon.save!
		  elsif prelaunch_coupon[:applied] == 't' and prelaunch_coupon[:order_id] == @order[:id]
		  	params[:coupon_code] = "prelaunch-#{prelaunch_coupon[:level]}"
		  end
    end

    @order.coupon_code = params[:coupon_code]
    @handler = Spree::PromotionHandler::Coupon.new(@order).apply
    status = @handler.successful? ? 200 : 422
    render "spree/api/promotions/handler", :status => status
  end
end