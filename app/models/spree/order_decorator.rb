Spree::Order.class_eval do

	include MandrillHelper

	def deliver_order_confirmation_email
		if user
    	sendMandrillMail({
				template: '/mandrill/order_confirmation',
				subject: I18n.t('user_mailer.order_confirmed.subject'),
				locals: { order: self },
				to: [{
		         :email=> self.email,
		         :name=> "#{self.bill_address.firstname} #{self.bill_address.lastname}"
		       }]
				})

    end
    update_column(:confirmation_delivered, true)
  end

  def current_state_number
  	self.checkout_steps.index state
  end

end
