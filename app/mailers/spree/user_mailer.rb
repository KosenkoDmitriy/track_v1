module Spree
  class UserMailer < BaseMailer
  	default from: 'support@tracksmith.com'
    def reset_password_instructions(user, token, *args)
      @edit_password_reset_url = spree.edit_spree_user_password_url(:reset_password_token => token)
      @email = user.email
      @name = user.bill_address.firstname unless user.bill_address.nil?
      mail(:to => user.email, :from => from_address,
          :subject => Spree::Config[:site_name] + ' ' +
            I18n.t(:subject, :scope => [:devise, :mailer, :reset_password_instructions]))
    end
  end
end