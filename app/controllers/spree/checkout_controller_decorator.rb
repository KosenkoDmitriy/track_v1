Spree::CheckoutController.class_eval do
  def update

	  if @order.update_from_params(params, permitted_checkout_attributes)
	    persist_user_address
	    unless @order.next
	      flash[:error] = @order.errors.full_messages.join("\n")
  			# raise params[:payment_source].to_yaml
	      redirect_to checkout_state_path(@order.state) and return
	    end

	    if @order.completed?
	    	session[:order_id] = nil
	      @current_order = nil
	      flash.notice = Spree.t(:order_processed_successfully)
	      flash[:order_completed] = true
	      redirect_to completion_route
	    else
	      redirect_to checkout_state_path(@order.state)
	    end
	  else
	    render :edit
	  end
	end

end