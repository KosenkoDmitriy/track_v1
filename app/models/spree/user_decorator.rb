Spree::User.class_eval do

	after_create :send_welcome_email

  def alchemy_roles
    if self.has_spree_role?('admin')
      %w(admin)
    end
  end

  def send_welcome_email
  	UserMailer.welcome(self.id).deliver
  end
  
end