module MandrillHelper

	def sendMandrillMail(options)
		require 'mandrill'

		html = MailsenderController.new.render_to_string(:partial => options[:template], :layout => false, :locals => options[:locals])

		m = Mandrill::API.new MANDRILL_APIKEY
		message = {
			:subject=> options[:subject],
			:from_name=> "Tracksmith",
			:from_email=>"support@tracksmith.com",
			:to=> options[:to],
			:html=> html,
			:inline_css=> true,
			:merge => true
		}

		m.messages.send message
	end

	def absolute_attachment_url(attachment_name, attachment_style = :original)
		if !request.nil?
			"#{request.protocol}#{request.host_with_port}#{attachment_name.url(attachment_style)}"
		else
			"#{attachment_name.url(attachment_style)}"
		end
	end
end