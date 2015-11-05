Spree::Shipment.class_eval do

	include MandrillHelper
	 def send_shipped_email
  	sendMandrillMail({
			template: '/mandrill/order_shipped',
			subject: I18n.t('user_mailer.order_shipped.subject'),
			locals: { shipment: self },
			to: [{
	         :email=> self.order.email,
	         :name=> "#{self.order.bill_address.firstname} #{self.order.bill_address.lastname}"
	       }]
			})
  end
end
