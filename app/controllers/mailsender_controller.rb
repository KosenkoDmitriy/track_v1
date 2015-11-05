class MailsenderController < ApplicationController


 def url_options
 	{ host: Rails.application.config.mandrill_mailer.default_url_options }
 end

end