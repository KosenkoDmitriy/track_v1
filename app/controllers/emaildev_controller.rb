class EmaildevController < ApplicationController

	include MandrillHelper

	def index
		order = Spree::Order.find(46)
		shipment = Spree::Shipment.find(54)
    user = shipment.order.user
  	# sendMandrillMail({
			# template: '/mandrill/order_confirmation',
			# subject: I18n.t('user_mailer.order_confirmed.subject'),
			# locals: { order: order },
			# to: [{
	  #        :email=> "",
	  #        :name=> ""
	  #      }]
			# })
  	render :partial => 'mandrill/order_confirmation', :locals => { :order => order}
  	# render :partial => 'mandrill/order_shipped', :locals => { :order => order, :shipment => shipment }
	end

end
