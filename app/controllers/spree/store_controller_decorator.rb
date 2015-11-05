Spree::StoreController.class_eval do
  def apply_coupon_code
    if params[:order] && params[:order][:coupon_code]

      # Prelaunch Coupons
      prelaunch_coupons = PrelaunchCoupon.all.where(code: params[:order][:coupon_code])
      unless prelaunch_coupons.empty?
        prelaunch_coupon = prelaunch_coupons.first
        if prelaunch_coupon[:applied] == 'f'
          params[:order][:coupon_code] = "prelaunch-#{prelaunch_coupon[:level]}"
          prelaunch_coupon[:applied] = 't'
          prelaunch_coupon[:order_id] = @order[:id]
          prelaunch_coupon.save!
        elsif prelaunch_coupon[:applied] == 't' and prelaunch_coupon[:order_id] == @order[:id]
          params[:order][:coupon_code] = "prelaunch-#{prelaunch_coupon[:level]}"
        end
      end

      @order.coupon_code = params[:order][:coupon_code]

      handler = Spree::PromotionHandler::Coupon.new(@order).apply

      if handler.error.present?
        flash.now[:error] = handler.error
        respond_with(@order) { |format| format.html { render :edit } } and return
      elsif handler.success
        flash[:success] = handler.success
      end
    end
  end

end