class UserMailer < MandrillMailer::TemplateMailer
  default from: 'support@tracksmith.com'

  def welcome(user_id)
    user = Spree::User.find user_id
    
    mandrill_mail template: 'ts-welcome',
                  subject: I18n.t('user_mailer.welcome.subject'),
                  to: { email: "#{user.email}" },
                  inline_css: true
  end

  def order_confirmed(user_id, order_id)
    user = Spree::User.find user_id
    order = Spree::Order.find  order_id
    mandrill_mail template: 'tracksmith_order_confirmed',
                  subject: I18n.t('user_mailer.order_confirmed.subject'),
                  to: { email: "#{user.email}" },
                  inline_css: true,
                  vars: {
                    'ORDER_NUMBER' => order.number
                  }
  end

  def order_shipped(shipment_id)
    shipment = Spree::Shipment.find shipment_id
    user = shipment.order.user
    mandrill_mail template: 'tracksmith_order_shipped',
                  subject: I18n.t('user_mailer.order_shipped.subject'),
                  to: { email: "#{user.email}" },
                  inline_css: true,
                  vars: {
                    'TRACKING_NUMBER' => shipment.tracking
                  }
  end

end
