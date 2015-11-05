class Mailer < ActionMailer::Base
	default from: 'support@tracksmith.com'

  def return_order(name, email, type, order_number, replacing, desired, comments)
  	@name = name
  	@email = email
  	@type = type
    @order_number = order_number
    @replacing = replacing
    @desired = desired
    @comments = comments

    # add mail_to email
    mail_to = 'support@tracksmith.com'
    #mail_to = 'perri@wondersauce.com'

    mail :to => mail_to, :subject => "!! TRACKSMITH " + @type.upcase + " ORDER !!"

  end


end